import { takeLatest, call, put, all } from 'redux-saga/effects';
import { errorMessage } from '~/util/Message';

import { signInSuccess, signFailure } from './actions';
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
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    errorMessage(e);
    yield put(signFailure());
  }
}
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });
    const { token, user } = response.data;
    yield put(signInSuccess(token, user));
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    errorMessage(e);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
