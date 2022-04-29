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

export const getCars = (page) => async (dispatch) => {
  if (page === null) {
    dispatch({
      type: 'GET_CARS',
      payload: null,
    });
  } else {
    const result = await API.get('db/car', {
      params: {
        limit: 5,
        page,
      },
    });

    dispatch({
      type: 'GET_CARS',
      payload: result.data,
    });
  }
};

export const getCarsPages = () => async (dispatch) => {
  const result = await API.get('db/car', {
    params: {
      limit: 5,
      page: 1,
    },
  });

  dispatch({
    type: 'GET_CARSPAGES',
    payload: result.data.count,
  });
};

export const getCitiesList = (page) => async (dispatch) => {
  if (page === null) {
    dispatch({
      type: 'GET_CITIESLIST',
      payload: null,
    });
  } else {
    const result = await API.get('db/city', {
      params: {
        limit: 5,
        page,
      },
    });

    dispatch({
      type: 'GET_CITIESLIST',
      payload: result.data,
    });
  }
};

export const getCitiesPages = () => async (dispatch) => {
  const result = await API.get('db/city', {
    params: {
      limit: 1,
      page: 1,
    },
  });

  dispatch({
    type: 'GET_CITIESPAGES',
    payload: result.data.count,
  });
};

export const getPoints = (page) => async (dispatch) => {
  if (page === null) {
    dispatch({
      type: 'GET_POINTS',
      payload: null,
    });
  } else {
    const result = await API.get('db/point', {
      params: {
        limit: 5,
        page,
      },
    });

    dispatch({
      type: 'GET_POINTS',
      payload: result.data,
    });
  }
};

export const getPointsPages = () => async (dispatch) => {
  const result = await API.get('db/point', {
    params: {
      limit: 1,
      page: 1,
    },
  });

  dispatch({
    type: 'GET_POINTPAGES',
    payload: result.data.count,
  });
};

export const getRatesList = (page) => async (dispatch) => {
  if (page === null) {
    dispatch({
      type: 'GET_RATESLIST',
      payload: null,
    });
  } else {
    const result = await API.get('db/rate', {
      params: {
        limit: 5,
        page,
      },
    });

    dispatch({
      type: 'GET_RATESLIST',
      payload: result.data,
    });
  }
};

export const getRatesPages = () => async (dispatch) => {
  const result = await API.get('db/rate', {
    params: {
      limit: 1,
      page: 1,
    },
  });

  dispatch({
    type: 'GET_RATESPAGES',
    payload: result.data.count,
  });
};

export const getRatesTypeList = (page) => async (dispatch) => {
  if (page === null) {
    dispatch({
      type: 'GET_RATESTYPELIST',
      payload: null,
    });
  } else {
    const result = await API.get('db/rateType', {
      params: {
        limit: 5,
        page,
      },
    });

    dispatch({
      type: 'GET_RATESTYPELIST',
      payload: result.data,
    });
  }
};

export const getRatesTypePages = () => async (dispatch) => {
  const result = await API.get('db/rateType', {
    params: {
      limit: 1,
      page: 1,
    },
  });

  dispatch({
    type: 'GET_RATESTYPEPAGES',
    payload: result.data.count,
  });
};

export const getCarCategories = (page) => async (dispatch) => {
  if (page === null) {
    dispatch({
      type: 'GET_CARCATEGORIES',
      payload: null,
    });
  } else {
    const result = await API.get('db/category', {
      params: {
        limit: 5,
        page,
      },
    });

    dispatch({
      type: 'GET_CARCATEGORIES',
      payload: result.data,
    });
  }
};

export const getCarCategoriesPages = () => async (dispatch) => {
  const result = await API.get('db/category', {
    params: {
      limit: 1,
      page: 1,
    },
  });

  dispatch({
    type: 'GET_CARCATEGORIESPAGES',
    payload: result.data.count,
  });
};

export const getOrderStatuses = (page) => async (dispatch) => {
  if (page === null) {
    dispatch({
      type: 'GET_ORDERSTATUSES',
      payload: null,
    });
  } else {
    const result = await API.get('db/orderStatus', {
      params: {
        limit: 5,
        page,
      },
    });

    dispatch({
      type: 'GET_ORDERSTATUSES',
      payload: result.data,
    });
  }
};

export const getOrderStatusesPages = () => async (dispatch) => {
  const result = await API.get('db/orderStatus', {
    params: {
      limit: 1,
      page: 1,
    },
  });

  dispatch({
    type: 'GET_ORDERSTATUSESPAGES',
    payload: result.data.count,
  });
};
