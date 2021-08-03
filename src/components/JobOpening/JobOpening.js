import React from 'react';
import { Form, Col, Row, Input, Select } from 'antd';
import styles from './JobOpening.module.css';
const { Option } = Select;
const JobOpening = (props) => {
  const onFinish = (values) => {
    props.handleSubmitForm(values)
  };

  const onFinishFailed = (err) => {
    props.handleErrors(err)
  };
  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        ref={props.formRef}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Job Role"
              rules={[{ required: true, message: 'Please enter role' }]}
            >
              <Input placeholder="Please enter role" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Job Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: 'Please input your Job Location!',
                },
              ]}
              initialValue="India"
            >
              <Select
                defaultValue="India"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="India">India</Option>
                <Option value="U.S">U.S</Option>
                <Option value="U.K">U.K</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Job Type"
              name="type"
              rules={[
                { required: true, message: 'Please input your Job Type!' },
              ]}
              initialValue="Permanent"
            >
              <Select
                defaultValue="Permanent"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Permanent">Permanent</Option>
                <Option value="Contract">Contract</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
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
                <Input
                  placeholder="Minimum"
                  type="number"
                  suffix="Years"
                  min="1"
                  step="1"
                />
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
                <Input
                  placeholder="Maximum"
                  type="number"
                  suffix="Years"
                  min="1"
                  step="1"
                />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              label="Equity Range(%)"
              style={{ marginBottom: 0 }}
              rules={[
                {
                  required: true,
                  message: 'Please input your Equity Range!',
                },
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
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="requirements"
              label="Requirements"
              rules={[
                {
                  required: true,
                  message: 'please enter requirements',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter requirements"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="benefits"
              label="Benefits/Company"
              rules={[
                {
                  required: true,
                  message: 'please enter benefits/company',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter benefits/company"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default JobOpening;
