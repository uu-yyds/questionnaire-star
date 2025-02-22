import styled from 'styled-components';

export const LeftPanelWrapper = styled.div`
  margin-bottom: 12px;
  cursor: pointer;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;

  &:hover {
    border-color: #d9d9d9;
  }
`;

export const DisabledComponentWrapper = styled.div`
  pointer-events: none;
`;
