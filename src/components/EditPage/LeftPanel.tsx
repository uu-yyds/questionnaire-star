import { Tabs, Space } from 'antd';
import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import ComponentLib from './ComponentLib';
import Layer from './Layer';

const LeftPanel = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: (
        <Space>
          <AppstoreOutlined />
          组件库
        </Space>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layer',
      label: (
        <Space>
          <BarsOutlined />
          图层
        </Space>
      ),
      children: <Layer />,
    },
  ];
  return <Tabs items={tabItems} defaultActiveKey="componentLib" />;
};

export default LeftPanel;
