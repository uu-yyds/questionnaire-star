import styled from 'styled-components';

export const EditPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f0f5;
  height: 100vh;

  .header {
    height: 60px;
    background-color: #fff;
  }

  .contentWrapper {
    flex: auto;
    padding: 12px 0;
  }
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  margin: 0 24px;

  .left {
    width: 285px;
    background-color: #fff;
    padding: 0 12px;
  }

  .center {
    flex: 1;
    position: relative;
    overflow: hidden;

    .centerWrapper {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 400px;
      height: 712px;
      overflow: auto;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
    }
  }

  .right {
    width: 285px;
    background-color: #fff;
    padding: 0 12px;
  }
`;
