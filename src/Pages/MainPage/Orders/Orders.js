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
  setOrdersCurrentPage,
} from '../../../Redux/actions';
import CurrentOrder from './CurrentOrder/CurrentOrder';
import { useCookies } from 'react-cookie';
import classes from './Orders.module.css';
import Loading from '../../../Component/Loading/Loading';
import {
  reduceOrdersPagesCount,
  reduceCities,
  reduceRateTypes,
  reduceRates,
  reduceOrders,
  reducerOrdersCurrentPage,
} from '../../../Redux/reducers';

const Orders = () => {
  const [cookies] = useCookies(['access']);
  const dispatch = useDispatch();
  const mapState = (state) => ({
    orders: reduceOrders(state),
    ordersPagesCount: reduceOrdersPagesCount(state),
    cities: reduceCities(state),
    rateTypes: reduceRateTypes(state),
    rates: reduceRates(state),
    ordersCurrentPage: reducerOrdersCurrentPage(state),
  });
  const {
    orders,
    ordersPagesCount,
    cities,
    rateTypes,
    rates,
    ordersCurrentPage,
  } = useSelector(mapState);
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
        ordersCurrentPage,
        citiesFilter,
        rateTypeFilter && rateFilter
      )
    );
  }, [ordersCurrentPage]);

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
    dispatch(getOrders(cookies.access, ordersCurrentPage, null, null));
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
        ordersCurrentPage,
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
        setPageCount={setOrdersCurrentPage}
        orderPageCount={ordersCurrentPage}
        pagesCount={ordersPagesCount}
        deleteItem={getOrders(null)}
      />
    </>
  );
};

export default Orders;
