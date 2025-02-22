import { FormItemType, IFormItem } from '../FormRender';

export type QuestionParagraphPropsType = {
  paragraph?: string;
  isCenter?: boolean;
};

export const QuestionParagraphPropsConfig = (): IFormItem[] => {
  return [
    {
      name: 'paragraph',
      type: FormItemType.Textarea,
      label: '段落内容',
      rules: [{ required: true, message: '请输入段落内容' }],
      option: {
        placeholder: '请输入段落内容',
      },
    },
    {
      name: 'isCenter',
      type: FormItemType.Select,
      label: '是否居中',
      option: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
    },
  ];
};
