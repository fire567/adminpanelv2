import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AddItemsHeader.module.css';

const AddItemsHeader = ({ linkName }) => {
  const history = useHistory();

  const changeLinkHandler = () => {
    history.push(`/main-page/${linkName}/add`);
  };

  return (
    <div className={classes.header_form}>
      <button className={classes.button} onClick={changeLinkHandler}>
        Добавить
      </button>
    </div>
  );
};

export default AddItemsHeader;
