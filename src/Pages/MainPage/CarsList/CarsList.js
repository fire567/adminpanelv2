import React, { useEffect, useState } from 'react';
import AddItemsHeader from '../../../Component/AddItemsHeader/AddItemsHeader';
import { useDispatch } from 'react-redux';
import { getCars } from '../../../Redux/actions';
import { useSelector } from 'react-redux';
import CurrentItemsList from '../../../Component/CurrentItemsList/CurrentItemsList';
import Loading from '../../../Component/Loading/Loading';
import { carSections } from '../../../consts';
import Pagination from '../../../Component/Pgination/Pagination';
import { getCarsPages } from '../../../Redux/actions';

const CarsList = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);
  const carsPagesCount = useSelector((state) => state.carsPagesCount);
  const [tableItems, setTableItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getCarsPages());
  }, []);

  useEffect(() => {
    dispatch(getCars(pageCount));
  }, [pageCount]);

  useEffect(() => {
    if (cars) {
      let ArrObj = [];
      cars.data.forEach((item) => {
        ArrObj = [
          ...ArrObj,
          [
            item.name && item.name,
            item.priceMin && item.priceMin,
            item.priceMax && item.priceMax,
          ],
        ];
      });
      setTableItems(ArrObj);
    }
  }, [cars]);

  return (
    <>
      <AddItemsHeader />
      {cars && tableItems ? (
        <CurrentItemsList sections={carSections} tableItems={tableItems} />
      ) : (
        <Loading />
      )}
      <Pagination
        count={carsPagesCount ? carsPagesCount / 5 : 0}
        setPageCount={setPageCount}
        pageCount={pageCount}
        pagesCount={carsPagesCount}
        deleteItem={getCars(null)}
      />
    </>
  );
};

export default CarsList;
