import React from 'react';
import type { QuestionTextAreaPropsType } from '../../types/QuestionComponents';
import { Input, Typography } from 'antd';

const QuestionTextArea = (props: QuestionTextAreaPropsType) => {
  const { Paragraph } = Typography;
  const { TextArea } = Input;

  const { title = '多行输入框标题', placeholder = '请输入' } = props;
  return (
    <div>
      <Paragraph style={{ fontWeight: 500, fontSize: '16px' }}>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  );
};

export default QuestionTextArea;
