import { Op } from 'sequelize';
import { startOfHour, addHours } from 'date-fns';

import Meetapp from '../models/Meetapp';
import User from '../models/User';
import File from '../models/File';

// import SubscriptionMail from '../jobs/SubscriptionMail';
// import Queue from '../../lib/Queue';
import Notification from '../schemas/Notification';

class SubscriptionController {
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
      picture: user.avatar ? user.avatar.url : 'adorable',
      payload: {
        adorable: user.name,
      },
    });

    /* SEND NOTIFICATION TO SUBSCRIBED */
    await Notification.create({
      user: user.id,
      content: `You are now subscribed into ${title}!`,
    });

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
