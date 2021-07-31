import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as types from '../types';
import _api from '../../services/api';
import URLS from '../../services/urls';
import * as onBoardActions from '../actions/onBoardActions';

// Workers
function* onBoardWorker(params) {
  try {
    const data = yield call(_api, URLS.onBoard, params.payload, 'POST');
    if (!data.status) {
      throw data;
    }
    // save auth token to local storage
    localStorage.setItem('authToken', data.data.authToken);
    yield put(onBoardActions.onBoardSuccess(data));
  } catch (e) {
    yield put(onBoardActions.onBoardError(e));
  }
}

// Watchers
function* onBoardWatcher() {
  yield takeLatest(types.ONBOARD_REQUEST, onBoardWorker);
}

export default function* onBoardSaga() {
  yield all([onBoardWatcher()]);
}
