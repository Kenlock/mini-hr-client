import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import styles from './Auth.module.css';

import * as authActions from '../../store/actions/authActions';
import * as onBoardActions from '../../store/actions/onBoardActions';

const Auth = (props) => {
  const [isOTPSend, setOTPSend] = useState(false);
  const [email, setEmail] = useState(null);
  const history = useHistory();
  useEffect(() => {
    if (props.isVerified) {
      if (props?.isNew) {
        // ? NEW-REGISTRATION
        history.push({ pathname: '/on-board', state: { email: props.email } });
      } else {
        //? If user already exits (LOGIN-case)
        localStorage.setItem('authToken', props?.authToken);
        history.push({ pathname: '/dashboard', state: { email: props.email } });
        props.onBoardSuccess({ data: props.user });
      }
    }
  }, [props.isVerified]);

  useEffect(() => {
    if (props.isLoading) {
      setOTPSend(!isOTPSend);
    }
    if (isOTPSend) {
      setOTPSend(!isOTPSend);
    }
  }, [props.isLoading]);

  const onFinish = (values) => {
    setEmail(values);
    handleOTPRequest();
  };

  const handleOTPRequest = () => {
    if (email) {
      if (props.isOTPSend) {
        props.verifyOTPRequest(email);
      } else {
        props.sendOTPRequest(email);
      }
    }
  };

  const handleResendOTP = () => {
    props.sendOTPRequest(email);
  };

  const onFinishFailed = (errorInfo) => {};
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Welcome | MINI-HR</title>
      </Helmet>
      <div className={styles.heading}>
        <h1>Welcome 👋</h1>
      </div>
      <Row>
        <Col span={12}>
          <div className={styles.form_wrapper}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: props.isOTPSend ? false : true,
                    message: 'Please enter valid email!',
                  },
                ]}
              >
                <Input
                  autoFocus
                  defaultValue={props.email}
                  disabled={props.isOTPSend ? true : false}
                  placeholder="doe@some_email.com"
                />
              </Form.Item>
              {props.isOTPSend && (
                <Form.Item
                  label="OTP"
                  name="OTP"w
                  rules={[
                    {
                      required: true,
                      message: 'Please enter OTP!',
                    },
                  ]}
                >
                  <Input autoFocus type="number" placeholder="OTP here" />
                </Form.Item>
              )}

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
                className={styles.form_btn}
              >
                {props.isOTPSend ? (
                  <>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={props.isLoading}
                    >
                      Verify OTP
                    </Button>
                    <Button
                      type="link"
                      loading={props.isLoading}
                      onClick={handleResendOTP}
                    >
                      Resend OTP
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={props.isLoading}
                  >
                    Send OTP
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.image_wrapper}>
            <img
              style={{ width: '100%', height: '100%' }}
              src={process.env.PUBLIC_URL + '/homepage.svg'}
              alt="Login_Banner_Image"
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.Auth.isLoading,
    isOTPSend: state.Auth.OTPSend,
    successMessage: state.Auth.successMessage,
    error: state.Auth.error,
    isVerified: state.Auth.isVerified,
    email: state.Auth.mail || state.Auth.email,
    isNew: state.Auth.isNew,
    user: state.Auth.user,
    authToken: state.Auth.authToken,
  };
};
const mapDispatchToProps = {
  sendOTPRequest: authActions.sendOTPRequest,
  resendOTPRequest: authActions.resendOTPRequest,
  verifyOTPRequest: authActions.verifyOTPRequest,
  onBoardSuccess: onBoardActions.onBoardSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
