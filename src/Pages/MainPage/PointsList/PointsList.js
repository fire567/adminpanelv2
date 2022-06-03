import React, { useEffect, useState } from 'react';
import AddItemsHeader from '../../../Component/AddItemsHeader/AddItemsHeader';
import CurrentItemsList from '../../../Component/CurrentItemsList/CurrentItemsList';
import Loading from '../../../Component/Loading/Loading';
import Pagination from '../../../Component/Pgination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getPoints, getPointsPages } from '../../../Redux/actions';
import { pointSections } from '../../../consts';

const PointsList = ({ linkName }) => {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.points);
  const pointsPagesCount = useSelector((state) => state.pointsPagesCount);
  const [tableItems, setTableItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getPoints(null));
    dispatch(getPointsPages());
  }, []);

  useEffect(() => {
    dispatch(getPoints(pageCount));
  }, [pageCount]);

  useEffect(() => {
    if (points) {
      let ArrObj = [];
      points.data.forEach((item) => {
        ArrObj = [
          ...ArrObj,
          [item.cityId && item.cityId.name, item.address, item.id],
        ];
      });
      setTableItems(ArrObj);
    }
  }, [points]);

  return (
    <>
      <AddItemsHeader linkName={linkName} />
      {points && tableItems ? (
        <CurrentItemsList
          sections={pointSections}
          tableItems={tableItems}
          linkName={linkName}
          pageCount={pageCount}
        />
      ) : (
        <Loading />
      )}
      <Pagination
        count={pointsPagesCount ? pointsPagesCount / 5 : 0}
        setPageCount={setPageCount}
        pageCount={pageCount}
        pagesCount={pointsPagesCount}
      />
    </>
  );
};

export default PointsList;
