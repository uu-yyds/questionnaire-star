export const USER_NAME_KEY = 'username';
export const PASSWORD_KEY = 'password';
export const REMEMBER_ME_KEY = 'remember';
export const CONFIRM_PASSWORD_KEY = 'confirmPassword';
export const REGISTER_BUTTON_LINK_KEY = 'registerLink';
import { IFormItem, FormItemType } from '../../types/FormRender';
import { LOGIN_PATHNAME } from '../../constants';

export const formConfig = (): IFormItem[] => {
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
      type: FormItemType.Password,
      label: '确认密码',
      name: CONFIRM_PASSWORD_KEY,
      dependencies: [PASSWORD_KEY],
      option: {
        placeholder: '请输入确认密码',
        size: 'large',
      },
      rules: [
        { required: true, message: '请输入确认密码' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue(PASSWORD_KEY) === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('两次密码不一致'));
          },
        }),
      ],
    },
    {
      type: FormItemType.ButtonLink,
      label: '注册',
      name: REGISTER_BUTTON_LINK_KEY,
      option: {
        to: LOGIN_PATHNAME,
        linkText: '已有账号？去登录',
        type: 'primary',
        htmlType: 'submit',
        size: 'large',
      },
      offset: 6,
    },
  ];
};
