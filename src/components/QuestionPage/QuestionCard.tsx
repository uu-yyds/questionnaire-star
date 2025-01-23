import React from 'react';
import { Question } from '../../types/QuestionPage';
import { QuestionItem } from '../../styles/QuestionPage';
import { useFormatDate } from '../../hooks';
import { Button } from 'antd';
interface QuestionCardProps {
  question: Question;
  handleDelete: (id: string) => void;
  handlePublish: (id: string, isPublished: boolean) => void;
  handleStar: (id: string, isStar: boolean) => void;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { question, handleDelete, handlePublish, handleStar } = props;
  const { id, title, isPublished, createdAt, isStar, answerCount } = question;
  const formatDate = useFormatDate(createdAt, 'MM月DD日 HH:mm');
  const handleEdit = (id: string) => {
    console.log('编辑', id);
  };
  const handleCopy = (id: string) => {
    console.log('复制', id);
  };
  return (
    <QuestionItem key={id}>
      <div className="question-item-top">
        <div className="question-title">{title}</div>
        <div className="question-top-right">
          {isPublished ? (
            <div className="isPublished">已发布</div>
          ) : (
            <div className="isPublished">未发布</div>
          )}
          <div className="question-top-right-answer">答卷：{answerCount}</div>
          <div className="question-top-right-date">{formatDate}</div>
        </div>
      </div>
      <div className="question-item-bottom">
        <Button type="primary" onClick={() => handleEdit(id)}>
          编辑
        </Button>
        <Button>数据统计</Button>
        <div className="question-item-bottom-right">
          <Button type="text" onClick={() => handleStar(id, isStar)}>
            {isStar ? '取消收藏' : '收藏'}
          </Button>
          <Button type="text" onClick={() => handleCopy(id)}>
            复制
          </Button>
          <Button type="text" onClick={() => handleDelete(id)}>
            删除
          </Button>
        </div>
      </div>
    </QuestionItem>
  );
};

export default QuestionCard;
