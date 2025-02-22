import React from 'react';
import type { QuestionParagraphPropsType } from '../../types/QuestionComponents/question_paragraph';
import { Typography } from 'antd';

const QuestionParagraph = (props: QuestionParagraphPropsType) => {
  const { paragraph = '一行段落', isCenter = false } = props;
  const { Paragraph } = Typography;
  const textList = paragraph.split('\n');

  // 尽量不要使用 dangerouslySetInnerHTML
  // 使用 dangerouslySetInnerHTML 可能会导致 XSS 攻击
  // 使用 dangerouslySetInnerHTML 可能会导致样式丢失

  return (
    <div>
      <Paragraph style={{ textAlign: isCenter ? 'center' : 'left', marginBottom: '0px' }}>
        {textList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionParagraph;
