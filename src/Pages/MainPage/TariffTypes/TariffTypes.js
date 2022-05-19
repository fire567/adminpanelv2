import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddItemsHeader from '../../../Component/AddItemsHeader/AddItemsHeader';
import CurrentItemsList from '../../../Component/CurrentItemsList/CurrentItemsList';
import Loading from '../../../Component/Loading/Loading';
import Pagination from '../../../Component/Pgination/Pagination';
import { getRatesTypeList, getRatesTypePages } from '../../../Redux/actions';
import { tariffsTypeSections } from '../../../consts';

const TariffTypes = ({ linkName }) => {
  const dispatch = useDispatch();
  const rateTypesList = useSelector((state) => state.rateTypesList);
  const ratesTypePages = useSelector((state) => state.ratesTypePages);
  const [tableItems, setTableItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getRatesTypePages());
  }, []);

  useEffect(() => {
    dispatch(getRatesTypeList(pageCount));
  }, [pageCount]);

  useEffect(() => {
    if (rateTypesList) {
      let ArrObj = [];
      rateTypesList.data.forEach((item) => {
        ArrObj = [...ArrObj, [item.name, item.unit, item.id]];
      });
      setTableItems(ArrObj);
    }
  }, [rateTypesList]);

  return (
    <>
      <AddItemsHeader linkName={linkName} />
      {rateTypesList && tableItems ? (
        <CurrentItemsList
          sections={tariffsTypeSections}
          tableItems={tableItems}
          linkName={linkName}
          pageCount={pageCount}
        />
      ) : (
        <Loading />
      )}
      <Pagination
        count={ratesTypePages ? ratesTypePages / 5 : 0}
        setPageCount={setPageCount}
        pageCount={pageCount}
        pagesCount={ratesTypePages}
        deleteItem={getRatesTypeList(null)}
      />
    </>
  );
};

export default TariffTypes;
