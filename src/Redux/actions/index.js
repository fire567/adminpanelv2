import API from '../../apis/API';
import { Buffer } from 'buffer';

export const postAuth = (mail, password) => async (dispatch) => {
  const auth_token = Buffer.from(`121112:4cbcea96de`, 'utf-8').toString(
    'base64'
  );
  if (mail && password) {
    const response = await API.post(
      'auth/login',
      {
        username: mail,
        password: password,
      },
      {
        headers: {
          Authorization: `Basic ${auth_token}`,
        },
      }
    ).catch((error) => {
      if (error.message) {
        dispatch({
          type: 'POST_AUTH',
          payload: 'error',
        });
      }
    });
    dispatch({
      type: 'POST_AUTH',
      payload: response.data,
    });
  } else {
    dispatch({
      type: 'POST_AUTH',
      payload: null,
    });
  }
};

export const postLogout = (token) => async () => {
  await API.post('auth/logout', token, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
