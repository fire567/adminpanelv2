import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './CurrentItemsList.module.css';
import {
  getCurrentCar,
  getCurrentRate,
  getCurrentOrder,
  getCurrentCity,
  getCurrentPoint,
  getCurrentRateType,
  getCurrentCarCategory,
  getCurrentOrderStatus,
} from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import DeleteItem from '../DeleteItem/DeleteItem';

const CurrentItemsList = ({ sections, tableItems, linkName, pageCount }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isPopUpActive, setIsPopUpActive] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getCurrentCar(null));
    dispatch(getCurrentRate(null));
    dispatch(getCurrentOrder(null));
    dispatch(getCurrentCity(null));
    dispatch(getCurrentPoint(null));
    dispatch(getCurrentRateType(null));
    dispatch(getCurrentCarCategory(null));
    dispatch(getCurrentOrderStatus(null));
  }, []);

  const showMobileButtons = (index, item) => {
    if (index === 0) {
      return (
        <td className={classes.mobile_rows} key={index}>
          <div className={classes.buttons_form}>
            <div>
              <div className={classes.button_row}>
                <button
                  className={classNames(classes.button, classes.change)}
                  onClick={() => onChangePageHandler(item[item.length - 1])}
                >
                  Изменить
                </button>
              </div>
            </div>
            <div>
              <div className={classes.button_row}>
                <button
                  className={classNames(classes.button, classes.delete)}
                  onClick={() => onDeleteHandler(item[item.length - 1])}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </td>
      );
    } else {
      return <td className={classes.mobile_empty_rows} key={index} />;
    }
  };

  const onChangePageHandler = (id) => {
    history.push(`/main-page/${linkName}/change/${id}`);
  };

  const onDeleteHandler = (id) => {
    setDeleteId(id);
    setIsPopUpActive(true);
  };

  return (
    <>
      <div className={classes.table_wrapper}>
        <table className={classes.table_form}>
          <thead className={classes.sections_form}>
            <tr className={classes.current_section}>
              {sections.map((section) => (
                <th key={section.id} className={classes.section}>
                  {section.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableItems.map((item, index) => (
              <React.Fragment key={index}>
                <tr className={classes.table_rows}>
                  {item.map(
                    (row, index) =>
                      index !== item.length - 1 && (
                        <td key={index} className={classes.row}>
                          {row ? row : 'empty'}
                        </td>
                      )
                  )}
                  <td className={classes.row}>
                    <div className={classes.button_row}>
                      <button
                        className={classNames(classes.button, classes.change)}
                        onClick={() =>
                          onChangePageHandler(item[item.length - 1])
                        }
                      >
                        Изменить
                      </button>
                    </div>
                  </td>

                  <td className={classes.row}>
                    <div className={classes.button_row}>
                      <button
                        className={classNames(classes.button, classes.delete)}
                        onClick={() => onDeleteHandler(item[item.length - 1])}
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className={classes.mobile_row}>
                  {item.map((row, index) => showMobileButtons(index, item))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteItem
        isPopUpActive={isPopUpActive}
        setIsPopUpActive={setIsPopUpActive}
        linkName={linkName}
        deleteId={deleteId}
        pageCount={pageCount}
      />
    </>
  );
};

export default CurrentItemsList;
