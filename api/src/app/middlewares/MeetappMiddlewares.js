import * as Yup from 'yup';

const title = Yup.string().max(55, 'Title can not exceed 55 characters.');
const description = Yup.string().max(
  650,
  'Description must have a maximum of 650 characters.'
);
const location = Yup.string().max(
  150,
  'Location can not exceed 150 characters!'
);
const date = Yup.date('Invalid date!');
const banner_id = Yup.number();
const subscribers = Yup.array(
  Yup.number('Subscribers must be an array of IDs!')
);

export const createMeetapp = async (req, res, next) => {
  const schema = Yup.object().shape({
    title: title.required('Title can not be empty!'),
    description: description.required('Description can not be empty!'),
    location: location.required('Location can not be empty!'),
    date: date.required('Date can not be empty.'),
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
