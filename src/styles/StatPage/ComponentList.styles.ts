import styled from 'styled-components';

export const ComponentContainer = styled.div`
  min-height: 100%;
  background-color: #fff;
  overflow: auto;
`;

export const ComponentWrapper = styled.div`
  padding: 12px 6px;
  margin: 12px;
  border-radius: 4px;
  border: 1px solid #fff;

  &:hover {
    border-color: #d9d9d9;
  }

  &.selected {
    border-color: #1890ff !important;
  }
`;

export const DisabledWrapper = styled.div`
  pointer-events: none;
  opacity: 0.8;
`;
