import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome Obrigatoria'),
  email: Yup.string()
    .email('E-mail invalido')
    .required('E-mail Obrigatorio'),
  password: Yup.string()
    .min(6)
    .max(15)
    .required('Senha Obrigatoria'),
});
// import { Container } from './styles';

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <>
      <img src={logo} alt="Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu E-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">Criar COntra</button>
        <Link to="/">Já tenho Login</Link>
      </Form>
    </>
  );
}
