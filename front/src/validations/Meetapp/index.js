import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string().required('Digite o titulo'),
  description: Yup.string().required('Digite a descrição'),
  date: Yup.string().required('Digite uma data'),
  location: Yup.string().required('Digite um local'),
});

export default schema;
