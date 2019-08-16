import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';
// import { Container } from './styles';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="Logo" />
      <form>
        <input placeholder="Nome Completo" />
        <input type="email" placeholder="Seu E-mail" />
        <input type="password" placeholder="Sua senha" />
        <button type="submit">Criar COntra</button>
        <Link to="/">Já tenho Login</Link>
      </form>
    </>
  );
}
