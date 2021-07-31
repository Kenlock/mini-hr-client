import React from 'react';
import { useHistory } from 'react-router';
import styles from './DataCard.module.css';

const DataCard = ({ count, heading, route, companyId }) => {
  const history = useHistory();
  const handleRouting = () => {
    history.push({
      pathname: route,
      state: { company: companyId },
    });
  };
  return (
    <div className={styles.wrapper} onClick={handleRouting}>
      <span className={styles.count}>{count}</span>
      <span className={styles.heading}>{heading}</span>
    </div>
  );
};

export default DataCard;
