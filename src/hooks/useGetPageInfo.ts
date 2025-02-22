import { useSelector } from 'react-redux';
import { PageInfoState } from '../stores/pageInfo_reducers';

export const useGetPageInfo = () => {
  const pageInfo = useSelector((state: { pageInfo: PageInfoState }) => state.pageInfo);
  return pageInfo;
};
