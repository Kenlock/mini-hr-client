import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  ScheduleOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import styles from './Dashboard.module.css';
import * as dashboardActions from '../../store/actions/dashboardActions';
import DataCard from '../../components/DataCard/DataCard';
import InfoCard from '../../components/InfoCard/InfoCard';
import Chart from '../../components/Chart/Chart';

const Dashboard = (props) => {
  useEffect(() => {
    // make API call
    props.getDashboardDetails();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | MINI-HR</title>
      </Helmet>
      <div>
        <div className={styles.heading}>DASHBOARD</div>
        <div className={styles.row_wrapper}>
          <DataCard
            count={props?.data?.activeJobs.count}
            heading={props?.data?.activeJobs.title}
            loading
            route="/openings"
          />
          <DataCard
            count={0}
            heading="New Candidates"
            route="/candidates/new"
          />
          <DataCard
            count={0}
            heading="Today's Interview"
            route={`/interview?date=${new Date()}`}
          />
          <DataCard
            count={1}
            heading="New Activities"
            route="/activities/today"
          />
        </div>
        <div className={styles.activities}>No activities</div>
        <div className={styles.chart_wrapper}>
          <Chart />
        </div>
        <div className={styles.actions}>
          {props?.data?.cards.map((card, index) => {
            const icons = [
              <ScheduleOutlined style={{ fontSize: '50px' }} />,
              <UserAddOutlined style={{ fontSize: '50px' }} />,
              <UsergroupAddOutlined style={{ fontSize: '50px' }} />,
            ];
            return (
              <InfoCard
                key={index}
                icon={icons[index]}
                heading={card.heading}
                cardInfo={card.features}
                btn={<Button type="secondary">{card.buttonText}</Button>}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.Dashboard.isLoading,
    data: state.Dashboard.data,
    successMessage: state.Dashboard.successMessage,
    error: state.Dashboard.error,
  };
};
const mapDispatchToProps = {
  getDashboardDetails: dashboardActions.dashboardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
