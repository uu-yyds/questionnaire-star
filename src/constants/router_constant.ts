const HOME_PATHNAME = '/';
const LOGIN_PATHNAME = '/login';
const REGISTER_PATHNAME = '/register';
const MANAGE_PATHNAME = '/manage';
const MANAGE_LIST_PATHNAME = '/manage/list';
const MANAGE_STAR_PATHNAME = '/manage/star';
const MANAGE_TRASH_PATHNAME = '/manage/trash';
const QUESTION_LIST_PATHNAME = '/question/list';
const QUESTION_EDIT_PATHNAME = '/question/edit';
const QUESTION_STAT_PATHNAME = '/question/stat';
const NOT_FOUND = '/not-found';

export {
  HOME_PATHNAME,
  LOGIN_PATHNAME,
  REGISTER_PATHNAME,
  MANAGE_PATHNAME,
  MANAGE_LIST_PATHNAME,
  MANAGE_STAR_PATHNAME,
  MANAGE_TRASH_PATHNAME,
  QUESTION_LIST_PATHNAME,
  QUESTION_EDIT_PATHNAME,
  QUESTION_STAT_PATHNAME,
  NOT_FOUND,
};

export const isLoginOrRegister = (pathname: string) => {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
};

export const isNoNeedUserInfo = (pathname: string) => {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
};
