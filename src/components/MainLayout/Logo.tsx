import React from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { LogoWrapper } from '../../styles/Layout';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <LogoWrapper>
      <Link to="/">
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
