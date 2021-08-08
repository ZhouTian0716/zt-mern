import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signIn = (formAuth, history) => async (dispatch) => {
  try {
    // const { data } = await api.signIn(formAuth);

    // dispatch({ type: AUTH, data });

    // history.push('/');
  } catch (error) {
    console.log(error);
  }
};

// export const signUp = (formAuth, history) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formAuth);

//     dispatch({ type: AUTH, data });

//     router.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };