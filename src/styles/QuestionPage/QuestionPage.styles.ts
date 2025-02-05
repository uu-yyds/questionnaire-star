import styled from 'styled-components';

export const QuestionPageContainer = styled.div`
  padding: 20px;

  .question-page-load-more {
    margin-top: 20px;
    text-align: center;
    color: #1890ff;
    cursor: pointer;
  }
`;

export const QuestionPageTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .question-page-title-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
`;
