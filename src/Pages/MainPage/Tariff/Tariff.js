import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRatesList, getRatesPages } from '../../../Redux/actions';
import AddItemsHeader from '../../../Component/AddItemsHeader/AddItemsHeader';
import Loading from '../../../Component/Loading/Loading';
import CurrentItemsList from '../../../Component/CurrentItemsList/CurrentItemsList';
import Pagination from '../../../Component/Pgination/Pagination';
import { tariffSections } from '../../../consts';

const Tariff = () => {
  const dispatch = useDispatch();
  const ratesList = useSelector((state) => state.ratesList);
  const ratesPages = useSelector((state) => state.ratesPages);
  const [tableItems, setTableItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getRatesPages());
  }, []);

  useEffect(() => {
    dispatch(getRatesList(pageCount));
  }, [pageCount]);

  useEffect(() => {
    if (ratesList) {
      let ArrObj = [];
      ratesList.data.forEach((item) => {
        ArrObj = [
          ...ArrObj,
          [item.rateTypeId && item.rateTypeId.name, item.price],
        ];
      });
      setTableItems(ArrObj);
    }
  }, [ratesList]);

  return (
    <>
      <AddItemsHeader />
      {ratesList && tableItems ? (
        <CurrentItemsList sections={tariffSections} tableItems={tableItems} />
      ) : (
        <Loading />
      )}
      <Pagination
        count={ratesPages ? ratesPages / 5 : 0}
        setPageCount={setPageCount}
        pageCount={pageCount}
        pagesCount={ratesPages}
        deleteItem={getRatesList(null)}
      />
    </>
  );
};

export default Tariff;
