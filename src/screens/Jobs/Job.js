import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { useHistory } from 'react-router';
import { PlusOutlined } from '@ant-design/icons';
import styles from './Job.module.css';
import * as jobActions from '../../store/actions/jobsActions';

import JobCard from '../../components/JobCard/JobCard';

const Job = (props) => {
  useEffect(() => {
    // call API
    props.getAllJobs({ company: props?.companyId });
  }, []);

  const history = useHistory();
  const handleRoutingForOpening = () => {
    history.push({
      pathname: '/opening/create',
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Opened Jobs</title>
      </Helmet>
      <div>
        <div className={styles.heading_container}>
          <div>
            <h3 className={styles.heading}>OPENINGS</h3>
          </div>
          <div className={styles.btn_wrapper}>
            <Button
              type="primary"
              style={{ marginRight: '15px' }}
              icon={<PlusOutlined />}
            >
              ADD CANDIDATE
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleRoutingForOpening}
            >
              ADD OPENING
            </Button>
          </div>
        </div>
        {/* CARD Container */}
        <div className={styles.card_container}>
          {props.activeJobs &&
            props.activeJobs.map((job) => (
              <JobCard
                key={job.id}
                company={job.company.companyName}
                designation={job.role}
                experience={`${job.minExperience} - ${job.maxExperience} Years`}
                location={job.location}
                states={[{ count: 5, name: 'Screening' }]} // TODO:
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    companyId: state.User.companyId,
    isLoading: state.Job.isLoading,
    activeJobs: state.Job.activeJobs,
    inactiveJobs: state.Job.inactiveJobs,
    error: state.Job.error,
  };
};
const mapDispatchToProps = {
  getAllJobs: jobActions.fetchedJobRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Job);
