import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCities,
  getPoints,
  getCurrentOrder,
} from '../../../../Redux/actions';

const ChangeOrder = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCities);
    dispatch(getPoints);
    dispatch(getCurrentOrder(match.params.id));
  }, []);

  useEffect(() => {}, []);
  return <div>qwe</div>;
};

export default ChangeOrder;
