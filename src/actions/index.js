import api from '../apis/aws';
import { LOADING_FORM, CLEAR_LOADING_FORM, SUBMIT_FORM } from './types';
import { networkTransaction, dataURLtoFile } from './utils';

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

export const submitForm = ({
  url,
  formName,
  formData,
  type,
  requestType,
}) => async dispatch => {
  if (formName) {
    dispatch(loadingForm(formName));
  }

  // Default request type is post
  if (!requestType) {
    requestType = 'post';
  }

  // If only single url given insert it to an array
  if (!Array.isArray(url)) {
    url = [url];
  }

  // The last url response does not need to be converted to file
  // so we skip it
  let response = null;
  for (let i = 0; i < url.length - 1; i++) {
    response = await networkTransaction({
      url: url[i],
      formData,
      requestType,
    });

    // Data returned is string which has to be converted to file object
    let responseBlob = await fetch(
      `data:${type};base64,${response.data.data}`
    ).then(res => res.blob());
    let responseFile = new File([responseBlob], 'recording.wav', { type });

    formData = new FormData();
    formData.append('data', responseFile);
  }

  // Processing the last url in list to display in webpage
  response = await networkTransaction({
    url: url.pop(),
    formData,
    requestType,
  });

  // If response is null then this will avoid throwing error
  let responseData = response;
  if (response) {
    responseData = response.data;
  }

  dispatch({
    type: SUBMIT_FORM,
    payload: { name: formName, data: responseData },
  });

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
