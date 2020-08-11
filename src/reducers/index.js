import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import loadingFormReducer from './loadingFormReducer';
import modelFormReducer from './modelFormReducer';

export default combineReducers({
  form: formReducer,
  loadingForm: loadingFormReducer,
  modelForm: modelFormReducer,
});
