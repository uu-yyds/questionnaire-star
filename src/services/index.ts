import axios, { AxiosResponse } from 'axios';
import { BASE_URL, TIMEOUT } from '../constants';
import { localCacheService } from '../utils';
import { TOKEN_KEY } from '../constants/';

const instance = axios.create({
  timeout: TIMEOUT,
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  config => {
    const token = localCacheService.get(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  <T>(response: AxiosResponse<ResponseData<T>>) => {
    const res = (response.data || {}) as ResponseData<T>;
    const { error, data, message } = res;
    if (error === 0) {
      return data;
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    return Promise.reject(error.response);
  }
);

export default instance;

export type ResponseData<T> = {
  error: number;
  data: T;
  message: string;
};
