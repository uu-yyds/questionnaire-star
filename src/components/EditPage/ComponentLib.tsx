import React, { useCallback } from 'react';
import { componentConfGroup } from '../QuestionComponents/config';
import { Typography } from 'antd';
import { LeftPanelWrapper, DisabledComponentWrapper } from '../../styles/EditPage/LeftPanel.styles';
import { ComponentConfigType } from '../../types/QuestionComponents';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../stores/components_reducer';
import { DisabledWrapper } from '../../styles/EditPage/EditCanvas.styles';

const { Title } = Typography;

const ComponentLib = () => {
  const dispatch = useDispatch();

  const genComponent = useCallback((config: ComponentConfigType) => {
    const { title, type, component: Component, props } = config;

    const handleAddComponent = () => {
      dispatch(
        addComponent({
          title,
          type,
          props,
        })
      );
    };

    return Component ? (
      <LeftPanelWrapper onClick={() => handleAddComponent()} key={type}>
        <DisabledWrapper>
          <Component title={title} {...props} />
        </DisabledWrapper>
      </LeftPanelWrapper>
    ) : null;
  }, []);

  return (
    <>
      {componentConfGroup.map(group => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginBottom: '10px' }}>
              {groupName}
            </Title>
            <>
              {components.map(component => {
                return genComponent(component);
              })}
            </>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
