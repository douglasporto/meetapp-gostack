import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

class UserController {
  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res
        .status(400)
        .json({ error: 'This e-mail is already registered!' });
    }
    const user = await User.create(req.body);
    const { id, name, email } = user;
    await Notification.create({
      user: id,
      content: `Welcome to Meetapp!`,
    });

    return res
      .status(201)
      .json({ id, name, email, token: user.generateToken() });
  }

  async update(req, res) {
    const { email, oldPassword, avatar_id } = req.body;

    const user = await User.findByPk(req.userId);

    /* verifying if email already exist */
    if (email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });
      if (userExist) {
        return res.status(422).json({ error: 'User already exist!' });
      }
    }

    /* verifying if avartar_id exist */
    if (avatar_id) {
      const image = await File.findByPk(avatar_id);
      if (!image) return res.status(400).json({ error: 'Avatar not found' });
      // if (image.type !== 'avatar')
      //   return res
      //     .status(400)
      //     .json({ error: 'Your avatar must be a profile picture' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
