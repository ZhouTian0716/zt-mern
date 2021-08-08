import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formAuth, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formAuth);
    // Pass action and data to reducer
    dispatch({ type: AUTH, data });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formAuth, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formAuth);
    // Pass action and data to reducer
    dispatch({ type: AUTH, data });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};