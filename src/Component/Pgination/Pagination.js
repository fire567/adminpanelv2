import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import classes from './Pagination.module.css';

const Pagination = ({
  count,
  setPageCount,
  pagesCount,
  orderPageCount,
  deleteItem,
}) => {
  const dispatch = useDispatch();

  console.log(orderPageCount);

  const changePageHandler = (e) => {
    dispatch(deleteItem);
    if (orderPageCount || orderPageCount === 0) {
      dispatch(setPageCount(e.selected));
    } else {
      setPageCount(e.selected);
    }
  };

  return (
    <div className={classes.pagination}>
      {pagesCount && (
        <ReactPaginate
          pageCount={count}
          initialPage={orderPageCount ? orderPageCount : 0}
          className={classes.pagination_form}
          pageClassName={classes.pageClassName}
          previousClassName={classes.previousClassName}
          nextClassName={classes.nextClassName}
          breakClassName={classes.breakClassName}
          containerClassName={classes.containerClassName}
          nextLabel='»'
          previousLabel='«'
          activeClassName={classes.activeClassName}
          onPageChange={(e) => changePageHandler(e)}
        />
      )}
    </div>
  );
};

export default Pagination;
