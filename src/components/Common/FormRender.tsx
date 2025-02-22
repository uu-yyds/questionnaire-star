import React from 'react';
import { Form, Input, Checkbox, Button, Space, Select, Switch } from 'antd';
import { IFormItem, FormItemType } from '../../types/FormRender';
import { Link } from 'react-router-dom';

export const FormRenderItem = (item: IFormItem) => {
  let Item = null;
  const excludeType = [FormItemType.Button, FormItemType.Checkbox, FormItemType.ButtonLink];
  const labelColObj = {
    span: item.span ? item.span : 8,
    offset: item.offset ? item.offset : 0,
  };
  const wrapperColObj = {
    span: item.span ? 24 - item.span : 16,
    offset: item.offset ? item.offset : 0,
  };
  switch (item.type) {
    case 'Input':
      Item = <Input {...item.option} />;
      break;
    case 'Checkbox':
      Item = <Checkbox {...item.option}>{item.label}</Checkbox>;
      break;
    case 'Button':
      Item = <Button {...item.option}>{item.label}</Button>;
      break;
    case 'Password':
      Item = <Input.Password {...item.option} />;
      break;
    case 'ButtonLink':
      Item = (
        <Space>
          <Button {...item.option}>{item.label}</Button>
          <Link to={item.option?.to}>{item.option?.linktext}</Link>
        </Space>
      );
      break;
    case 'Select':
      Item = (
        <Select {...item.option}>
          {item.option.options.map((option: { label: string; value: string }) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
      break;
    case 'Switch':
      Item = <Switch {...item.option} />;
      break;
    case 'Textarea':
      Item = <Input.TextArea {...item.option} />;
      break;
  }
  return (
    <Form.Item
      label={excludeType.includes(item.type) ? '' : item.label}
      name={item.name}
      key={item.option?.cacheKey ? `${item.name}_${item.option?.cacheKey}` : `${item.name}`}
      rules={item.rules}
      style={item.formItemStyle || {}}
      labelCol={labelColObj}
      wrapperCol={wrapperColObj}
      dependencies={item.dependencies}
    >
      {Item}
    </Form.Item>
  );
};

export const formRender = (formData: IFormItem[]) => {
  return formData?.map(item => FormRenderItem(item));
};
