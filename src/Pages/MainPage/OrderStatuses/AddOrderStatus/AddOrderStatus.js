import React, { useState, useEffect } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderStatusChangeArr } from '../../../../consts';
import { addOrderStatus } from '../../../../Redux/actions';

const AddOrderStatus = ({ match }) => {
  const [cookies, setCookies] = useCookies('access');
  const dispatch = useDispatch();
  const currentOrderStatus = useSelector((state) => state.currentOrderStatus);
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [name, setName] = useState('');
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);

  useEffect(() => {
    setChangeObj({
      name,
    });
  }, [name]);

  useEffect(() => {
    setOrderStatusChangeArr(
      setChangeArr,
      null,
      name,
      setName,
      isNeedCheck,
      setIsNeedCheck
    );
  }, [name, isNeedCheck]);

  useEffect(() => {
    if (changeObj && changeObj.name) {
      dispatch(addOrderStatus(name, cookies.access));
    }
  }, [isAcceptBtnTriggered]);

  return (
    <>
      <IdHeader string={`Добавить статус заказа`} />
      {changeArr ? <ChangeItem changeArr={changeArr} /> : <Loading />}
      <ChangeFooter
        setIsAcceptBtnTriggered={setIsAcceptBtnTriggered}
        isAcceptBtnTriggered={isAcceptBtnTriggered}
        setIsNeedCheck={setIsNeedCheck}
      />
    </>
  );
};

export default AddOrderStatus;
