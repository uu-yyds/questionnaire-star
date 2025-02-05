import React, { useState } from 'react';
import { Typography, Space, Form, Input, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { RegisterWrapper } from '../../styles/Register';
import { formConfig } from './config';
import { formRender } from '../../components/Common/FormRender';

const RegisterPage = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    const { username, password, remember } = values;
  };

  return (
    <RegisterWrapper>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>注册</Title>
      </Space>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: '600px' }}
        autoComplete="off"
        onFinish={onFinish}
      >
        {formRender(formConfig())}
      </Form>
    </RegisterWrapper>
  );
};

export default RegisterPage;
