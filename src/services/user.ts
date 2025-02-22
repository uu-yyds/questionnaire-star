import instance from './index';
import { LoginResponse, LoginInfo } from '../types/LoginPage';
import { RegisterInfo, RegisterResponse } from '../types/RegisterPage';
const login = async (data: LoginInfo): Promise<LoginResponse> => {
  return await instance.post('api/user/login', data);
};

const register = async (data: RegisterInfo): Promise<RegisterResponse> => {
  return await instance.post('api/user/register', data);
};

const getUserInfo = async (): Promise<RegisterResponse> => {
  return await instance.get('api/user/info');
};

export { login, register, getUserInfo };
