import React from 'react';
import { QuestionTitlePropsType } from '@/types/QuestionComponents';
import { Typography } from 'antd';

const QuestionTitle = (props: QuestionTitlePropsType) => {
  const { text = '一行标题', level = 1, isCenter = false } = props;
  const { Title } = Typography;

  const getFontSize = (level: number) => {
    if (level === 1) return '30px';
    if (level === 2) return '24px';
    if (level === 3) return '20px';
    return '16px';
  };

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'left',
        marginBottom: '0px',
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
