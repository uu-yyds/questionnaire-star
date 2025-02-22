import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import { UserInfoWrapper } from '../../styles/Layout/UserInfo.styles';
import { LOGIN_PATHNAME } from '../../constants';
import { getUserInfo } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { localCacheService } from '../../utils';
import { TOKEN_KEY } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { UserState } from '../../stores/user_reducers';
import { setIsLogin, setUserInfo } from '../../stores/user_reducers';

const UserInfo = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const isLogin = useSelector((state: { user: UserState }) => state.user.isLogin);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: { user: UserState }) => state.user.userInfo);

  useEffect(() => {
    getUserInfo()
      .then(res => {
        const { username, nickname } = res;
        dispatch(setIsLogin(true));
        dispatch(setUserInfo({ username, nickname }));
      })
      .catch(error => {
        message.error(error?.data?.message);
      });
  }, [isLogin]);

  return (
    <UserInfoWrapper>
      <Space>
        {isLogin ? (
          <Space>
            <Avatar icon={<UserOutlined />} />
            <Title level={5} style={{ margin: 0, color: '#fff' }}>
              {userInfo.nickname}
            </Title>
            <Link
              to={LOGIN_PATHNAME}
              onClick={() => {
                dispatch(setIsLogin(false));
                dispatch(setUserInfo({ username: '', nickname: '' }));
                localCacheService.remove(TOKEN_KEY);
                navigate(LOGIN_PATHNAME);
              }}
            >
              退出
            </Link>
          </Space>
        ) : (
          <Space>
            <Avatar icon={<UserOutlined />} />
            <Link to={LOGIN_PATHNAME}>登录</Link>
          </Space>
        )}
      </Space>
    </UserInfoWrapper>
  );
};
export default UserInfo;
