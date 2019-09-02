import { Op } from 'sequelize';
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfHour,
  addHours,
} from 'date-fns';

import Meetapp from '../models/Meetapp';
import User from '../models/User';
import File from '../models/File';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

// import Mail from '../../lib/Mail';
import Notification from '../schemas/Notification';

class SubscriptionController {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);
    const startMonth = startOfMonth(parsedDate);
    const endMonth = endOfMonth(parsedDate);
    const meetapps = await Meetapp.findAll({
      where: {
        date: { [Op.between]: [startMonth, endMonth] },
        subscribers: { [Op.contains]: [req.userId] },
        canceled_at: null,
      },
      order: [['date', 'ASC']],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name'],
        },
      ],
    });

    const meetAppList = meetapps.map(m => ({
      ...m.toJSON(),
      canSubscribe: !m.subscribers.find(user_id => user_id === req.userId),
    }));

    return res.status(200).json(meetAppList);
  }

  async store(req, res) {
    const meetapp = await Meetapp.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    try {
      if (!meetapp) throw new Error('Meetapp does not exists');
      if (meetapp.past) throw new Error('Meetapp is already finished');
      if (req.userId === meetapp.owner_id)
        throw new Error(`The meetapp owner can't subscribe`);
      if (meetapp.subscribers.includes(req.userId))
        throw new Error('Already subscribed');
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    /* check hours of meetapp */
    const hourStart = startOfHour(Number(meetapp.date));
    const minimumMeetappHours = 2;

    const conflictMeetapps = await Meetapp.findOne({
      where: {
        subscribers: { [Op.contains]: [req.userId] },
        date: {
          [Op.between]: [hourStart, addHours(hourStart, minimumMeetappHours)],
        },
      },
      attributes: ['id', 'title', 'location', 'date'],
    });

    if (conflictMeetapps)
      return res.status(400).json({
        error: 'You are already subscribed to a meetapp at the same time',
        conflict: conflictMeetapps,
      });

    const { title, description, location, date, banner } = await meetapp.update(
      {
        subscribers: [req.userId, ...meetapp.subscribers],
      }
    );
    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    /* SEND NOTIFICATION TO OWNER */
    await Notification.create({
      user: meetapp.owner_id,
      content: `${user.name} signed up for your Meetapp ${title}!`,
    });

    /* SEND NOTIFICATION TO SUBSCRIBED */
    await Notification.create({
      user: user.id,
      content: `You are now subscribed into ${title}!`,
    });

    /* SEND EMAIL TO OWNER */
    const { name: userSubName, email: userSubEmail } = await User.findOne({
      where: { id: req.userId },
    });

    await Queue.add(SubscriptionMail.key, {
      userName: user.name,
      meetapp,
      title,
      date,
      userSubName,
      userSubEmail,
    });

    // Mail.sendMail({
    //   to: `${meetapp.owner.name} <${meetapp.owner.email}>`,
    //   subject: `${user.name} signed up for your Meetapp ${title}!`,
    //   template: 'subscription',
    //   context: {
    //     ownerName: meetapp.owner.name,
    //     meetappTitle: title,
    //     meetappDate: format(date, "MMMM dd', at' H'h'"),
    //     sendDate: format(new Date(), "MMMM dd', at' H'h'"),
    //     userSubName,
    //     userSubEmail,
    //   },
    // });

    return res.status(200).json({
      title,
      description,
      location,
      date,
      banner,
    });
  }

  async delete(req, res) {
    const meetapp = await Meetapp.findOne({ where: { id: req.params.id } });

    if (!meetapp)
      return res.status(400).json({ error: 'This meetapp does not exists!' });

    if (meetapp.past)
      return res
        .status(400)
        .json({ error: 'You can not unsubscribe a finished meetapp!' });

    if (!meetapp.subscribers.includes(req.userId))
      return res.status(400).json({ error: 'You are not subscribed!' });

    const removeFromSubs = subs => {
      subs.splice(subs.indexOf(req.userId), 1);
      return subs;
    };
    const subscribers = removeFromSubs(meetapp.subscribers);

    await meetapp.update({ subscribers });

    return res.send();
  }
}

export default new SubscriptionController();
