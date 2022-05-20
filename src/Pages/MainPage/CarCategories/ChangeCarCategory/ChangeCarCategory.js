import React, { useState, useEffect } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentCarCategory,
  changeCarCategory,
} from '../../../../Redux/actions';
import { setCarCategoryChangeArr } from '../../../../consts';

const ChangeCarCategory = ({ match }) => {
  const [cookies, setCookies] = useCookies('access');
  const dispatch = useDispatch();
  const currentCarCategory = useSelector((state) => state.currentCarCategory);
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [description, setDescription] = useState(null);
  const [name, setName] = useState(null);
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);

  useEffect(() => {
    dispatch(getCurrentCarCategory(match.params.id));
  }, [match]);

  useEffect(() => {
    if (currentCarCategory) {
      setChangeObj({
        description:
          description !== null
            ? description
            : currentCarCategory.data.description,
        name: name !== null ? name : currentCarCategory.data.name,
      });
    }
  }, [currentCarCategory, description, name]);

  useEffect(() => {
    if (currentCarCategory) {
      setCarCategoryChangeArr(
        setChangeArr,
        currentCarCategory,
        description,
        setDescription,
        name,
        setName,
        isNeedCheck,
        setIsNeedCheck
      );
    }
  }, [currentCarCategory, description, name, isNeedCheck]);

  useEffect(() => {
    if (changeObj && changeObj.description !== '' && changeObj.name !== '') {
      dispatch(
        changeCarCategory(
          match.params.id,
          changeObj.description,
          changeObj.name,
          cookies.access
        )
      );
    }
  }, [isAcceptBtnTriggered]);

  return (
    <>
      <IdHeader string={`Заказ № ${match.params.id}`} />
      {changeArr ? <ChangeItem changeArr={changeArr} /> : <Loading />}
      <ChangeFooter
        setIsAcceptBtnTriggered={setIsAcceptBtnTriggered}
        isAcceptBtnTriggered={isAcceptBtnTriggered}
        setIsNeedCheck={setIsNeedCheck}
      />
    </>
  );
};

export default ChangeCarCategory;
