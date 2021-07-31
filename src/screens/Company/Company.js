import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import styles from './Company.module.css';

import * as JobActions from '../../store/actions/jobsActions';
import JobList from '../../components/JobList/JobList';

const Company = (props) => {
  useEffect(() => {
    // make API Request
    props.fetchAllJobs({ company: props.match.params.id });
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title> {`${props?.company?.companyName} Careers Page`}</title>
      </Helmet>
      <div style={{ backgroundColor: '#F7F8FC' }}>
        <div className={styles.company_header}>
          <div className={styles.company_name}>
            {props?.company?.companyName}
          </div>
          <Button
            className={styles.company_website}
            icon={<RocketOutlined />}
            onClick={() => window.open(`${props?.company?.website}`, '_blank')}
          >
            Company Website
          </Button>
        </div>
        <section className={styles.image_section}>
          <div className={styles.image}></div>
          <div className={styles.opening_btn}>
            <span className={styles.join_our_team}>Join Our Team</span>
            <a href="#all-openings">
              <button className={styles.btn}>VIEW OPENINGS</button>
            </a>
          </div>
        </section>
        <section id="all-openings" className={styles.all_openings}>
          <span className={styles.heading}>All Openings</span>
          {props.jobFetched && (
            <div className={styles.job_lists}>
              {props.activeJobs &&
                props.activeJobs.map((job, index) => (
                  <JobList
                    key={index}
                    companyName={props.company.companyName}
                    role={job.role}
                    minExperience={job.minExperience}
                    maxExperience={job.maxExperience}
                    location={job.location}
                    jobId={job.id}
                  />
                ))}
            </div>
          )}
        </section>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.Job.isLoading,
    successMessage: state.Job.successMessage,
    activeJobs: state.Job.activeJobs,
    jobFetched: state.Job.jobFetched,
    company: state.Job.company,
  };
};

const mapDispatchToProps = {
  fetchAllJobs: JobActions.fetchedJobRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
