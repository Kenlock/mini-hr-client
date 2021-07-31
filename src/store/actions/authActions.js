import * as types from '../types';

// Send OTP
export const sendOTPRequest = (payload) => ({
  type: types.OTP_REQUEST,
  payload,
});
export const sendOTPSuccess = (payload) => ({
  type: types.OTP_SUCCESS,
  payload,
});
export const sendOTPError = (payload) => ({
  type: types.OTP_ERROR,
  payload,
});

// Verify OTP
export const verifyOTPRequest = (payload) => ({
  type: types.OTP_VERIFY_REQUEST,
  payload,
});
export const verifyOTPSuccess = (payload) => ({
  type: types.OTP_VERIFY_SUCCESS,
  payload,
});
export const verifyOTPError = (payload) => ({
  type: types.OTP_VERIFY_ERROR,
  payload,
});

// Resend OTP
export const resendOTPRequest = (payload) => ({
  type: types.RESEND_OTP_REQUEST,
  payload,
});
export const resendOTPSuccess = (payload) => ({
  type: types.RESEND_OTP_SUCCESS,
  payload,
});
