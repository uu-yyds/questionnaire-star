import React, { useEffect, useState } from 'react';
import QuestionList from '../../components/QuestionPage/QuestionList';
import { Question } from '../../types/QuestionPage';
import { Button, Input, Typography, Empty } from 'antd';
import { QuestionPageContainer, QuestionPageTitle } from '../../styles/QuestionPage';
import ListSearch from '../../components/Common/ListSearch';

const QuestionPage = () => {
  const [questionsList, setQuestionsList] = useState<Question[]>();
  const newQuestionsList: Question[] = [
    {
      id: 'q1',
      title: '问卷一',
      isPublished: false,
      createdAt: '2025-01-01',
      isStar: false,
      answerCount: Math.floor(Math.random() * 100),
    },
    {
      id: 'q2',
      title: '问卷二',
      isPublished: true,
      createdAt: '2025-01-02',
      isStar: false,
      answerCount: Math.floor(Math.random() * 100),
    },
    {
      id: 'q3',
      title: '问卷三',
      isPublished: true,
      createdAt: '2025-01-03',
      isStar: false,
      answerCount: Math.floor(Math.random() * 100),
    },
    {
      id: 'q4',
      title: '问卷四',
      isPublished: false,
      createdAt: '2025-01-04',
      isStar: false,
      answerCount: Math.floor(Math.random() * 100),
    },
  ];

  useEffect(() => {
    setQuestionsList(newQuestionsList);
  }, []);

  const handleCreateQuestion = () => {
    setQuestionsList([
      ...(questionsList || []),
      {
        id: 'q5' + Math.random().toString(36).substring(2, 15),
        title: '问卷',
        isPublished: false,
        createdAt: new Date().toString(),
        isStar: false,
        answerCount: Math.floor(Math.random() * 100),
      },
    ]);
  };

  return (
    <QuestionPageContainer>
      <QuestionPageTitle>
        <Typography.Title level={4}>我的问卷</Typography.Title>
        <ListSearch />
      </QuestionPageTitle>
      {questionsList?.length ? (
        <>
          <QuestionList questionsList={questionsList} setQuestionsList={setQuestionsList} />
          <div className="question-page-load-more">加载更多</div>
        </>
      ) : (
        <Empty description="暂无问卷" />
      )}
    </QuestionPageContainer>
  );
};

export default QuestionPage;
