import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  username: string;
  nickname: string;
  avatar?: string;
}

export interface UserState {
  isLogin: boolean;
  userInfo: UserInfo;
}

const initialState: UserState = {
  isLogin: false,
  userInfo: {
    username: '',
    nickname: '',
    avatar: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setIsLogin: (state: UserState, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setUserInfo: (state: UserState, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setIsLogin, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
