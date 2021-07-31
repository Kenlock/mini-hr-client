import React from 'react';
import {
  MedicineBoxOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  SmallDashOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import styles from './JobCard.module.css';
const JobCard = ({ designation, experience, location, company, states }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.job_info}>
        <h3>{designation}</h3>
        <div className={styles.job_meta_info}>
          <div className={styles.job_meta_location}>
            <div style={{ marginRight: '10px' }}>
              <MedicineBoxOutlined />
              <span style={{ marginLeft: '5px' }}>{experience}</span>
            </div>
            <div style={{ marginRight: '10px' }}>
              <EnvironmentOutlined />
              <span style={{ marginLeft: '5px' }}> {location}</span>
            </div>
            <div style={{ marginRight: '10px' }}>
              <GlobalOutlined />
              <span style={{ marginLeft: '5px' }}>{company}</span>
            </div>
          </div>
          <div className={styles.job_add_candidate}>
            <div>
              <UsergroupAddOutlined style={{ fontSize: '18px' }} />
            </div>
          </div>
          <button
            style={{ border: 'none', backgroundColor: 'rgba(0, 0, 0, 0)' }}
          >
            <SmallDashOutlined style={{ fontSize: '18px' }} />
          </button>
        </div>
      </div>
      <div className={styles.job_board_info}>
        {states &&
          states.map((state) => (
            <div className={styles.job_state}>
              <span className={styles.number}>{state.count}</span> {state.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobCard;
