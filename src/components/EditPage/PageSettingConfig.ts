import { IFormItem, FormItemType } from '../../types/FormRender';

export const PageSettingConfig = (): IFormItem[] => {
  return [
    {
      name: 'title',
      label: '问卷标题',
      type: FormItemType.Input,
      rules: [{ required: true, message: '请输入问卷标题' }],
      option: {
        placeholder: '请输入问卷标题',
      },
    },
    {
      name: 'description',
      label: '问卷描述',
      type: FormItemType.Textarea,
      option: {
        placeholder: '请输入问卷描述',
      },
    },
    {
      name: 'js',
      label: '问卷js脚本',
      type: FormItemType.Textarea,
      option: {
        placeholder: '请输入js脚本代码',
      },
    },
    {
      name: 'css',
      label: '问卷css样式',
      type: FormItemType.Textarea,
      option: {
        placeholder: '请输入css样式代码',
      },
    },
  ];
};
