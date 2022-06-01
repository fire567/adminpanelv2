import API from '../../apis/API';
import history from '../../history';
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

export const getPointsList = () => async (dispatch) => {
  const result = await API.get('db/point');

  dispatch({
    type: 'GET_POINTSLIST',
    payload: result.data,
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

export const getCategoriesList = () => async (dispatch) => {
  const result = await API.get('db/category');

  dispatch({
    type: 'GET_CATEGORIESLIST',
    payload: result.data,
  });
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

export const getCurrentOrder = (id) => async (dispatch) => {
  let result = {};
  if (id) {
    result = await API.get(`db/order/${id}`).catch((error) => {
      if (error) {
        history.push('/adminpanelv2#/adminpanelv2/main-page/error');
        location.reload();
      }
    });
  } else {
    result = { data: null };
  }

  dispatch({
    type: 'GET_CURRENTORDER',
    payload: result.data,
  });
};

export const changeCurrentOrder =
  (
    id,
    orderStatusId,
    cityId,
    pointId,
    dateFrom,
    dateTo,
    rateId,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel
  ) =>
  async (dispatch) => {
    const result = await API.put(`db/order/${id}`, {
      orderStatusId,
      cityId,
      pointId,
      dateFrom,
      dateTo,
      rateId,
      price,
      isFullTank,
      isNeedChildChair,
      isRightWheel,
    });

    dispatch({
      type: 'PUT_CURRENTORDER',
      payload: result.data,
    });

    history.goBack();
  };

export const changeCurrentOrderStatus =
  (id, orderStatusId) => async (dispatch) => {
    const result = await API.put(`db/order/${id}`, {
      orderStatusId,
    });

    dispatch({
      type: 'PUT_CURRENTORDERSTATUS',
      payload: result.data,
    });
  };

export const getCurrentCity = (id) => async (dispatch) => {
  let result = {};
  if (id) {
    result = await API.get(`db/city/${id}`).catch((error) => {
      if (error) {
        history.push('/adminpanelv2#/adminpanelv2/main-page/error');
        location.reload();
      }
    });
  } else {
    result = { data: null };
  }

  dispatch({
    type: 'GET_CURRENTCITY',
    payload: result.data,
  });
};

export const changeCity = (id, name, token) => async (dispatch) => {
  const result = await API.put(
    `db/city/${id}`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: 'PUT_CITY',
    payload: result.data,
  });
  history.goBack();
};

export const addCity = (name, token) => async (dispatch) => {
  const result = await API.post(
    `db/city`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: 'POST_CITY',
    payload: result.data,
  });
  history.goBack();
};

export const deleteCity =
  (id, token, setIsPopUpOpened, pageCount) => async (dispatch) => {
    const result = await API.delete(`db/city/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'DELETE_CITY',
    });

    setIsPopUpOpened(false);
    dispatch(getCitiesList(pageCount));
  };

export const getCurrentPoint = (id) => async (dispatch) => {
  let result = {};
  if (id) {
    result = await API.get(`db/point/${id}`).catch((error) => {
      if (error) {
        history.push('/adminpanelv2#/adminpanelv2/main-page/error');
        location.reload();
      }
    });
  } else {
    result = { data: null };
  }

  dispatch({
    type: 'GET_CURRENTPOINT',
    payload: result.data,
  });
};

export const changePoint =
  (id, cityId, address, name, token) => async (dispatch) => {
    const result = await API.put(
      `db/point/${id}`,
      {
        address,
        name,
        cityId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: 'PUT_CURRENTCITY',
      payload: result.data,
    });
    history.goBack();
  };

export const addPoint = (cityId, address, name, token) => async (dispatch) => {
  const result = await API.post(
    `db/point/`,
    {
      address,
      name,
      cityId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: 'POST_CURRENTCITY',
    payload: result.data,
  });
  history.goBack();
};

export const deletePoint =
  (id, token, setIsPopUpOpened, pageCount) => async (dispatch) => {
    const result = await API.delete(`db/point/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'DELETE_POINT',
    });

    setIsPopUpOpened(false);
    dispatch(getPoints(pageCount));
  };

export const getCurrentRate = (id) => async (dispatch) => {
  let result = {};
  if (id) {
    result = await API.get(`db/rate/${id}`).catch((error) => {
      if (error) {
        history.push('/adminpanelv2#/adminpanelv2/main-page/error');
        location.reload();
      }
    });
  } else {
    result = { data: null };
  }

  dispatch({
    type: 'GET_CURRENTRATE',
    payload: result.data,
  });
};

export const changeRate =
  (id, rateTypeId, price, token) => async (dispatch) => {
    const result = await API.put(
      `db/rate/${id}`,
      {
        rateTypeId,
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: 'PUT_CURRENTRATE',
      payload: result.data,
    });
    history.goBack();
  };

export const addRate = (rateTypeId, price, token) => async (dispatch) => {
  const result = await API.post(
    `db/rate`,
    {
      rateTypeId,
      price,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: 'POST_CURRENTRATE',
    payload: result.data,
  });
  history.goBack();
};

export const deleteRate =
  (id, token, setIsPopUpOpened, pageCount) => async (dispatch) => {
    const result = await API.delete(`db/rate/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'DELETE_RATE',
    });

    setIsPopUpOpened(false);
    dispatch(getRatesList(pageCount));
  };

export const getCurrentRateType = (id) => async (dispatch) => {
  let result = {};
  if (id) {
    result = await API.get(`db/rateType/${id}`).catch((error) => {
      if (error) {
        history.push('/adminpanelv2#/adminpanelv2/main-page/error');
        location.reload();
      }
    });
  } else {
    result = { data: null };
  }

  dispatch({
    type: 'GET_CURRENTRATETYPE',
    payload: result.data,
  });
};

export const changeRateType = (id, unit, name, token) => async (dispatch) => {
  const result = await API.put(
    `db/rateType/${id}`,
    {
      unit,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: 'PUT_CURRENTRATETYPE',
    payload: result.data,
  });
  history.goBack();
};

export const addRateType = (unit, name, token) => async (dispatch) => {
  const result = await API.post(
    `db/rateType`,
    {
      unit,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: 'POST_CURRENTRATETYPE',
    payload: result.data,
  });
  history.goBack();
};

export const deleteRateType =
  (id, token, setIsPopUpOpened, pageCount) => async (dispatch) => {
    const result = await API.delete(`db/rateType/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'DELETE_RATETYPE',
    });

    setIsPopUpOpened(false);
    dispatch(getRatesTypeList(pageCount));
  };

export const getCurrentCarCategory = (id) => async (dispatch) => {
  let result = {};
  if (id) {
    result = await API.get(`db/category/${id}`).catch((error) => {
      if (error) {
        history.push('/adminpanelv2#/adminpanelv2/main-page/error');
        location.reload();
      }
    });
  } else {
    result = { data: null };
  }

  dispatch({
    type: 'GET_CURRENTCARCATEGORY',
    payload: result.data,
  });
};

export const changeCarCategory =
  (id, description, name, token) => async (dispatch) => {
    const result = await API.put(
      `db/category/${id}`,
      {
        description,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: 'PUT_CURRENTCARCATEGORY',
      payload: result.data,
    });
    history.goBack();
  };

export const addCarCategory =
  (description, name, token) => async (dispatch) => {
    const result = await API.post(
      `db/category`,
      {
        description,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: 'POST_CURRENTCARCATEGORY',
      payload: result.data,
    });
    history.goBack();
  };

export const deleteCategory =
  (id, token, setIsPopUpOpened, pageCount) => async (dispatch) => {
    const result = await API.delete(`db/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'DELETE_CATEGORY',
    });

    setIsPopUpOpened(false);
    dispatch(getCarCategories(pageCount));
  };

export const getCurrentOrderStatus = (id) => async (dispatch) => {
  let result = {};
  if (id) {
    result = await API.get(`db/orderStatus/${id}`).catch((error) => {
      if (error) {
        history.push('/adminpanelv2#/adminpanelv2/main-page/error');
        location.reload();
      }
    });
  } else {
    result = { data: null };
  }

  dispatch({
    type: 'GET_CURRENTORDERSTATUS',
    payload: result.data,
  });
};

export const changeOrderStatus = (id, name, token) => async (dispatch) => {
  const result = await API.put(
    `db/orderStatus/${id}`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: 'PUT_CURRENTORDERSTATUS',
    payload: result.data,
  });
  history.goBack();
};

export const addOrderStatus = (name, token) => async (dispatch) => {
  const result = await API.post(
    `db/orderStatus`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: 'POST_CURRENTORDERSTATUS',
    payload: result.data,
  });
  history.goBack();
};

export const deleteOrderStatus =
  (id, token, setIsPopUpOpened, pageCount) => async (dispatch) => {
    const result = await API.delete(`db/orderStatus/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'DELETE_ORDERSTATUSES',
    });

    setIsPopUpOpened(false);
    dispatch(getOrderStatuses(pageCount));
  };

export const getCurrentCar = (id) => async (dispatch) => {
  let result = {};
  if (id) {
    result = await API.get(`db/car/${id}`).catch((error) => {
      if (error) {
        history.push('/adminpanelv2#/adminpanelv2/main-page/error');
        location.reload();
      }
    });
  } else {
    result = { data: null };
  }

  dispatch({
    type: 'GET_CURRENTCAR',
    payload: result.data,
  });
};

export const changeCar =
  (
    id,
    priceMin,
    priceMax,
    name,
    description,
    categoryId,
    colors,
    thumbnail,
    number,
    token
  ) =>
  async (dispatch) => {
    const result = await API.put(
      `db/car/${id}`,
      {
        priceMin,
        priceMax,
        name,
        description,
        categoryId,
        colors,
        thumbnail,
        number,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: 'PUT_CURRENTCARCHANGE',
      payload: result.data,
    });
    history.goBack();
  };

export const setIsAlertActive = (isActive) => {
  return {
    type: 'IS_ALERTACTIVE',
    payload: isActive,
  };
};

export const addCar =
  (
    priceMin,
    priceMax,
    name,
    description,
    categoryId,
    colors,
    thumbnail,
    number,
    token
  ) =>
  async (dispatch) => {
    const result = await API.post(
      `db/car`,
      {
        priceMin,
        priceMax,
        name,
        description,
        categoryId,
        colors,
        thumbnail,
        number,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: 'POST_CURRENTCARCHANGE',
      payload: result.data,
    });
    dispatch(setIsAlertActive(true));
    history.goBack();
  };

export const deleteCar =
  (id, token, setIsPopUpOpened, pageCount) => async (dispatch) => {
    const result = await API.delete(`db/car/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'DELETE_CURRENTCAR',
    });
    if (pageCount) {
      setIsPopUpOpened(false);
      dispatch(getCars(pageCount));
    }
    if (pageCount === undefined || pageCount === null) {
      history.goBack();
    }
  };

export const setOrdersCurrentPage = (page) => {
  return {
    type: 'ORDERS_CURRENTPAGE',
    payload: page,
  };
};
