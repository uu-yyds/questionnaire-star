import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserInfo } from '../services/user';
import { LOGIN_PATHNAME, HOME_PATHNAME, isLoginOrRegister, isNoNeedUserInfo } from '../constants';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setIsLogin, setUserInfo } from '../stores/user_reducers';

export const useNavPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;

  useEffect(() => {
    const asyncData = async () => {
      try {
        const { username } = await getUserInfo();
        if (username) {
          if (isLoginOrRegister(pathname)) {
            navigate(HOME_PATHNAME);
          }
          return;
        } else if (isNoNeedUserInfo(pathname)) {
          return;
        } else {
          dispatch(setIsLogin(false));
          dispatch(setUserInfo({ username: '', nickname: '' }));
          navigate(LOGIN_PATHNAME);
        }
      } catch (error: any) {
        // 无权限获取用户信息
        message.error(error?.data?.message);
        if (!isNoNeedUserInfo(pathname)) {
          dispatch(setIsLogin(false));
          dispatch(setUserInfo({ username: '', nickname: '' }));
          navigate(LOGIN_PATHNAME);
        }
      }
    };
    asyncData();
  }, [navigate, pathname]);
};
