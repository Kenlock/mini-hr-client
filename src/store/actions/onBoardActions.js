import * as types from '../types';

export const onBoardRequest = (payload) => ({
  type: types.ONBOARD_REQUEST,
  payload,
});

export const onBoardSuccess = (payload) => ({
  type: types.ONBOARD_SUCCESS,
  payload,
});

export const onBoardError = (payload) => ({
  type: types.ONBOARD_ERROR,
  payload,
});
