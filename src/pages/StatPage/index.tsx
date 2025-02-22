import React, { useState } from 'react';
import { useLoading } from '../../hooks';
import { Spin, Result } from 'antd';
import { useGetPageInfo } from '../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';
import { StatContainer, StatContentWrapper, StatContent } from '../../styles/StatPage';
import StatHeader from '../../components/StatPage/StatHeader';
import ComponentList from '../../components/StatPage/ComponentList';
import StatList from '../../components/StatPage/StatList';
import ChartStat from '../../components/StatPage/ChartStat';

const StatPage = () => {
  const { loading, question } = useLoading();
  const pageInfo = useGetPageInfo();
  const { title, isPublished } = pageInfo || {};
  useTitle(`${title} - 问卷统计`);
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedComponentType, setSelectedComponentType] = useState<string>('');

  const setComponentType = (type: string) => {
    setSelectedComponentType(type);
  };

  return (
    <Spin spinning={loading}>
      {isPublished ? (
        <StatContainer>
          <StatHeader />
          <StatContentWrapper>
            <StatContent>
              <div className="left">
                <ComponentList
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  setComponentType={setComponentType}
                />
              </div>
              <div className="main">
                <StatList
                  componentId={selectedId}
                  setComponentId={setSelectedId}
                  componentType={selectedComponentType}
                />
              </div>
              <div className="right">
                <ChartStat componentId={selectedId} componentType={selectedComponentType} />
              </div>
            </StatContent>
          </StatContentWrapper>
        </StatContainer>
      ) : (
        <Result status="404" title="404" subTitle="问卷未发布" />
      )}
    </Spin>
  );
};

export default StatPage;
