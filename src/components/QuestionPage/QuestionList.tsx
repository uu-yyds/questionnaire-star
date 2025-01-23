import React from 'react';
import { Question } from '../../types/QuestionPage';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  questionsList: Question[];
  setQuestionsList: (questionsList: Question[]) => void;
}

const QuestionList = (props: QuestionListProps) => {
  const { questionsList, setQuestionsList } = props;
  const handleDelete = (id: string) => {
    console.log('删除', id);
    setQuestionsList(questionsList.filter(q => q.id !== id));
  };
  const handlePublish = (id: string, isPublished: boolean) => {
    console.log('发布', id);
    setQuestionsList(
      questionsList.map(q => (q.id === id ? { ...q, isPublished: !isPublished } : q))
    );
  };
  const handleStar = (id: string, isStar: boolean) => {
    console.log('收藏', id);
    setQuestionsList(questionsList.map(q => (q.id === id ? { ...q, isStar: !isStar } : q)));
  };

  return (
    <>
      {questionsList?.map((q: Question) => {
        return (
          <QuestionCard
            key={q.id}
            question={q}
            handleDelete={handleDelete}
            handlePublish={handlePublish}
            handleStar={handleStar}
          />
        );
      })}
    </>
  );
};

export default QuestionList;
