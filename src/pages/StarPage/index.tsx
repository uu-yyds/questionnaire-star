import React, { useEffect } from 'react';
import QuestionList from '../../components/QuestionPage/QuestionList';
import {
  QuestionPageContainer,
  QuestionPageTitle,
} from '../../styles/QuestionPage/QuestionPage.styles';
import { Typography, Empty, Spin, message } from 'antd';
import ListSearch from '../../components/Common/ListSearch';
import { useLoadingList } from '../../hooks/useLoadingList';
import ListPagination from '../../components/Common/ListPagination';
import { useTitle } from 'ahooks';
const StarPage = () => {
  useTitle('星标问卷');
  const {
    list: questionsList,
    loading,
    fetchQuestionList,
    total,
  } = useLoadingList({
    isStar: true,
  });

  useEffect(() => {
    try {
      fetchQuestionList();
    } catch (error: any) {
      message.error('获取星标问卷失败');
    }
  }, []);

  return (
    <QuestionPageContainer>
      <QuestionPageTitle>
        <Typography.Title level={4}>星标问卷</Typography.Title>
        <ListSearch />
      </QuestionPageTitle>
      <Spin spinning={loading}>
        {questionsList?.length ? (
          <>
            <QuestionList questionsList={questionsList} onFinish={fetchQuestionList} />
            <ListPagination total={total} />
          </>
        ) : (
          <Empty description="暂无星标问卷" />
        )}
      </Spin>
    </QuestionPageContainer>
  );
};

export default StarPage;
