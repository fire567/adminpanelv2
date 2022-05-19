import React, { useState, useEffect } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentOrderStatus,
  changeOrderStatus,
} from '../../../../Redux/actions';
import { setOrderStatusChangeArr } from '../../../../consts';

const ChangeOrderStatuses = ({ match }) => {
  const [cookies, setCookies] = useCookies('access');
  const dispatch = useDispatch();
  const currentOrderStatus = useSelector((state) => state.currentOrderStatus);
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [name, setName] = useState(null);
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);

  useEffect(() => {
    dispatch(getCurrentOrderStatus(match.params.id));
  }, []);

  useEffect(() => {
    if (currentOrderStatus) {
      setChangeObj({
        name: name !== null ? name : currentOrderStatus.data.name,
      });
    }
  }, [currentOrderStatus, name]);

  useEffect(() => {
    if (currentOrderStatus) {
      setOrderStatusChangeArr(
        setChangeArr,
        currentOrderStatus,
        name,
        setName,
        isNeedCheck,
        setIsNeedCheck
      );
    }
  }, [currentOrderStatus, name, isNeedCheck]);

  useEffect(() => {
    if (changeObj && changeObj.name !== '') {
      dispatch(changeOrderStatus(match.params.id, name, cookies.access));
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

export default ChangeOrderStatuses;
