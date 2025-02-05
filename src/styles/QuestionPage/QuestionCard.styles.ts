import styled from 'styled-components';

export const QuestionItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .isPublished {
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 5px;
    font-size: 12px;
  }

  .question-item-top {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 0 10px 0;
    width: 100%;
    border-bottom: 1px solid #ccc;

    .question-title {
      flex: 1;
      font-size: 14px;
    }

    .question-top-right {
      display: flex;
      align-items: center;
      gap: 10px;

      .question-top-right-answer {
        font-size: 12px;
        color: #999;
      }

      .question-top-right-date {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .question-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    padding: 10px 0 0 0;

    .question-item-bottom-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
`;
