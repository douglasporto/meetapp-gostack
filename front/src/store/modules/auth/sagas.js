import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInSuccess, signFailure } from './actions';
import history from '~/services/history';
import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (e) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });
    history.push('/');
  } catch (e) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
