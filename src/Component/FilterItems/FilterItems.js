import React, { useState } from 'react';
import OptionFilter from '../OptionFilter/OptionFilter';
import { useDispatch } from 'react-redux';
import { getOrders, getOrdersPages } from '../../Redux/actions';
import { useCookies } from 'react-cookie';
import classes from './FilterItems.module.css';

const FilterItems = ({ items, setIsApplied, isApplied }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['access']);
  const [isEmpty, setIsEmpty] = useState(false);
  const applyFilter = () => {
    setIsApplied(!isApplied);
  };

  const declineFilter = () => {
    dispatch(getOrdersPages(cookies.access, null, null));
    dispatch(getOrders(cookies.access, 0, null, null));
    setIsEmpty(true);
  };

  return (
    <div className={classes.filter_form}>
      <div className={classes.inputs}>
        {items &&
          items.map((item) => (
            <OptionFilter
              key={item.id}
              items={item.items}
              setItem={item.setItem}
              isEmpty={isEmpty}
              setIsEmpty={setIsEmpty}
            />
          ))}
      </div>
      <div className={classes.buttons}>
        <button className={classes.decline} onClick={declineFilter}>
          Отменить
        </button>
        <button className={classes.accept} onClick={applyFilter}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default FilterItems;
