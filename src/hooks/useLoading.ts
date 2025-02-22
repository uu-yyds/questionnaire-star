import { useParams } from 'react-router-dom';
import { getQuestionById } from '../services/question';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { resetComponents } from '../stores/components_reducer';
import { useEffect } from 'react';
import { resetPageInfo } from '../stores/pageInfo_reducers';

export const useLoading = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const asyncData = async (id: string) => {
    if (id) {
      try {
        const res = await getQuestionById(id);
        return res;
      } catch (error: any) {
        message.error(error?.data?.message);
      }
    }
  };

  const { loading, data, error, run } = useRequest(asyncData, {
    manual: true,
  });

  useEffect(() => {
    if (id) {
      run(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      const { componentsList, title, description, js = '', css = '', isPublished = false } = data;
      dispatch(resetComponents(componentsList));
      dispatch(resetPageInfo({ title, description, js, css, isPublished }));
    }
  }, [data]);

  return { loading, question: data, error, run };
};
