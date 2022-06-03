import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddItemsHeader from '../../../Component/AddItemsHeader/AddItemsHeader';
import CurrentItemsList from '../../../Component/CurrentItemsList/CurrentItemsList';
import Loading from '../../../Component/Loading/Loading';
import { getCitiesList, getCitiesPages } from '../../../Redux/actions';
import Pagination from '../../../Component/Pgination/Pagination';
import { citySections } from '../../../consts';

const CitiesList = ({ linkName }) => {
  const dispatch = useDispatch();
  const citiesList = useSelector((state) => state.citiesList);
  const citiesPages = useSelector((state) => state.citiesPages);
  const [tableItems, setTableItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getCitiesPages());
  }, []);

  useEffect(() => {
    dispatch(getCitiesList(pageCount));
  }, [pageCount]);

  useEffect(() => {
    if (citiesList) {
      let ArrObj = [];
      citiesList.data.forEach((item) => {
        ArrObj = [...ArrObj, [item.name, item.id]];
      });
      setTableItems(ArrObj);
    }
  }, [citiesList]);

  return (
    <>
      <AddItemsHeader linkName={linkName} />
      {citiesList && tableItems ? (
        <CurrentItemsList
          sections={citySections}
          tableItems={tableItems}
          linkName={linkName}
          pageCount={pageCount}
        />
      ) : (
        <Loading />
      )}
      <Pagination
        count={citiesPages ? citiesPages / 5 : 0}
        setPageCount={setPageCount}
        pageCount={pageCount}
        pagesCount={citiesPages}
        deleteItem={getCitiesList(null)}
      />
    </>
  );
};

export default CitiesList;
