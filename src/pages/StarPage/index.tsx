import React, { useState, useEffect } from 'react';
import QuestionList from '../../components/QuestionPage/QuestionList';
import {
  QuestionPageContainer,
  QuestionPageTitle,
} from '../../styles/QuestionPage/QuestionPage.styles';
import { Typography, Empty } from 'antd';
import ListSearch from '../../components/Common/ListSearch';
import { Question } from '../../types/QuestionPage';

const StarPage = () => {
  const [questionsList, setQuestionsList] = useState<Question[]>();
  const newQuestionsList: Question[] = [
    {
      id: 'q1',
      title: '问卷一',
      isPublished: false,
      createdAt: '2025-01-01',
      isStar: true,
      answerCount: Math.floor(Math.random() * 100),
    },
    {
      id: 'q2',
      title: '问卷二',
      isPublished: true,
      createdAt: '2025-01-02',
      isStar: true,
      answerCount: Math.floor(Math.random() * 100),
    },
    {
      id: 'q3',
      title: '问卷三',
      isPublished: true,
      createdAt: '2025-01-03',
      isStar: true,
      answerCount: Math.floor(Math.random() * 100),
    },
    {
      id: 'q4',
      title: '问卷四',
      isPublished: false,
      createdAt: '2025-01-04',
      isStar: true,
      answerCount: Math.floor(Math.random() * 100),
    },
  ];

  useEffect(() => {
    setQuestionsList(newQuestionsList);
  }, []);

  return (
    <QuestionPageContainer>
      <QuestionPageTitle>
        <Typography.Title level={4}>星标问卷</Typography.Title>
        <ListSearch />
      </QuestionPageTitle>
      {questionsList?.length ? (
        <>
          <QuestionList questionsList={questionsList} setQuestionsList={setQuestionsList} />
          <div className="question-page-load-more">加载更多</div>
        </>
      ) : (
        <Empty description="暂无星标问卷" />
      )}
    </QuestionPageContainer>
  );
};

export default StarPage;
