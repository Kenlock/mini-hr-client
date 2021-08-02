import { combineReducers } from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authReducer from './authReducer';
import onBoardReducer from './onBoardReducer';
import dashboardReducer from './dashboardReducer';
import jobReducer from './jobReducer';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [],
};

const jobPersist = {
  key: 'job',
  storage,
  blacklist: ['activeJobs', 'inactiveJobs', 'allJobs', 'company', 'jobFetched'],
};

const rootReducer = combineReducers({
  Auth: authReducer,
  User: onBoardReducer,
  Dashboard: dashboardReducer,
  Job: persistReducer(jobPersist, jobReducer),
});

export default persistReducer(persistConfig, rootReducer);
