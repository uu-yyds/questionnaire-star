import { IFormItem, FormItemType } from '../FormRender';

export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;
};

export const QuestionInputPropsConfig = (): IFormItem[] => {
  return [
    {
      name: 'title',
      type: FormItemType.Input,
      label: '标题',
      rules: [{ required: true, message: '请输入标题' }],
      option: {
        placeholder: '请输入标题',
      },
    },
    {
      name: 'placeholder',
      type: FormItemType.Input,
      label: '提示文字',
      option: {
        placeholder: '请输入提示文字',
      },
    },
  ];
};
