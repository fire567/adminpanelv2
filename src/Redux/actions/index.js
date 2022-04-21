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

export const getOrders = (token, page, city, rateId) => async (dispatch) => {
  if (token) {
    if (!city && !rateId) {
      const result = await API.get('db/order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 4,
          page,
        },
      });

      dispatch({
        type: 'GET_ORDERS',
        payload: result.data,
      });
    } else if (city && !rateId) {
      const result = await API.get('db/order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 4,
          page,
          cityId: city,
        },
      });

      dispatch({
        type: 'GET_ORDERS',
        payload: result.data,
      });
    } else if (!city && rateId) {
      const result = await API.get('db/order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 4,
          page,
          rateId: rateId,
        },
      });

      dispatch({
        type: 'GET_ORDERS',
        payload: result.data,
      });
    } else if (city && rateId) {
      const result = await API.get('db/order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 4,
          page,
          rateId,
          cityId: city,
        },
      });

      dispatch({
        type: 'GET_ORDERS',
        payload: result.data,
      });
    }
  } else {
    dispatch({
      type: 'GET_ORDERS',
      payload: null,
    });
  }
};

export const getOrdersPages = (token, city, rateId) => async (dispatch) => {
  let result = null;
  if (!city && !rateId) {
    result = await API.get('db/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 1,
        page: 1,
      },
    });
  } else if (city && !rateId) {
    result = await API.get('db/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 1,
        page: 1,
        cityId: city,
      },
    });
  } else if (!city && rateId) {
    result = await API.get('db/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 1,
        page: 1,
        rateId,
      },
    });
  } else if (city && rateId) {
    result = await API.get('db/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 1,
        page: 1,
        cityId: city,
        rateId,
      },
    });
  }

  dispatch({
    type: 'GET_ORDERSPAGES',
    payload: result.data.count,
  });
};

export const getCities = () => async (dispatch) => {
  const result = await API.get('db/city');

  dispatch({
    type: 'GET_CITIES',
    payload: result.data,
  });
};

export const getRateTypeId = () => async (dispatch) => {
  const result = await API.get('db/rateType');

  dispatch({
    type: 'GET_RATETYPES',
    payload: result.data,
  });
};

export const getRates = () => async (dispatch) => {
  const result = await API.get('db/rate');

  dispatch({
    type: 'GET_RATES',
    payload: result.data,
  });
};
