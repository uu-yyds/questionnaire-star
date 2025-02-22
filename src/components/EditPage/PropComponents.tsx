import React, { useEffect } from 'react';
import { formRender } from '../Common/FormRender';
import { Form, Empty } from 'antd';
import { componentTypeMapConfig } from '../QuestionComponents/config';
import { useSelector, useDispatch } from 'react-redux';
import { ComponentsState } from '../../stores/components_reducer';
import { updateComponent } from '../../stores/components_reducer';
import { ComponentPropsType } from '../../types/QuestionComponents';
import { RightPanelWrapper } from '../../styles/EditPage/RightPanel.styles';
import QuestionRadioPropComponent from './QuestionRadioPropComponent';
import QuestionCheckboxPropComponent from './QuestionCheckboxPropComponent';
import { StoreStateType } from '../../stores';
import type { Component } from '@/types/QuestionPage';

const PropComponents = () => {
  const dispatch = useDispatch();
  const { selectedId, componentList } = useSelector<StoreStateType, ComponentsState>(
    (state: StoreStateType) => state.components.present
  );
  const component = componentList.find(item => item.fe_id === selectedId) as Component;

  const [form] = Form.useForm();

  const { type = '', props = {}, isLocked, isHidden } = component || {};

  useEffect(() => {
    form.setFieldsValue(props);
  }, [props]);

  const handleValuesChange = (changedValues: ComponentPropsType, allValues: ComponentPropsType) => {
    dispatch(updateComponent({ ...allValues }));
  };

  const renderComponent = () => {
    if (type === 'questionRadio') {
      return <QuestionRadioPropComponent {...props} />;
    }
    if (type === 'questionCheckbox') {
      return <QuestionCheckboxPropComponent {...props} />;
    }
    if (componentTypeMapConfig[type]) {
      return <RightPanelWrapper>{formRender(componentTypeMapConfig[type])}</RightPanelWrapper>;
    }
    return <Empty description="请选择组件" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  };

  return (
    <Form
      initialValues={props}
      form={form}
      onValuesChange={handleValuesChange}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      disabled={isLocked || isHidden}
    >
      {renderComponent()}
    </Form>
  );
};

export default PropComponents;
