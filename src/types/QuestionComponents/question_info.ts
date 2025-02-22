import { IFormItem, FormItemType } from '../FormRender';

export type QuestionInfoPropsType = {
  title?: string;
  desc?: string;
};

export const QuestionInfoPropsConfig = (): IFormItem[] => {
  return [
    {
      name: 'title',
      type: FormItemType.Input,
      label: '标题',
      rules: [{ required: true, message: '请输入问卷标题' }],
      option: {
        placeholder: '请输入问卷标题',
      },
    },
    {
      name: 'desc',
      type: FormItemType.Textarea,
      label: '描述',
      rules: [{ required: true, message: '请输入问卷描述' }],
      option: {
        placeholder: '请输入问卷描述',
      },
    },
  ];
};
