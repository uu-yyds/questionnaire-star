import styled from 'styled-components';

export const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

export const StatContentWrapper = styled.div`
  flex: auto;
  padding: 12px 0;
`;

export const StatContent = styled.div`
  display: flex;
  margin: 0 24px;
  height: calc(100vh - 60px - 24px);

  .left {
    width: 400px;
    margin-right: 24px;
  }

  .main {
    flex: auto;
    background-color: #fff;
    padding: 12px 18px;
  }

  .right {
    width: 400px;
    margin-left: 24px;
    background-color: #fff;
    padding: 12px 18px;
    overflow: hidden;
  }
`;
