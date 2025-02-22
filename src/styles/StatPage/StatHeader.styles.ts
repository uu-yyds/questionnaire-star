import styled from 'styled-components';

export const StatHeaderWrapper = styled.div`
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  padding: 16px 0;
`;

export const StatHeaderContent = styled.div`
  display: flex;
  margin: 0 24px;

  .left {
    flex: 1;
  }

  .right {
    flex: 1;
    text-align: right;
  }

  .main {
    flex: 1;
    text-align: center;
  }
`;
