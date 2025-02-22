import type { ComponentPropsType } from '../QuestionComponents';

export interface QuestionList {
  list: QuestionInfo[];
  total: number;
}

export interface QuestionInfo {
  _id: string;
  _v?: number;
  title: string;
  description?: string;
  js?: string;
  css?: string;
  isPublished: boolean;
  createdAt: string;
  isStar: boolean;
  isDeleted: boolean;
  componentsList: Component[];
  author: {
    nickname: string;
    username: string;
  };
}

export interface Component {
  fe_id?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  isLocked?: boolean;
  title: string;
  type: string;
  props: ComponentPropsType;
}

export interface QuestionProps {
  title?: string;
  description?: string;
}

export interface QuestionListProps {
  keyword?: string;
  page?: number;
  pageSize?: number;
  isDeleted?: boolean;
  isStar?: boolean;
}
