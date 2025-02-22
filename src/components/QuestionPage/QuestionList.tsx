import React from 'react';
import { QuestionInfo } from '../../types/QuestionPage';
import QuestionCard from './QuestionCard';
import { Modal, message } from 'antd';
import { updateQuestion, duplicateQuestion } from '../../services/question';
interface QuestionListProps {
  questionsList: QuestionInfo[];
  onFinish?: () => void;
}

const QuestionList = (props: QuestionListProps) => {
  const { questionsList, onFinish } = props;

  const handleDelete = (id: string) => {
    console.log('删除', id);
    Modal.confirm({
      title: '删除问卷',
      content: '确定删除该问卷吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await updateQuestion(id, { isDeleted: true, isStar: false });
        message.success('删除成功, 请到回收站查看');
        onFinish?.();
      },
    });
  };

  const handlePublish = (id: string, isPublished: boolean) => {
    console.log('发布', id);
  };

  const handleStar = (id: string, isStar: boolean) => {
    Modal.confirm({
      title: `${!isStar ? '收藏' : '取消收藏'}问卷`,
      content: `确定${!isStar ? '收藏' : '取消收藏'}该问卷吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await updateQuestion(id, { isStar: !isStar });
        !isStar
          ? message.success('收藏成功，请到收藏夹查看')
          : message.success('取消收藏成功，请到主页查看');
        onFinish?.();
      },
    });
  };

  const handleDuplicate = (id: string, data: Partial<QuestionInfo>) => {
    Modal.confirm({
      title: '复制问卷',
      content: '确定复制该问卷吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await duplicateQuestion(id, data);
        message.success('复制成功');
        onFinish?.();
      },
    });
  };

  return (
    <>
      {questionsList?.map((q: QuestionInfo) => {
        return (
          <QuestionCard
            key={q._id}
            question={q}
            handleDelete={handleDelete}
            handlePublish={handlePublish}
            handleStar={handleStar}
            handleDuplicate={handleDuplicate}
          />
        );
      })}
    </>
  );
};

export default QuestionList;
