import React from 'react';
import { Form, Input, Select } from 'antd';
import styles from './JobDetail.module.css';

const { Option } = Select;

const JobDetail = (props) => {


  const onFinish = (values) => {
    props.handleFormSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        ref={props.formRef}
      >
        <div className={styles.fields_wrapper}>
          <Form.Item
            label="Job Opening Name"
            name="role"
            rules={[
              {
                required: true,
                message: 'Please input your Designation/Role!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Job Location"
            name="location"
            rules={[
              { required: true, message: 'Please input your Job Location!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Job Type"
            name="type"
            rules={[{ required: true, message: 'Please input your Job Type!' }]}
          >
            <Select defaultValue="Option1">
              <Option value="Option1">Permanent</Option>
              <Option value="Option2">Contract</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Required Experience(Years)"
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name="minExperience"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              rules={[
                {
                  required: true,
                  message: 'Please input Max Experience!',
                },
              ]}
            >
              <Input placeholder="Minimum" type="number" />
            </Form.Item>
            <Form.Item
              name="maxExperience"
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
              rules={[
                {
                  required: true,
                  message: 'Please input Min Experience!',
                },
              ]}
            >
              <Input placeholder="Maximum" type="number" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Compensation(Yearly)" style={{ marginBottom: 0 }}>
            <Form.Item
              name="minCompensation"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              rules={[
                {
                  required: true,
                  message: 'Please input Minimum Compensation!',
                },
              ]}
            >
              <Input prefix="₹" placeholder="0" type="number" />
            </Form.Item>
            <Form.Item
              name="maxCompensation"
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
              rules={[
                {
                  required: true,
                  message: 'Please input Maximum Compensation!',
                },
              ]}
            >
              <Input prefix="₹" placeholder="0" type="number" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Equity Range(%)"
            style={{ marginBottom: 0 }}
            rules={[
              { required: true, message: 'Please input your Equity Range!' },
            ]}
          >
            <Form.Item
              name="minEquity"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Input suffix="%" placeholder="0" type="number" />
            </Form.Item>
            <Form.Item
              name="maxEquity"
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
            >
              <Input suffix="%" placeholder="0" type="number" />
            </Form.Item>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default JobDetail;
