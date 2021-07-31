import * as types from '../types';

export const dashboardRequest = (payload) => ({
  type: types.DASHBOARD_REQUEST,
  payload,
});

export const dashboardSuccess = (payload) => ({
  type: types.DASHBOARD_SUCCESS,
  payload,
});

export const dashboardError = (payload) => ({
  type: types.DASHBOARD_ERROR,
  payload,
});
