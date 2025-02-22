import { FormItemType, IFormItem } from '../FormRender';

export type QuestionTitlePropsType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
};

export const QuestionTitlePropsConfig = (): IFormItem[] => {
  return [
    {
      name: 'text',
      type: FormItemType.Input,
      label: '标题',
      rules: [{ required: true, message: '请输入标题' }],
      option: {
        placeholder: '请输入标题',
      },
    },
    {
      name: 'level',
      type: FormItemType.Select,
      label: '层级',
      option: {
        options: [
          { label: '一级标题', value: 1 },
          { label: '二级标题', value: 2 },
          { label: '三级标题', value: 3 },
          { label: '四级标题', value: 4 },
          { label: '五级标题', value: 5 },
        ],
      },
    },
    {
      name: 'isCenter',
      type: FormItemType.Select,
      label: '居中显示',
      option: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
    },
  ];
};
