import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import classes from './Pagination.module.css';

const Pagination = ({ count, setPageCount, pagesCount, deleteItem }) => {
  const dispatch = useDispatch();

  const changePageHandler = (e) => {
    dispatch(deleteItem);
    setPageCount(e.selected);
  };

  return (
    <div className={classes.pagination}>
      {pagesCount && (
        <ReactPaginate
          pageCount={count}
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
