import api from '../apis/aws';
import { LOADING_FORM, CLEAR_LOADING_FORM, SUBMIT_FORM } from './types';

export const loadingForm = formName => {
  return {
    type: LOADING_FORM,
    payload: formName,
  };
};

export const clearLoadingForm = formName => {
  return {
    type: CLEAR_LOADING_FORM,
    payload: formName,
  };
};

export const submitForm = (url, formName, formValues) => async dispatch => {
  if (formName) {
    dispatch(loadingForm(formName));
  }

  const response = await api.post(url, formValues);
  dispatch({
    type: SUBMIT_FORM,
    payload: { name: formName, data: response.data },
  });

  if (formName) {
    dispatch(clearLoadingForm(formName));
  }
};
