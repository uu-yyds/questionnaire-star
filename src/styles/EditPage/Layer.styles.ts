import styled from 'styled-components';

export const LayerWrapper = styled.div`
  padding: 0 12px;
`;

export const LayerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 1px solid #e8e8e8;
  gap: 8px;
  &:hover {
    color: #1890ff;
  }
`;
