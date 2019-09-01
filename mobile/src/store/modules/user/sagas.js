import { takeLatest, all, call, put } from 'redux-saga/effects';
import { errorMessage, successMessage } from '~/util/Message';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;
    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, 'users', profile);
    successMessage('Profile Updated!');
    yield put(updateProfileSuccess(response.data));
  } catch (e) {
    errorMessage(e);
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
