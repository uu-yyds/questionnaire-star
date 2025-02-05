import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ManagePageWrapper } from '../styles/Layout';
import { Button, Space, Divider } from 'antd';
import {
  PlusOutlined,
  StarOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  MANAGE_PATHNAME,
  MANAGE_LIST_PATHNAME,
  MANAGE_STAR_PATHNAME,
  MANAGE_TRASH_PATHNAME,
} from '../constants';

const ManageLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ManagePageWrapper>
      <div className="left">
        <Space direction="vertical" size={16}>
          <Button type="primary" size="large">
            <PlusOutlined />
            创建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            size="large"
            onClick={() => navigate(MANAGE_LIST_PATHNAME)}
            type={
              pathname.startsWith(MANAGE_LIST_PATHNAME) || pathname === MANAGE_PATHNAME
                ? 'default'
                : 'text'
            }
          >
            <UnorderedListOutlined />
            问卷列表
          </Button>
          <Button
            size="large"
            onClick={() => navigate(MANAGE_STAR_PATHNAME)}
            type={pathname.startsWith(MANAGE_STAR_PATHNAME) ? 'default' : 'text'}
          >
            <StarOutlined />
            星标问卷
          </Button>
          <Button
            size="large"
            onClick={() => navigate(MANAGE_TRASH_PATHNAME)}
            type={pathname.startsWith(MANAGE_TRASH_PATHNAME) ? 'default' : 'text'}
          >
            <DeleteOutlined />
            回收站
          </Button>
        </Space>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </ManagePageWrapper>
  );
};

export default ManageLayout;
