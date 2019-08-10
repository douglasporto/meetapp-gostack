import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};

export const authCreateSession = async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('e-mail is a required field'),
    password: Yup.string()
      .required('password is a required field')
      .min(6, 'Password must be 6-10 characters')
      .max(10, 'Password must be 6-10 characters'),
  });

  try {
    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
