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
      if (!meetapp) throw new Error('Meetapp não existe');
      if (meetapp.past) throw new Error('Meetapp já foi encerrado');
      if (req.userId === meetapp.owner_id)
        throw new Error(`O criador do Meetapp não pode se inscrever`);
      if (meetapp.subscribers.includes(req.userId))
        throw new Error('Já esta inscrito');
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
        error: 'Você já tem um Meetapp neste dia e horario',
        conflict: conflictMeetapps,
      });

    const {
      id,
      title,
      description,
      location,
      date,
      banner,
    } = await meetapp.update({
      subscribers: [req.userId, ...meetapp.subscribers],
    });

    const { avatar, name: subName, email: subEmail } = await User.findOne({
      where: { id: req.userId },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    /* SEND EMAIL */
    // await Queue.add(SubscriptionMail.key, {
    //   meetapp,
    //   banner,
    //   title,
    //   avatar,
    //   subName,
    //   subEmail,
    // });

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
      content: `${user.name} se inscreveu no Meetapp ${title}!`,
      picture: user.avatar ? user.avatar.url : 'adorable',
      payload: {
        adorable: user.name,
      },
    });

    /* SEND NOTIFICATION TO SUBSCRIBED */
    await Notification.create({
      user: user.id,
      content: `Você foi inscrito no ${title}!`,
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
      return res.status(400).json({ error: 'Essa Meetapp não existe!' });

    if (meetapp.past)
      return res.status(400).json({
        error: 'Você não pode cancelar inscrição de Meetapp já encerradas!',
      });

    if (!meetapp.subscribers.includes(req.userId))
      return res.status(400).json({ error: 'Você não esta inscrito!' });

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
