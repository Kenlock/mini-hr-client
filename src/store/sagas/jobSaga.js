import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as types from '../types';
import _api from '../../services/api';
import URLS from '../../services/urls';
import * as jobActions from '../actions/jobsActions';

// Workers
function* fetchAllJobsWorker(params) {
  try {
    const data = yield call(_api, URLS.fetchAllJobs, params.payload, 'POST');
    if (!data.status) {
      throw data;
    }
    yield put(jobActions.fetchedJobSuccess(data));
  } catch (e) {
    yield put(jobActions.fetchedJobError(e));
  }
}

function* createNewJobWorker(params) {
  try {
    const data = yield call(_api, URLS.createJob, params.payload, 'POST');
    if (!data.status) {
      throw data;
    }
    yield put(jobActions.addJobSuccess(data));
  } catch (error) {
    yield put(jobActions.addJobError(error));
  }
}

// Watchers
function* fetchAllJobsWatcher() {
  yield takeLatest(types.FETCHED_JOBS_REQUEST, fetchAllJobsWorker);
}

function* createNewJobWatcher() {
  yield takeLatest(types.ADD_JOB_REQUEST, createNewJobWorker);
}

export default function* jobSaga() {
  yield all([fetchAllJobsWatcher(), createNewJobWatcher()]);
}
