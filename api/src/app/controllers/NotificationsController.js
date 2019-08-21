import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationsController {
  async index(req, res) {
    /*
     * check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: req.userId },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationsController();
