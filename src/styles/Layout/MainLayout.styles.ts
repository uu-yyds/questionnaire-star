import { styled } from 'styled-components';

export const MainLayoutWrapper = styled.div`
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .left {
      float: left;
    }

    .right {
      float: right;
    }
  }

  .main {
    min-height: calc(100vh - 71px - 64px);
  }

  .footer {
    text-align: center;
    background-color: #f7f7f7;
    border-top: 1px solid #e8e8e8;
  }
`;
