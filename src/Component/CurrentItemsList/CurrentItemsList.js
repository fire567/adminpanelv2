import classNames from 'classnames';
import React from 'react';
import classes from './CurrentItemsList.module.css';

const CurrentItemsList = ({ sections, tableItems }) => {
  const showMobileButtons = (index) => {
    if (index === 0) {
      return (
        <td className={classes.mobile_rows} key={index}>
          <div className={classes.buttons_form}>
            <div>
              <div className={classes.button_row}>
                <button className={classNames(classes.button, classes.change)}>
                  Изменить
                </button>
              </div>
            </div>
            <div>
              <div className={classes.button_row}>
                <button className={classNames(classes.button, classes.delete)}>
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

  return (
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
                {item.map((row, index) => (
                  <td key={index} className={classes.row}>
                    {row ? row : 'empty'}
                  </td>
                ))}
                <td className={classes.row}>
                  <div className={classes.button_row}>
                    <button
                      className={classNames(classes.button, classes.change)}
                    >
                      Изменить
                    </button>
                  </div>
                </td>

                <td className={classes.row}>
                  <div className={classes.button_row}>
                    <button
                      className={classNames(classes.button, classes.delete)}
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
              <tr className={classes.mobile_row}>
                {item.map((row, index) => showMobileButtons(index))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentItemsList;
