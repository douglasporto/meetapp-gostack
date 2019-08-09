import * as Yup from 'yup';

export const createAppointment = async (req, res, next) => {
  const schema = Yup.object().shape({
    date: Yup.date('date must be date').required('date is a required field'),
  });

  try {
    // eslint-disable-next-line no-throw-literal
    if (req.body === undefined) throw 'Body not send';
    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateAppointment = async () => {};
