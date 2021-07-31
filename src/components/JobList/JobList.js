/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import styles from './JobList.module.css';

const JobList = ({
  role,
  companyName,
  minExperience,
  maxExperience,
  location,
  jobId,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.job_name}>
        <a
          href={`http://localhost:3001/apply/${jobId}`}
          target="_blank"
          title={role}
          rel="noreferrer"
        >
          {role}
        </a>
      </div>
      <div className={styles.job_detail}>
        <span className={styles.job_detail_info}>{companyName}</span>
        <span
          className={styles.job_detail_info}
        >{`${minExperience}-${maxExperience} Years`}</span>
        <span className={styles.job_detail_info}>{location}</span>
      </div>
    </div>
  );
};

export default JobList;
