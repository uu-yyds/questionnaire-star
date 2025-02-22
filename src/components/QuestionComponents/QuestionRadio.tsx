import React from 'react';
import { QuestionRadioPropsType } from '../../types/QuestionComponents/question_radio';
import { Radio, Typography, Space } from 'antd';

const QuestionRadio = (props: QuestionRadioPropsType) => {
  const { Paragraph } = Typography;

  const { title, options, isVertical, value } = props;

  return (
    <div>
      <Paragraph style={{ fontSize: 16, fontWeight: 500 }}>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options?.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default QuestionRadio;
