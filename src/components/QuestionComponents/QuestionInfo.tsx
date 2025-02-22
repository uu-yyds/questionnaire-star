import React from 'react';
import type { QuestionInfoPropsType } from '../../types/QuestionComponents';
import { Typography } from 'antd';

const QuestionInfo = (props: QuestionInfoPropsType) => {
  const { Title, Paragraph } = Typography;

  const { title = '问卷标题', desc = '问卷描述' } = props;
  const descList = desc.split('\n');
  return (
    <div>
      <Title style={{ textAlign: 'center', fontSize: '24px' }}>{title}</Title>
      <Paragraph style={{ textAlign: 'center', marginBottom: '0px' }}>
        {descList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionInfo;
