import React from 'react';
import { QuestionInfo } from '../../types/QuestionPage';
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
  question: QuestionInfo;
  handleDelete: (id: string) => void;
  handlePublish: (id: string, isPublished: boolean) => void;
  handleStar: (id: string, isStar: boolean) => void;
  handleDuplicate: (id: string, data: Partial<QuestionInfo>) => void;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { question, handleDelete, handlePublish, handleStar, handleDuplicate } = props;
  const { _id: id, title, isPublished, createdAt, isStar } = question;
  const navigate = useNavigate();
  const formatDate = useFormatDate(createdAt, 'MM月DD日 HH:mm');

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
            {isPublished ? (
              <>
                <Tag color="processing">已发布</Tag>
                <div className="question-top-right-answer">答卷：100</div>
              </>
            ) : (
              <Tag color="default">未发布</Tag>
            )}
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
          <Button type="text" size="small" onClick={() => handleDuplicate(id, { isStar })}>
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
