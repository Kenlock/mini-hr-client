import * as types from '../types';
const initialState = {
  isLoading: false,
  successMessage: null,
  error: null,
  isCreated: false,
  companyId: null,
  role: null,
  fullname: null,
  id: null,
};

const defaultErrorMessage = 'Something went wrong!';
const onBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ONBOARD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.ONBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCreated: true,
        successMessage: action.payload.message,
        companyId: action.payload.data.companyId,
        role: action.payload.data.role,
        id: action.payload.data.id,
        fullname: action.payload.data.fullname,
        error: null,
      };
    case types.OTP_ERROR:
      return {
        ...state,
        isLoading: false,
        successMessage: null,
        isCreated: false,
        companyId: null,
        role: null,
        id: null,
        fullname: null,
        error: action.payload || defaultErrorMessage,
      };

    default:
      return state;
  }
};

export default onBoardReducer;
