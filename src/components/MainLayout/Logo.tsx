import React, { useState, useEffect } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { LogoWrapper } from '../../styles/Layout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../../stores/user_reducers';
import { HOME_PATHNAME, MANAGE_PATHNAME } from '../../constants';

const Logo = () => {
  const isLogin = useSelector((state: { user: UserState }) => state.user.isLogin);
  const [pathname, setPathname] = useState(HOME_PATHNAME);

  useEffect(() => {
    if (isLogin) {
      setPathname(MANAGE_PATHNAME);
    } else {
      setPathname(HOME_PATHNAME);
    }
  }, [isLogin]);

  return (
    <LogoWrapper>
      <Link to={pathname}>
        <Space>
          <Typography.Title level={4}>
            <FormOutlined />
          </Typography.Title>
          <Typography.Title level={5}>小鱼问卷</Typography.Title>
        </Space>
      </Link>
    </LogoWrapper>
  );
};

export default Logo;
