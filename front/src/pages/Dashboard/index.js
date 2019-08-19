import React from 'react';
import api from '~/services/api';
// import { Container } from './styles';
export default function dashboard() {
  api.get('meetapps');
  return <div>dashboard</div>;
}
