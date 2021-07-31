import * as types from '../types';

export const addJobRequest = (payload) => ({
  type: types.ADD_JOB_REQUEST,
  payload,
});

export const addJobSuccess = (payload) => ({
  type: types.ADD_JOB_SUCCESS,
  payload,
});

export const addJobError = (payload) => ({
  type: types.ADD_JOB_ERROR,
  payload,
});

export const fetchedJobRequest = (payload) => ({
  type: types.FETCHED_JOBS_REQUEST,
  payload,
});

export const fetchedJobSuccess = (payload) => ({
  type: types.FETCHED_JOBS_SUCCESS,
  payload,
});

export const fetchedJobError = (payload) => ({
  type: types.FETCHED_JOBS_ERROR,
  payload,
});
