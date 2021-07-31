import { all } from 'redux-saga/effects';
import AuthSaga from './authSaga';
import onBoardSaga from './onBoardSaga';
import dashboardSaga from './dashboardSaga';
import jobSaga from './jobSaga';
export default function* rootSaga() {
  yield all([AuthSaga(), onBoardSaga(), dashboardSaga(), jobSaga()]);
}
