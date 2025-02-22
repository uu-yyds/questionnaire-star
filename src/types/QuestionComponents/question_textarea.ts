import { IFormItem, FormItemType } from '../FormRender';

export type QuestionTextAreaPropsType = {
  title?: string;
  placeholder?: string;
};

export const QuestionTextAreaPropsConfig = (): IFormItem[] => {
  return [
    {
      name: 'title',
      type: FormItemType.Input,
      label: '标题',
      rules: [{ required: true, message: '请输入多行输入框标题' }],
      option: {
        placeholder: '请输入多行输入框标题',
      },
    },
    {
      name: 'placeholder',
      type: FormItemType.Input,
      label: '提示文字',
      option: {
        placeholder: '请输入多行输入框提示文字',
      },
    },
  ];
};
