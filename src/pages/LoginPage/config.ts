export const USER_NAME_KEY = 'username';
export const PASSWORD_KEY = 'password';
export const REMEMBER_ME_KEY = 'remember';
export const CONFIRM_PASSWORD_KEY = 'confirmPassword';
export const LOGIN_BUTTON_LINK_KEY = 'loginLink';
import { IFormItem, FormItemType } from '../../types/FormRender';
import { REGISTER_PATHNAME } from '../../constants';

export const formConfig = (
  isRememberMe: boolean,
  onChangeRememberMe: (e: any) => void
): IFormItem[] => {
  return [
    {
      type: FormItemType.Input,
      label: '用户名',
      name: USER_NAME_KEY,
      option: {
        placeholder: '请输入用户名',
        size: 'large',
      },
      rules: [
        { required: true, message: '请输入用户名' },
        { type: 'string', pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含数字、字母和下划线' },
        { type: 'string', min: 5, max: 20, message: '用户名长度在5-20个字符之间' },
      ],
    },
    {
      type: FormItemType.Password,
      label: '密码',
      name: PASSWORD_KEY,
      option: {
        placeholder: '请输入密码',
        size: 'large',
      },
      rules: [{ required: true, message: '请输入密码' }],
    },
    {
      type: FormItemType.Checkbox,
      label: '记住我',
      name: REMEMBER_ME_KEY,
      option: {
        checked: isRememberMe,
        onChange: onChangeRememberMe,
      },
      offset: 6,
      span: 16,
    },
    {
      type: FormItemType.ButtonLink,
      label: '登录',
      name: LOGIN_BUTTON_LINK_KEY,
      option: {
        to: REGISTER_PATHNAME,
        linktext: '没有账号？去注册',
        type: 'primary',
        htmlType: 'submit',
        size: 'large',
      },
      offset: 6,
      span: 4,
    },
  ];
};
