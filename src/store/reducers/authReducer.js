import * as types from '../types';
const initialState = {
  mail: null,
  isLoading: false,
  error: null,
  successMessage: null,
  OTPSend: false,
  resend: 0,
  isVerified: false,
  verifiedAt: null,
};

const defaultErrorMessage = 'Something went wrong!';
export default (state = initialState, action) => {
  switch (action.type) {
    case types.OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.OTP_SUCCESS:
      return {
        ...state,
        mail: action.payload.data.email,
        isLoading: false,
        OTPSend: true,
        successMessage: action.payload.message,
        error: null,
      };
    case types.OTP_ERROR:
      return {
        ...state,
        mail: null,
        isLoading: false,
        OTPSend: false,
        successMessage: null,
        error: action.payload || defaultErrorMessage,
      };
    case types.RESEND_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.RESEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resend: state.resend + 1,
      };
    case types.OTP_VERIFY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.OTP_VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isVerified: action.payload.data.isVerified,
        verifiedAt: action.payload.data.verifiedAt,
      };
    case types.OTP_VERIFY_ERROR:
      return {
        ...state,
        isLoading: false,
        isVerified: false,
        error: action.payload.message || defaultErrorMessage,
      };

    default:
      return state;
  }
};
