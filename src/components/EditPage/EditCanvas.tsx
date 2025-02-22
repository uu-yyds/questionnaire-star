import React, { MouseEvent, useEffect, useMemo } from 'react';
import {
  EditCanvasWrapper,
  ComponentWrapper,
  DisabledWrapper,
} from '../../styles/EditPage/EditCanvas.styles';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { changeSelectedId } from '../../stores/components_reducer';
import { getComponentConfigByType } from '../QuestionComponents/config';
import type { Component } from '@/types/QuestionPage';
import classNames from 'classnames';
import { useBindCanvasKeyPress } from '../../hooks/useBindCanvasKeyPress';
import SortableContainer from '../DragSortable/SortableContainer';
import SortableItem from '../DragSortable/SortableItem';
import { dragSortComponent } from '../../stores/components_reducer';
import { StoreStateType } from '../../stores';

const EditCanvas = ({ loading }: { loading: boolean }) => {
  const dispatch = useDispatch();
  useBindCanvasKeyPress();
  const componentList = useSelector<StoreStateType, Component[]>(
    (state: StoreStateType) => state.components.present.componentList
  );
  const selectedId = useSelector<StoreStateType, string>(
    (state: StoreStateType) => state.components.present.selectedId || ''
  );
  const componentListWithId = useMemo(
    () => componentList.map(component => ({ id: component.fe_id || '', ...component })),
    [componentList]
  );
  const handleClickComponent = (e: MouseEvent, fe_id: string) => {
    e.stopPropagation(); // 阻止冒泡
    dispatch(changeSelectedId(fe_id));
  };
  const generateComponent = (component: Component) => {
    const { type, props } = component;
    const config = getComponentConfigByType(type);
    if (!config) return null;
    const { component: Component, props: componentProps } = config;
    return <Component {...componentProps} {...props} />;
  };

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(dragSortComponent({ oldIndex, newIndex }));
  };

  useEffect(() => {
    // 默认选中第一个组件
    if (componentList.length > 0) {
      dispatch(changeSelectedId(componentList[0].fe_id || ''));
    }
  }, []);

  return (
    <Spin spinning={loading}>
      <EditCanvasWrapper>
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
          {componentListWithId
            ?.filter(component => !component.isHidden)
            ?.map(component => {
              const { fe_id, isLocked } = component;
              return (
                <SortableItem id={fe_id || ''} key={fe_id}>
                  <ComponentWrapper
                    onClick={e => handleClickComponent(e, fe_id || '')}
                    className={classNames({
                      selected: selectedId === fe_id,
                      locked: isLocked,
                    })}
                  >
                    <DisabledWrapper>{generateComponent(component)}</DisabledWrapper>
                  </ComponentWrapper>
                </SortableItem>
              );
            })}
        </SortableContainer>
      </EditCanvasWrapper>
    </Spin>
  );
};

export default EditCanvas;
