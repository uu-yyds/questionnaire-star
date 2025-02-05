import styled from 'styled-components';

export const HomePageWrapper = styled.div`
  text-align: center;
  min-height: calc(100vh - 71px - 64px);
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .info {
    text-align: center;

    button {
      margin: 0 10px;
      height: 60px;
      font-size: 24px;
    }
  }
`;
