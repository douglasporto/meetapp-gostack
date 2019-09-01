/* MODULES */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

/* REDUX */
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

/* VALIDATIONS */
const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail invalid')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6)
    .max(15)
    .required('Password is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  /* FUNCTIONS */
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="your secret password"
        />
        <button type="submit">{loading ? 'Wait...' : 'Login'}</button>
        <Link to="/register">Create user free</Link>
      </Form>
    </>
  );
}
