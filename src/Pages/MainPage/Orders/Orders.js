import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterItems from '../../../Component/FilterItems/FilterItems';
import Pagination from '../../../Component/Pgination/Pagination';
import { getOrders } from '../../../Redux/actions';
import { useCookies } from 'react-cookie';
import classes from './Orders.module.css';

const Orders = () => {
  const [cookies] = useCookies(['access']);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.odrers);

  console.log(orders);

  useEffect(() => {
    dispatch(getOrders(cookies.access));
  }, []);

  return (
    <>
      <FilterItems />
      <div className={classes.content}>Content</div>
      <Pagination />
    </>
  );
};

export default Orders;
