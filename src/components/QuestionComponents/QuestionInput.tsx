import React from 'react';
import type { QuestionInputPropsType } from '../../types/QuestionComponents';
import { Input, Typography } from 'antd';

const QuestionInput = (props: QuestionInputPropsType) => {
  const { title = '输入框标题', placeholder = '请输入' } = props;
  const { Paragraph } = Typography;

  return (
    <div>
      <Paragraph style={{ fontWeight: 500, fontSize: '16px' }}>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  );
};

export default QuestionInput;
