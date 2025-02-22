import styled from 'styled-components';

export const EditCanvasWrapper = styled.div`
  min-height: 100%;
  overflow: hidden;
`;

export const ComponentWrapper = styled.div`
  padding: 12px;
  margin: 20px;
  border: 1px solid #fff;
  border-radius: 4px;

  &:hover {
    border-color: #d9d9d9;
  }

  &.selected {
    border-color: #1890ff !important;
  }

  &.locked {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DisabledWrapper = styled.div`
  pointer-events: none;
`;
