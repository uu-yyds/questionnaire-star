import React, { useEffect, useState } from 'react';
import { Button, Space, Typography, Form, Input, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginPageWrapper } from '../../styles/LoginPage';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { REGISTER_PATHNAME, HOME_PATHNAME } from '../../constants';
import { localCacheService } from '../../utils';
import { USER_NAME_KEY, PASSWORD_KEY, REMEMBER_ME_KEY, CONFIRM_PASSWORD_KEY } from './config';
import { formRender } from '../../components/Common/FormRender';
import { formConfig } from './config';

const LoginPage = () => {
  const navigate = useNavigate();
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [isRememberMe, setIsRememberMe] = useState(true);
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  useEffect(() => {
    const { username, password } = getUserInfo();
    if (username && password) {
      form.setFieldsValue({ username, password });
    }
  }, []);

  const getUserInfo = () => {
    const username = localCacheService.get(USER_NAME_KEY);
    const password = localCacheService.get(PASSWORD_KEY);
    return { username, password };
  };

  const onFinish = (values: any) => {
    console.log(values);
    const { username, password, remember } = values;
    // 判断是否记住我
    if (remember) {
      localCacheService.set(USER_NAME_KEY, username);
      localCacheService.set(PASSWORD_KEY, password);
    } else {
      localCacheService.remove(USER_NAME_KEY);
      localCacheService.remove(PASSWORD_KEY);
    }
    navigate(HOME_PATHNAME);
  };

  const onChangeRememberMe = (e: any) => {
    setIsRememberMe(e.target.checked);
    form.setFieldsValue({ [REMEMBER_ME_KEY]: e.target.checked });
  };

  return (
    <LoginPageWrapper>
      <Space>
        <Title level={2}>
          <UserOutlined />
        </Title>
        <Title level={2}>登录</Title>
      </Space>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: '600px' }}
        initialValues={{ [REMEMBER_ME_KEY]: true }}
        autoComplete="off"
      >
        {formRender(formConfig(isRememberMe, onChangeRememberMe))}
      </Form>
    </LoginPageWrapper>
  );
};

export default LoginPage;
