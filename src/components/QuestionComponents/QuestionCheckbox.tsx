import React from 'react';
import { QuestionCheckboxPropsType } from '../../types/QuestionComponents/question_checkbox';
import { Checkbox, Typography, Space } from 'antd';

const QuestionCheckbox = (props: QuestionCheckboxPropsType) => {
  const { Paragraph } = Typography;

  const { title, list, isVertical } = props;

  return (
    <div>
      <Paragraph style={{ fontSize: 16, fontWeight: 500 }}>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list?.map(option => {
          const { value, label, checked } = option;
          return (
            <Checkbox key={value} checked={checked}>
              {label}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QuestionCheckbox;
