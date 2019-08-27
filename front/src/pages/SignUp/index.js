import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';
import { signUpRequest } from '~/store/modules/auth/actions';

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
export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full Name" />
        <Input name="email" type="email" placeholder="Your e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Your secret password"
        />
        <button type="submit">Create user</button>
        <Link to="/">I already have a user</Link>
      </Form>
    </>
  );
}
