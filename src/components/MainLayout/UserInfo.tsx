import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { UserInfoWrapper } from '../../styles/Layout/UserInfo.styles';
import { LOGIN_PATHNAME } from '../../constants';

const UserInfo = () => {
  return (
    <UserInfoWrapper>
      <Space>
        <Link to={LOGIN_PATHNAME}>登录</Link>
        <Avatar icon={<UserOutlined />} />
        {/* <Typography.Text>小鱼</Typography.Text> */}
      </Space>
    </UserInfoWrapper>
  );
};
export default UserInfo;
