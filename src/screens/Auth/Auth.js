import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import * as authActions from '../../store/actions/authActions';

const Auth = (props) => {
  const [isOTPSend, setOTPSend] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (props.isVerified) {
      history.push({ pathname: '/on-board', state: { email: props.email } });
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
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
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
              <Input />
            </Form.Item>
          )}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
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
  };
};
const mapDispatchToProps = {
  sendOTPRequest: authActions.sendOTPRequest,
  resendOTPRequest: authActions.resendOTPRequest,
  verifyOTPRequest: authActions.verifyOTPRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
