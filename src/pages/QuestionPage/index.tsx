import React, { useEffect, useState, useMemo, useRef } from 'react';
import QuestionList from '../../components/QuestionPage/QuestionList';
import { Typography, Empty, Spin, message } from 'antd';
import { QuestionPageContainer, QuestionPageTitle } from '../../styles/QuestionPage';
import ListSearch from '../../components/Common/ListSearch';
import { getQuestionList } from '../../services/question';
import { QuestionInfo } from '../../types/QuestionPage';
import { useSearchParams } from 'react-router-dom';
import { useDebounceFn, useRequest, useVirtualList } from 'ahooks';
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constants';
import { useTitle } from 'ahooks';

const QuestionPage = () => {
  useTitle('我的问卷');
  const [questionsList, setQuestionsList] = useState<QuestionInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

  const hasLoadMore = useMemo(() => questionsList.length < total, [questionsList, total]);

  // 搜索关键字变化时，收藏/删除变化时，重置列表
  useEffect(() => {
    setQuestionsList([]);
    setPageSize(LIST_PAGE_SIZE);
    setTotal(0);
  }, [keyword]);

  const { run: loadMore, loading: loadMoreLoading } = useRequest(
    async () => {
      const res = await getQuestionList({
        pageSize: pageSize + LIST_PAGE_SIZE,
        keyword: keyword || undefined,
      });
      setQuestionsList(res.list);
      setPageSize(pageSize + LIST_PAGE_SIZE);
    },
    { manual: true }
  );

  const { run: tryLoadMore } = useDebounceFn(
    async () => {
      const elem = loadMoreRef.current;
      if (elem) {
        const domRect = elem.getBoundingClientRect();
        if (domRect.bottom <= document.body.clientHeight) {
          loadMore();
        }
      }
    },
    { wait: 500 }
  );

  const InitQuestionList = async () => {
    try {
      const res = await getQuestionList({ keyword: keyword || undefined });
      setQuestionsList(res.list);
      setTotal(res.total);
      setLoading(false);
    } catch (error: any) {
      message.error('获取问卷列表失败');
    }
  };

  useEffect(() => {
    setLoading(true);
    InitQuestionList();
  }, [searchParams]);

  useEffect(() => {
    if (hasLoadMore) {
      window.addEventListener('scroll', tryLoadMore);
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [hasLoadMore, searchParams, loading]);

  // 虚拟列表
  // const { list, containerProps, wrapperProps, itemProps } = useVirtualList(questionsList, {
  //   itemHeight: 100,
  //   containerTarget: loadMoreRef,
  //   wrapperTarget: loadMoreRef,
  // });

  return (
    <QuestionPageContainer>
      <QuestionPageTitle>
        <Typography.Title level={4}>我的问卷</Typography.Title>
        <ListSearch />
      </QuestionPageTitle>
      <Spin spinning={loading}>
        {questionsList?.length ? (
          <>
            <QuestionList questionsList={questionsList} onFinish={InitQuestionList} />
            {hasLoadMore ? (
              <Spin spinning={loadMoreLoading}>
                <div className="load-more" ref={loadMoreRef}>
                  上滑动加载更多...
                </div>
              </Spin>
            ) : (
              <div className="load-more">没有更多了</div>
            )}
          </>
        ) : (
          <Empty description="暂无问卷" />
        )}
      </Spin>
    </QuestionPageContainer>
  );
};

export default QuestionPage;
