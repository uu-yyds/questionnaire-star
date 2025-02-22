import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ComponentsState } from '../../stores/components_reducer';
import {
  changeSelectedId,
  dragSortComponent,
  changeComponentTitle,
  toggleComponentLocked,
  toggleComponentHidden,
} from '../../stores/components_reducer';
import { message, Space, Button, Input } from 'antd';
import { LayerItem, LayerWrapper } from '../../styles/EditPage';
import { LockOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import SortableContainer from '../DragSortable/SortableContainer';
import SortableItem from '../DragSortable/SortableItem';
import { StoreStateType } from '../../stores';

const Layer = () => {
  const { selectedId, componentList } = useSelector<StoreStateType, ComponentsState>(
    (state: StoreStateType) => state.components.present
  );
  const dispatch = useDispatch();

  const [changingTitleId, setChangingTitleId] = useState<string>('');

  const componentListWithId = useMemo(
    () => componentList.map(component => ({ id: component.fe_id || '', ...component })),
    [componentList]
  );

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(dragSortComponent({ oldIndex, newIndex }));
  };

  const handleTitleClick = (id: string) => {
    const curComp = componentList.find(c => c.fe_id === id);
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件');
      return;
    }
    if (id !== selectedId) {
      dispatch(changeSelectedId(id));
      setChangingTitleId('');
    }
    setChangingTitleId(id);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (!value) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle(value));
  };

  const showComponentLocked = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation();
    dispatch(toggleComponentLocked(id));
  };

  const cancelComponentHidden = (
    e: React.MouseEvent<HTMLElement>,
    id: string,
    isHidden: boolean
  ) => {
    e.stopPropagation();
    dispatch(toggleComponentHidden({ isHidden: !isHidden, fe_id: id }));
  };

  return (
    <LayerWrapper>
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentListWithId.map(component => {
          const { fe_id, title, isHidden, isLocked } = component;

          return (
            <SortableItem key={fe_id} id={fe_id || ''}>
              <LayerItem onClick={e => handleTitleClick(fe_id || '')}>
                {fe_id === changingTitleId ? (
                  <Input
                    value={title}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                    onChange={e => handleChangeTitle(e)}
                  />
                ) : (
                  <div>{title}</div>
                )}
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={e => showComponentLocked(e, fe_id || '')}
                    style={{ opacity: isLocked ? 1 : 0.2 }}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={e => cancelComponentHidden(e, fe_id || '', isHidden || false)}
                    style={{ opacity: isHidden ? 1 : 0.2 }}
                  />
                </Space>
              </LayerItem>
            </SortableItem>
          );
        })}
      </SortableContainer>
    </LayerWrapper>
  );
};

export default Layer;
