import React, { useState, useEffect } from 'react';
import AddItemsHeader from '../../../Component/AddItemsHeader/AddItemsHeader';
import CurrentItemsList from '../../../Component/CurrentItemsList/CurrentItemsList';
import Loading from '../../../Component/Loading/Loading';
import Pagination from '../../../Component/Pgination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderStatuses,
  getOrderStatusesPages,
} from '../../../Redux/actions';
import { orderStatusessections } from '../../../consts';

const OrderStatuses = ({ linkName }) => {
  const dispatch = useDispatch();
  const orderStatuses = useSelector((state) => state.orderStatuses);
  const orderStatusesPages = useSelector((state) => state.orderStatusesPages);
  const [tableItems, setTableItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getOrderStatusesPages());
  }, []);

  useEffect(() => {
    dispatch(getOrderStatuses(pageCount));
  }, [pageCount]);

  useEffect(() => {
    if (orderStatuses) {
      let ArrObj = [];
      orderStatuses.data.forEach((item) => {
        ArrObj = [...ArrObj, [item.name, item.id]];
      });
      setTableItems(ArrObj);
    }
  }, [orderStatuses]);
  return (
    <>
      <AddItemsHeader linkName={linkName} />
      {orderStatuses && tableItems ? (
        <CurrentItemsList
          sections={orderStatusessections}
          tableItems={tableItems}
          linkName={linkName}
          pageCount={pageCount}
        />
      ) : (
        <Loading />
      )}
      {orderStatusesPages / 5 < 1 ? (
        <div className='empty' style={{ height: '59px' }} />
      ) : (
        <Pagination
          count={orderStatusesPages ? orderStatusesPages / 5 : 0}
          setPageCount={setPageCount}
          pageCount={pageCount}
          pagesCount={orderStatusesPages}
          deleteItem={getOrderStatusesPages(null)}
        />
      )}
    </>
  );
};

export default OrderStatuses;
