import { SUBMIT_FORM } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  data: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
