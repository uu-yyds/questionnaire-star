import styled from 'styled-components';

export const EditHeaderWrapper = styled.div`
  height: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 16px 0;
`;

export const EditHeaderContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 24px;

  .left {
    flex: 1;
  }

  .main {
    flex: 1;
    text-align: center;
  }

  .right {
    flex: 1;
    text-align: right;
  }
`;
