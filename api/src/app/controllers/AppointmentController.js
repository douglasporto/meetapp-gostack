import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointment = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      attributes: ['id', 'date'],
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    res.json(appointment);
  }

  async store(req, res) {
    const { date } = req.body;

    /* check for past date */
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }
    /* check date availability */
    const checkAvailability = await Appointment.findOne({
      where: {
        canceled_at: null,
        date: hourStart,
      },
    });
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      date,
    });
    // const teste = await Appointment.findAll({
    //   attributes: ['id', 'date', 'canceled_at'],
    // });
    // console.log('hourStart', hourStart, teste);
    /*
     * Notify appointment provider
     */
    // const user = await User.findByPk(req.userId);
    // const formatDate = format(hourStart, "'Dia' dd 'de' MMMM', ás ' H:mm'h' ", {
    //   locale: pt,
    // });
    // await Notification.create({
    //   content: `Novo agendamento do ${user.name} para ${formatDate}`,
    //   user: provider_id,
    // });
    return res.status(201).json(appointment);
  }

  async destroy(req, res) {
    try {
      const appointment = await Appointment.findByPk(req.params.id);
      // eslint-disable-next-line no-throw-literal
      if (!appointment) throw 'Appointment not found';

      if (appointment.user_id !== req.userId)
        // eslint-disable-next-line no-throw-literal
        throw `You don't have permission to cancel this appointment`;

      const dateWithSub = subHours(appointment.date, 2);
      if (isBefore(dateWithSub, new Date()))
        // eslint-disable-next-line no-throw-literal
        throw 'You can only cancel appointments 2 hours in advance';

      appointment.canceled_at = new Date();
      appointment.save();
      return res.json(appointment);
    } catch (error) {
      return res.status(401).json({ error });
    }
  }
}

export default new AppointmentController();
