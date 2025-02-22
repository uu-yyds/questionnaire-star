import React, { useEffect, useState } from 'react';
import { Space, Typography, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginPageWrapper } from '../../styles/LoginPage';
import { UserOutlined } from '@ant-design/icons';
import { REGISTER_PATHNAME, HOME_PATHNAME } from '../../constants';
import { localCacheService } from '../../utils';
import { USER_NAME_KEY, PASSWORD_KEY, REMEMBER_ME_KEY, CONFIRM_PASSWORD_KEY } from './config';
import { formRender } from '../../components/Common/FormRender';
import { formConfig } from './config';
import { login } from '../../services/user';
import { TOKEN_KEY } from '../../constants';
import { LoginResponse } from '../../types/LoginPage';
import { useDispatch } from 'react-redux';
import { setIsLogin, setUserInfo } from '../../stores/user_reducers';
import { useTitle } from '../../hooks/useTitle';

const LoginPage = () => {
  useTitle('登录');
  const navigate = useNavigate();
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [isRememberMe, setIsRememberMe] = useState(true);
  const dispatch = useDispatch();

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
    const { username, password, remember } = values;
    // 判断是否记住我
    if (remember) {
      localCacheService.set(USER_NAME_KEY, username);
      localCacheService.set(PASSWORD_KEY, password);
    } else {
      localCacheService.remove(USER_NAME_KEY);
      localCacheService.remove(PASSWORD_KEY);
    }
    login({ username, password })
      .then((res: LoginResponse) => {
        const { username, nickname, access_token } = res;
        localCacheService.set(TOKEN_KEY, access_token);
        dispatch(setIsLogin(true));
        dispatch(setUserInfo({ username, nickname }));
        navigate(HOME_PATHNAME);
      })
      .catch((error: any) => {
        message.error(error?.data?.message);
      });
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
