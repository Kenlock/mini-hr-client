import * as types from '../types';

const initialState = {
  isLoading: false,
  error: null,
  successMessage: null,
  activeJobs: null,
  inactiveJobs: null,
  jobFetched: false,
  jobData: null,
  isJobCreated: false,
  formId: null,
  formKeys: null,
  company: null,
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHED_JOBS_REQUEST:
      return {
        ...state,
        jobFetched: false,
        isLoading: true,
      };
    case types.FETCHED_JOBS_SUCCESS:
      return {
        ...state,
        jobFetched: true,
        isLoading: false,
        successMessage: action.payload.message,
        activeJobs: action.payload.data.activeJobs,
        inactiveJobs: action.payload.data.inActiveJobs,
        company: action.payload.data.company,
      };
    case types.FETCHED_JOBS_ERROR:
      return {
        ...state,
        error: action.payload.errors,
        successMessage: null,
        jobFetched: false,
        activeJobs: null,
        inactiveJobs: null,
        company: null,
      };
    case types.ADD_JOB_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        jobData: null,
        formId: null,
        isJobCreated: false,
      };
    case types.ADD_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isJobCreated: true,
        successMessage: action.payload.message,
        jobData: action.payload.data,
        formId: action.payload.data.formId,
      };
    case types.ADD_JOB_ERROR:
      return {
        ...state,
        successMessage: null,
        error: action.payload.errors,
        isJobCreated: false,
        jobData: null,
        formId: null,
      };
    default:
      return state;
  }
};

export default JobReducer;
