import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail invalido')
    .required('E-mail Obrigatorio'),
  password: Yup.string()
    .min(6)
    .max(15)
    .required('Senha Obrigatoria'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu E-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
