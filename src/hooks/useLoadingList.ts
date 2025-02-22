import { useState } from 'react';
import { getQuestionList } from '../services/question';
import { useRequest } from 'ahooks';
import { QuestionInfo } from '../types/QuestionPage/question';
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_NUM,
  LIST_PAGE_SIZE,
} from '../constants/search_params';
import { useSearchParams } from 'react-router-dom';

type Params = {
  isStar?: boolean;
  isDeleted?: boolean;
};

export const useLoadingList = (params?: Params) => {
  const [list, setList] = useState<QuestionInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [searchParams] = useSearchParams();

  const { loading, run: fetchQuestionList } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || undefined;
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || LIST_PAGE_NUM;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;

      const res = await getQuestionList({
        keyword,
        page,
        pageSize,
        ...params,
      });
      setList(res.list);
      setTotal(res.total);
    },
    {
      refreshDeps: [searchParams],
    }
  );

  return { loading, list, total, fetchQuestionList };
};
