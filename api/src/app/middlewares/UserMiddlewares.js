import * as Yup from 'yup';

export const createUser = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('name is a required field'),
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

export const updateUser = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string()
      .email('E-mail is invalid')
      .required('e-mail is a required field'),
    oldPassword: Yup.string()
      .min(6, 'Password must be 6-10 characters')
      .max(10, 'Password must be 6-10 characters'),
    password: Yup.string()
      .min(6, 'Password must be 6-10 characters')
      .max(10, 'Password must be 6-10 characters')
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required('You must to send the Password') : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required('You must to confirm the password')
            .oneOf([Yup.ref('password')])
        : field
    ),
  });

  try {
    /* it's necessary to send the body */
    // eslint-disable-next-line no-throw-literal
    if (Object.keys(req.body).length === 0) throw 'Body not sended';

    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
