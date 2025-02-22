import { answerListType, componentStatType } from '../types/Stat/answer_list';
import instance from './';

const getAnswerList = async (
  questionId: string,
  data?: { page: number; pageSize: number }
): Promise<answerListType> => {
  return await instance.get(`/api/stat/answer/${questionId}`, {
    params: data,
  });
};

const getComponentStat = async (
  questionId: string,
  componentId: string
): Promise<componentStatType[]> => {
  return await instance.get(`/api/stat/component/${questionId}/${componentId}`);
};

export { getAnswerList, getComponentStat };
