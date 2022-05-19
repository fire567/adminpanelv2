import React, { useEffect, useState } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setCarCategoryChangeArr } from '../../../../consts';
import { addCarCategory } from '../../../../Redux/actions';

const AddCarCategory = ({ match }) => {
  const [cookies, setCookies] = useCookies('access');
  const dispatch = useDispatch();
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);

  useEffect(() => {
    setChangeObj({
      description,
      name,
    });
  }, [description, name]);

  useEffect(() => {
    setCarCategoryChangeArr(
      setChangeArr,
      null,
      description,
      setDescription,
      name,
      setName,
      isNeedCheck,
      setIsNeedCheck
    );
  }, [description, name, isNeedCheck]);

  useEffect(() => {
    if (changeObj && changeObj.description && changeObj.name) {
      dispatch(
        addCarCategory(changeObj.description, changeObj.name, cookies.access)
      );
    }
  }, [isAcceptBtnTriggered]);

  return (
    <>
      <IdHeader string={'Добавить категорию автомобиля'} />
      {changeArr ? <ChangeItem changeArr={changeArr} /> : <Loading />}
      <ChangeFooter
        setIsAcceptBtnTriggered={setIsAcceptBtnTriggered}
        isAcceptBtnTriggered={isAcceptBtnTriggered}
        setIsNeedCheck={setIsNeedCheck}
      />
    </>
  );
};

export default AddCarCategory;
