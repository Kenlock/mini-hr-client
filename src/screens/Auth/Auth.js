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
        debugger;
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
    if (props.isOTPSend) {
      props.verifyOTPRequest(values);
    } else {
      props.sendOTPRequest(values);
    }
  };

  const onFinishFailed = (errorInfo) => {};
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Welcome | MINI-HR</title>
      </Helmet>
      <div className={styles.heading}>
        <h1>Welcome, MINI-HR</h1>
        <hr />
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
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input
                  autoFocus
                  defaultValue={props.email}
                  disabled={props.isOTPSend ? true : false}
                />
              </Form.Item>
              {props.isOTPSend && (
                <Form.Item
                  label="OTP"
                  name="OTP"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter OTP!',
                    },
                  ]}
                >
                  <Input autoFocus />
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={props.isLoading}
                  >
                    Verify OTP
                  </Button>
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
          <img
            style={{ width: '100%', height: '100%' }}
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fGhyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
            alt="Login_Banner_Image"
          />
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
