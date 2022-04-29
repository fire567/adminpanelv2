import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddItemsHeader from '../../../Component/AddItemsHeader/AddItemsHeader';
import Loading from '../../../Component/Loading/Loading';
import CurrentItemsList from '../../../Component/CurrentItemsList/CurrentItemsList';
import Pagination from '../../../Component/Pgination/Pagination';
import {
  getCarCategories,
  getCarCategoriesPages,
} from '../../../Redux/actions';
import { CarCategorySections } from '../../../consts';

const CarCategories = () => {
  const dispatch = useDispatch();
  const carCategories = useSelector((state) => state.carCategories);
  const carCategoriesPages = useSelector((state) => state.carCategoriesPages);
  const [tableItems, setTableItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getCarCategoriesPages());
  }, []);

  useEffect(() => {
    dispatch(getCarCategories(pageCount));
  }, [pageCount]);

  useEffect(() => {
    if (carCategories) {
      let ArrObj = [];
      carCategories.data.forEach((item) => {
        ArrObj = [...ArrObj, [item.name, item.description]];
      });
      setTableItems(ArrObj);
    }
  }, [carCategories]);

  return (
    <>
      <AddItemsHeader />
      {carCategories && tableItems ? (
        <CurrentItemsList
          sections={CarCategorySections}
          tableItems={tableItems}
        />
      ) : (
        <Loading />
      )}
      <Pagination
        count={carCategoriesPages ? carCategoriesPages / 5 : 0}
        setPageCount={setPageCount}
        pageCount={pageCount}
        pagesCount={carCategoriesPages}
        deleteItem={getCarCategories(null)}
      />
    </>
  );
};

export default CarCategories;
