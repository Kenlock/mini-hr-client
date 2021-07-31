import React, { useRef, useEffect } from 'react';
import { PageHeader, Form, Input, Button } from 'antd';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import * as onBoardActions from '../../store/actions/onBoardActions';

const OnBoard = (props) => {
  const history = useHistory();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus({
      cursor: 'start',
    });
  }, []);

  useEffect(() => {
    if (props.accountCreated) {
      history.push({
        pathname: '/dashboard'
      })
    }
  }, [props.accountCreated])

  const onFinish = (values) => {
    const updateData = {
      ...values,
      email: props.location.state.email,
      role: 'admin',
    };
    props.onBoardRequest(updateData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.push('/')}
        title="Tell us little about yourself"
        subTitle="MINI-HR platform"
      />
      <div
        style={{ width: '70vw', padding: '18px', textAlign: 'center', top: 0 }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Email" name="email">
            <Input defaultValue={props.location.state.email} disabled />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              { required: true, message: 'Please input your Full Name!' },
            ]}
          >
            <Input ref={inputRef} />
          </Form.Item>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              { required: true, message: 'Please input your Designation!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[
              { required: true, message: 'Please input your Company Name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: 'Please input your Website!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please input your location!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit ✨
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.User.isLoading,
    accountCreated: state.User.isCreated
  };
};
const mapDispatchToProps = {
  onBoardRequest: onBoardActions.onBoardRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(OnBoard);
