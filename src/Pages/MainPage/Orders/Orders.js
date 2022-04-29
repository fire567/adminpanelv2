import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterItems from '../../../Component/FilterItems/FilterItems';
import Pagination from '../../../Component/Pgination/Pagination';
import {
  getOrders,
  getOrdersPages,
  getCities,
  getRateTypeId,
  getRates,
} from '../../../Redux/actions';
import CurrentOrder from './CurrentOrder/CurrentOrder';
import { useCookies } from 'react-cookie';
import classes from './Orders.module.css';
import Loading from '../../../Component/Loading/Loading';

const Orders = () => {
  const [cookies] = useCookies(['access']);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const ordersPagesCount = useSelector((state) => state.ordersPagesCount);
  const cities = useSelector((state) => state.cities);
  const rateTypes = useSelector((state) => state.rateTypes);
  const rates = useSelector((state) => state.rates);
  const [pageCount, setPageCount] = useState(0);
  const [odrersFilter, setOrdersFilter] = useState(null);
  const [citiesFilter, setCitiesFilter] = useState(null);
  const [rateTypeFilter, setRateTypeFilter] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [isDecline, setIsDecline] = useState(false);
  const [rateFilter, setRateFilter] = useState(null);

  useEffect(() => {
    dispatch(
      getOrders(
        cookies.access,
        pageCount,
        citiesFilter,
        rateTypeFilter && rateFilter
      )
    );
  }, [pageCount]);

  useEffect(() => {
    dispatch(getCities());
    dispatch(getRateTypeId());
    dispatch(getRates());
  }, []);

  useEffect(() => {
    if (cities && rateTypes && rates) {
      const ratesFilter = rateTypes.data.filter((item) => {
        for (let i = 0; i < rates.data.length; i++) {
          if (item.id && rates.data[i].rateTypeId) {
            if (item.id === rates.data[i].rateTypeId.id) {
              return item;
            }
          }
        }
      });
      setOrdersFilter([
        { id: 0, items: cities.data, setItem: setCitiesFilter },
        { id: 1, items: ratesFilter, setItem: setRateTypeFilter },
      ]);
    }
  }, [cities, rateTypes, rates]);

  useEffect(() => {
    setCitiesFilter(null);
    setRateFilter(null);
    setPageCount(1);
    dispatch(getOrders(cookies.access, pageCount, null, null));
  }, [isDecline]);

  useEffect(() => {
    let ratesFilter = null;
    if (rateTypeFilter) {
      ratesFilter = rates.data.filter((item) => {
        return item.rateTypeId && item.rateTypeId.id === rateTypeFilter;
      });
    }

    setRateFilter(rateTypeFilter && ratesFilter[0].id);

    dispatch(
      getOrdersPages(
        cookies.access,
        citiesFilter,
        rateTypeFilter && ratesFilter[0].id
      )
    );

    dispatch(
      getOrders(
        cookies.access,
        pageCount,
        citiesFilter,
        rateTypeFilter && ratesFilter[0].id
      )
    );
  }, [isApplied]);

  return (
    <>
      <FilterItems
        items={odrersFilter}
        setIsApplied={setIsApplied}
        isApplied={isApplied}
        setPageCount={setPageCount}
        setIsDecline={setIsDecline}
        isDecline={isDecline}
      />
      {orders ? (
        <div className={classes.content}>
          {orders.data.map((item) => (
            <CurrentOrder item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
      <Pagination
        count={ordersPagesCount ? ordersPagesCount / 4 : 0}
        setPageCount={setPageCount}
        pageCount={pageCount}
        pagesCount={ordersPagesCount}
        deleteItem={getOrders(null)}
      />
    </>
  );
};

export default Orders;
