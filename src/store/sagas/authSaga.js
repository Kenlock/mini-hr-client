import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as types from '../types';
import _api from '../../services/api';
import URLS from '../../services/urls';
import * as authActions from '../actions/authActions';

// Workers
function* sendOTPWorker(params) {
  try {
    const data = yield call(_api, URLS.sendOTP, params.payload, 'POST');
    if (!data.status) {
      throw data;
    }
    yield put(authActions.sendOTPSuccess(data));
  } catch (e) {
    yield put(authActions.sendOTPError(e));
  }
}

function* verifyOTPWorker(params) {
  try {
    const data = yield call(_api, URLS.verifyOTP, params.payload, 'POST');
    if (!data.status) {
      throw data;
    }
    yield put(authActions.verifyOTPSuccess(data));
  } catch (e) {
    yield put(authActions.verifyOTPError(e));
  }
}

// Watchers
function* sendOTPWatcher() {
  yield takeLatest(types.OTP_REQUEST, sendOTPWorker);
}
function* verifyOTPWatcher() {
  yield takeLatest(types.OTP_VERIFY_REQUEST, verifyOTPWorker);
}

export default function* authSaga() {
  yield all([sendOTPWatcher(), verifyOTPWatcher()]);
}
