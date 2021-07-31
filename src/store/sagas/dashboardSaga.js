import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as types from '../types';
import _api from '../../services/api';
import URLS from '../../services/urls';
import * as dashboardActions from '../actions/dashboardActions';

// Workers
function* dashboardWorker(params) {
  try {
    const data = yield call(_api, URLS.dashboard, params.payload, 'GET');
    if (!data.status) {
      throw data;
    }
    yield put(dashboardActions.dashboardSuccess(data));
  } catch (e) {
    yield put(dashboardActions.dashboardError(e));
  }
}



// Watchers
function* dashboardWatcher() {
  yield takeLatest(types.DASHBOARD_REQUEST, dashboardWorker);
}


export default function* dashboardSaga() {
  yield all([dashboardWatcher()]);
}
