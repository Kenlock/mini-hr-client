import React from 'react';
import styles from './ApplicationForm.module.css';
const ApplicationForm = () => {
  return (
    <div className={styles.form_wrapper}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <span>Full Name</span>
          <div>
            <div>OFF</div>
            <div>OPTIONAL</div>
            <div>MANDATORY</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ApplicationForm;
