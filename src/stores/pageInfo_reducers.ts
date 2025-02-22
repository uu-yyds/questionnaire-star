import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PageInfoState {
  title: string;
  description?: string;
  isPublished?: boolean;
  js?: string;
  css?: string;
}

const INITIAL_STATE: PageInfoState = {
  title: '',
  description: '',
  js: '',
  css: '',
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INITIAL_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoState, action: PayloadAction<PageInfoState>) => {
      return action.payload;
    },
    updatePageInfo: (state: PageInfoState, action: PayloadAction<PageInfoState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { resetPageInfo, updatePageInfo } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
