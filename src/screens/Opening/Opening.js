import React, { useState, createRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { EditorState } from 'draft-js';
import { Layout, Steps, Divider, Button } from 'antd';
import styles from './Opening.module.css';
import * as jobActions from '../../store/actions/jobsActions';

import JobDetail from '../../components/JobDetail/JobDetail';
import JobDescription from '../../components/JobDescription/JobDescription';
import ApplicationForm from '../../components/ApplicationForm/ApplicationForm';

const { Content } = Layout;
const { Step } = Steps;

const Opening = (props) => {
  const submitFormRef = createRef();
  const [step, setStep] = useState(0);

  const [details, setDetails] = useState();

  const [description, setDescription] = useState(EditorState.createEmpty());
  const [requirements, setRequirements] = useState(EditorState.createEmpty());
  const [aboutCompany, setAboutCompany] = useState(EditorState.createEmpty());

  const [htmlDescription, setHTMLDescription] = useState('');
  const [htmlRequirements, setHTMLRequirements] = useState('');
  const [htmlAboutCompany, setHTMLAboutCompany] = useState();

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const checkForSubmit = () => {
    submitFormRef.current.submit();
  };

  const handleFormSubmit = (d) => {
    // Job Details data
    if (d) {
      // set to state
      setDetails(d);
      handleNextStep();
    }
  };

  const handleDescriptionSubmit = (data) => {
    if (
      requirements &&
      aboutCompany &&
      description &&
      htmlRequirements &&
      htmlAboutCompany &&
      htmlDescription
    ) {
      // make API call
      const data = {
        userId: props.userId,
        companyId: props.companyId,
        requirements: requirements.getCurrentContent().getPlainText('\u0001'),
        description: description.getCurrentContent().getPlainText('\u0001'),
        benefits: aboutCompany.getCurrentContent().getPlainText('\u0001'),
        htmlDescription,
        htmlRequirements,
        htmlBenefits: htmlAboutCompany,
        currency: 'INR',
        ...details,
      };
      props.createNewJob(data);
    }
  };

  useEffect(() => {
    if (props.isJobCreated) {
      handleNextStep();
    }
  }, [props.isJobCreated]);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create new Job</title>
      </Helmet>

      <div>
        <Layout>
          <h4 className={styles.heading}>Create Job Opening</h4>
          {/* Steps */}
          <div className={styles.steps_wrapper}>
            <Steps current={2}>
              <Step title="Job details" />
              <Step title="Description" />
              <Step title="Application Form" />
              <Step title="Promote" />
            </Steps>
            <Divider />
          </div>
          <Content
            className="site-layout-background"
            style={{
              marginBlock: '30px',
              minHeight: 100,
              height: '100%',
              width: '100%',
              borderRadius: '0px 0px 5px 5px',
              boxShadow: 'rgb(0 0 0 / 5%) 0px 0px 5px',
            }}
          >
            {step === 0 && (
              <>
                <JobDetail
                  handleNextStep={handleNextStep}
                  handlePreviousStep={handlePreviousStep}
                  handleFormSubmit={(values) => handleFormSubmit(values)}
                  formRef={submitFormRef}
                />
                <div className={styles.btn_wrapper}>
                  <Button
                    style={{ width: '10%' }}
                    type="primary"
                    onClick={checkForSubmit}
                  >
                    NEXT
                  </Button>
                </div>
              </>
            )}

            {step === 1 && (
              <div style={{ backgroundColor: 'white', padding: '15px' }}>
                <JobDescription
                  heading="Description*"
                  state={description}
                  setState={setDescription}
                  htmlContent={setHTMLDescription}
                />
                <JobDescription
                  heading="Requirements*"
                  state={requirements}
                  setState={setRequirements}
                  htmlContent={setHTMLRequirements}
                />
                <JobDescription
                  heading="Benefits ans about 
                Company*"
                  state={aboutCompany}
                  setState={setAboutCompany}
                  htmlContent={setHTMLAboutCompany}
                />
                <div className={styles.btn_wrapper}>
                  <Button
                    style={{ width: '10%', marginRight: '15px' }}
                    type="primary"
                    onClick={handlePreviousStep}
                  >
                    PREVIOUS
                  </Button>
                  <Button
                    style={{ width: '10%' }}
                    type="primary"
                    onClick={handleDescriptionSubmit}
                  >
                    CREATE JOB
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <>
                <ApplicationForm />
                <div className={styles.btn_wrapper}>
                  <Button
                    style={{ width: '10%', marginRight: '15px' }}
                    type="primary"
                    onClick={handlePreviousStep}
                  >
                    PREVIOUS
                  </Button>
                  <Button
                    style={{ width: '10%' }}
                    type="primary"
                    onClick={handleNextStep}
                  >
                    CREATE JOB
                  </Button>
                </div>
              </>
            )}
          </Content>
        </Layout>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.User.id,
    companyId: state.User.companyId,
    isLoading: state.Job.isLoading,
    jobData: state.Job.jobData,
    isJobCreated: state.Job.isJobCreated,
    formId: state.Job.formId,
    formKeys: state.Job.formKeys,
  };
};
const mapDispatchToProps = {
  createNewJob: jobActions.addJobRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Opening);
