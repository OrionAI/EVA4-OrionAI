import api from '../apis/aws';
import { LOADING_FORM, CLEAR_LOADING_FORM, SUBMIT_FORM } from './types';
import { dataURLtoFile } from './utils';

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

  let numTries = 0;
  while (numTries >= 0 && numTries <= 2) {
    try {
      const response = await api.post(url, formValues);
      numTries = -1;
      dispatch({
        type: SUBMIT_FORM,
        payload: { name: formName, data: response.data },
      });
    } catch (error) {
      console.log(error);
      numTries++;
    }
  }

  if (formName) {
    dispatch(clearLoadingForm(formName));
  }
};

export const submitGetForm = (url, formName) => async dispatch => {
  if (formName) {
    dispatch(loadingForm(formName));
  }

  try {
    const response = await api.get(url);
    dispatch({
      type: SUBMIT_FORM,
      payload: { name: formName, data: response.data },
    });
  } catch (error) {
    console.log(error);
  }

  if (formName) {
    dispatch(clearLoadingForm(formName));
  }
};

export const recognizeFace = ({
  alignURL,
  recognizeURL,
  formName,
  formValues,
}) => async dispatch => {
  if (formName) {
    dispatch(loadingForm(formName));
  }

  try {
    let response = await api.post(alignURL, formValues);
    if (response.data.result !== 'success') {
      dispatch({
        type: SUBMIT_FORM,
        payload: { name: formName, data: response.data },
      });
    } else {
      let responseURI = dataURLtoFile(
        `data:image/jpeg;base64,${response.data.data}`,
        'response.jpg'
      );

      const data = new FormData();
      data.append('image', responseURI);

      response = await api.post(recognizeURL, data);
      dispatch({
        type: SUBMIT_FORM,
        payload: { name: formName, data: response.data },
      });
    }
  } catch (error) {
    console.log(error);
  }

  if (formName) {
    dispatch(clearLoadingForm(formName));
  }
};
