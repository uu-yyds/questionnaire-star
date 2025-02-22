import React, { useState } from 'react';
import { ComponentContainer, ComponentWrapper, DisabledWrapper } from '../../styles/StatPage';
import { useSelector, useDispatch } from 'react-redux';
import { StoreStateType } from '../../stores';
import { ComponentsState, changeSelectedId } from '../../stores/components_reducer';
import { Component } from '../../types/QuestionPage';
import { getComponentConfigByType } from '../../components/QuestionComponents/config';

type ComponentListProps = {
  selectedId: string;
  setSelectedId: (id: string) => void;
  setComponentType: (type: string) => void;
};

const ComponentList = (props: ComponentListProps) => {
  const { componentList } = useSelector<StoreStateType, ComponentsState>(
    state => state.components.present
  );
  const { selectedId, setSelectedId, setComponentType } = props;

  const handleClick = (id: string, type: string) => {
    setSelectedId(id);
    setComponentType(type);
    console.log(id, type);
  };

  return (
    <ComponentContainer>
      {componentList.map((component: Component) => {
        const { fe_id, props, type } = component;

        const componentConfig = getComponentConfigByType(type);
        if (!componentConfig) return null;

        const { component: Component } = componentConfig;

        return (
          <ComponentWrapper
            key={fe_id}
            className={selectedId === fe_id ? 'selected' : ''}
            onClick={() => handleClick(fe_id || '', type || '')}
          >
            <DisabledWrapper>
              <Component {...props} />
            </DisabledWrapper>
          </ComponentWrapper>
        );
      })}
    </ComponentContainer>
  );
};

export default ComponentList;
