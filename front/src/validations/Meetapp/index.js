import * as Yup from 'yup';

const schema = Yup.object().shape({
  banner_id: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('Banner is required'),
  title: Yup.string().required('Digite o titulo'),
  description: Yup.string().required('Digite a descrição'),
  date: Yup.string().required('Digite uma data'),
  location: Yup.string().required('Digite um local'),
});

export default schema;
