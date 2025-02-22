import { Tabs, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import PropComponents from './PropComponents';
import PageSetting from './PageSetting';
import { useSelector } from 'react-redux';
import { ComponentsState } from '../../stores/components_reducer';
import { StoreStateType } from '../../stores';

enum TabKey {
  PROP = 'prop',
  SETTING = 'setting',
}

const RightPanel = () => {
  const [activeKey, setActiveKey] = useState(TabKey.PROP);
  const { selectedId } = useSelector<StoreStateType, ComponentsState>(
    (state: StoreStateType) => state.components.present
  );

  const handleTabChange = (key: string) => {
    setActiveKey(key as TabKey);
  };

  useEffect(() => {
    if (!selectedId) {
      setActiveKey(TabKey.SETTING);
    } else {
      setActiveKey(TabKey.PROP);
    }
  }, [selectedId]);

  const TabItems = [
    {
      key: TabKey.PROP,
      label: (
        <Space>
          <FileTextOutlined />
          属性
        </Space>
      ),
      children: <PropComponents />,
    },
    {
      key: TabKey.SETTING,
      label: (
        <Space>
          <SettingOutlined />
          页面设置
        </Space>
      ),
      children: <PageSetting />,
    },
  ];
  return <Tabs items={TabItems} activeKey={activeKey} onChange={handleTabChange} />;
};

export default RightPanel;
