import React, { useEffect, useState, createRef } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Drawer, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './Job.module.css';
import * as jobActions from '../../store/actions/jobsActions';

import JobCard from '../../components/JobCard/JobCard';
import JobOpening from '../../components/JobOpening/JobOpening';

const Job = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const JobOpeningFormRef = createRef();

  useEffect(() => {
    // call API
    if (props.location?.state?.openDrawer) {
      setOpenDrawer(true);
    }
    props.getAllJobs({ company: props?.companyId });
  }, []);

  useEffect(() => {
    props.getAllJobs({ company: props?.companyId });
  }, [props.isJobCreated]);

  const handleFormSubmit = () => {
    JobOpeningFormRef.current.submit();
  };

  const openNewJobDrawer = () => {
    setOpenDrawer(true);
  };
  const closeJobDrawer = () => {
    setOpenDrawer(false);
  };

  const submitJob = (values) => {
    const obj = {
      userId: props.userId,
      companyId: props.companyId,
      currency: 'INR',
      ...values,
    };
    props.createNewJob(obj);
    closeJobDrawer();
  };

  const handleFormError = () => {
    message.error({
      content: 'Please check for errors!',
      duration: 1,
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Opened Jobs</title>
      </Helmet>
      {openDrawer && (
        <Drawer
          title="Create a Job opening"
          width={720}
          onClose={closeJobDrawer}
          visible={openDrawer}
          bodyStyle={{ paddingBottom: 80 }}
          maskClosable={false}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={closeJobDrawer} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={handleFormSubmit} type="primary">
                Create
              </Button>
            </div>
          }
        >
          <JobOpening
            isOpen={openDrawer}
            handleClose={closeJobDrawer}
            formRef={JobOpeningFormRef}
            handleSubmitForm={submitJob}
            handleErrors={handleFormError}
          />
        </Drawer>
      )}
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
              onClick={openNewJobDrawer}
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
    userId: state.User.id,
    companyId: state.User.companyId,
    isLoading: state.Job.isLoading,
    activeJobs: state.Job.activeJobs,
    inactiveJobs: state.Job.inactiveJobs,
    error: state.Job.error,
    isJobCreated: state.Job.isJobCreated,
    formId: state.Job.formId,
    formKeys: state.Job.formKeys,
  };
};
const mapDispatchToProps = {
  getAllJobs: jobActions.fetchedJobRequest,
  createNewJob: jobActions.addJobRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Job);
