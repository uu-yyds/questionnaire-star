import React, { useState } from 'react';
import { Typography, Space, Form, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { RegisterWrapper } from '../../styles/Register';
import { formConfig } from './config';
import { formRender } from '../../components/Common/FormRender';
import { register } from '../../services/user';
import { RegisterInfo } from '../../types/RegisterPage';
import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
const RegisterPage = () => {
  useTitle('注册');
  const { Title } = Typography;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterInfo) => {
    const { username, password, nickname } = values;
    try {
      await register({ username, password, nickname });
      message.success('注册成功');
      navigate('/login');
    } catch (error: any) {
      message.error(error.data.message);
    }
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
