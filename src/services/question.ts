import instance from './index';
import {
  QuestionInfo,
  QuestionList,
  QuestionProps,
  QuestionListProps,
} from '../types/QuestionPage/question';

const getQuestionById = async (id: string): Promise<QuestionInfo> => {
  return await instance.get('api/question/' + id);
};

const getQuestionList = async (data?: Partial<QuestionListProps>): Promise<QuestionList> => {
  return await instance.get('api/question', { params: data });
};

const createQuestion = async (data?: QuestionProps): Promise<QuestionInfo> => {
  return await instance.post('api/question/create', data);
};

const duplicateQuestion = async (
  id: string,
  data?: Partial<QuestionInfo>
): Promise<QuestionInfo> => {
  return await instance.post('api/question/duplicate/' + id, data);
};

const updateQuestion = async (
  id: string,
  updateInfo: Partial<QuestionInfo>
): Promise<QuestionInfo> => {
  return await instance.patch('api/question/update/' + id, updateInfo);
};

const deleteQuestion = async (id: string): Promise<QuestionInfo> => {
  return await instance.delete('api/question/delete/' + id);
};

const deleteQuestionList = async (ids: string[]): Promise<QuestionInfo> => {
  return await instance.delete('api/question/deleteMany', { data: ids });
};

export {
  getQuestionById,
  getQuestionList,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteQuestionList,
  duplicateQuestion,
};
