import * as types from '../types';

const initialState = {
  isLoading: false,
  error: null,
  successMessage: null,
  data: null,
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DASHBOARD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null,
      };
    case types.DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload.data,
      };
    case types.DASHBOARD_ERROR:
      return {
        ...state,
        error: action.payload.errors,
        data: null,
      };

    default:
      return state;
  }
};

export default DashboardReducer;
