import { Rule } from 'antd/es/form';

export interface IFormItem {
  name: any;
  label: string;
  required?: boolean;
  rules?: Rule[];
  valuePropName?: string;
  type: FormItemType;
  option: {
    [key: string]: any;
  };
  formItemStyle?: {
    [key: string]: any;
  };
  span?: number;
  offset?: number;
  dependencies?: string[];
}

export enum FormItemType {
  Input = 'Input',
  Checkbox = 'Checkbox',
  Button = 'Button',
  Password = 'Password',
  ButtonLink = 'ButtonLink',
}
