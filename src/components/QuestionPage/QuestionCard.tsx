import React from 'react';
import { Question } from '../../types/QuestionPage';
import { QuestionItem } from '../../styles/QuestionPage';
import { useFormatDate } from '../../hooks';
import { Button, Space, Tag, Modal, message } from 'antd';
import {
  EditOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { QUESTION_EDIT_PATHNAME, QUESTION_STAT_PATHNAME } from '../../constants';
interface QuestionCardProps {
  question: Question;
  handleDelete: (id: string) => void;
  handlePublish: (id: string, isPublished: boolean) => void;
  handleStar: (id: string, isStar: boolean) => void;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { question, handleDelete, handlePublish, handleStar } = props;
  const { id, title, isPublished, createdAt, isStar, answerCount } = question;
  const navigate = useNavigate();
  const formatDate = useFormatDate(createdAt, 'MM月DD日 HH:mm');

  const handleCopy = (id: string) => {
    console.log('复制', id);
    Modal.confirm({
      title: '复制问卷',
      content: '确定复制该问卷吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        console.log('复制');
        message.success('复制成功');
      },
    });
  };

  return (
    <QuestionItem key={id}>
      <div className="question-item-top">
        <Link
          to={isPublished ? QUESTION_STAT_PATHNAME + `/${id}` : QUESTION_EDIT_PATHNAME + `/${id}`}
          className="question-title"
        >
          <Space>
            {isStar && <StarFilled style={{ color: 'red' }} />}
            {title}
          </Space>
        </Link>
        <div className="question-top-right">
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag color="default">未发布</Tag>}
            <div className="question-top-right-answer">答卷：{answerCount}</div>
            <div className="question-top-right-date">{formatDate}</div>
          </Space>
        </div>
      </div>
      <div className="question-item-bottom">
        <Space>
          <Button
            type="text"
            size="small"
            onClick={() => navigate(QUESTION_EDIT_PATHNAME + `/${id}`)}
          >
            <EditOutlined />
            编辑
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => navigate(QUESTION_STAT_PATHNAME + `/${id}`)}
            disabled={!isPublished}
          >
            <LineChartOutlined />
            数据统计
          </Button>
        </Space>
        <Space className="question-item-bottom-right">
          <Button type="text" size="small" onClick={() => handleStar(id, isStar)}>
            {isStar ? (
              <Space>
                <StarFilled />
                取消收藏
              </Space>
            ) : (
              <Space>
                <StarOutlined />
                收藏
              </Space>
            )}
          </Button>
          <Button type="text" size="small" onClick={() => handleCopy(id)}>
            <CopyOutlined />
            复制
          </Button>
          <Button type="text" size="small" onClick={() => handleDelete(id)}>
            <DeleteOutlined />
            删除
          </Button>
        </Space>
      </div>
    </QuestionItem>
  );
};

export default QuestionCard;
