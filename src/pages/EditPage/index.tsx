import React, { useEffect } from 'react';
import { useTitle } from 'ahooks';
import { Spin } from 'antd';
import { useLoading } from '../../hooks';
import { EditPageWrapper, Content } from '../../styles/EditPage';
import EditCanvas from '../../components/EditPage/EditCanvas';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../stores/components_reducer';
import LeftPanel from '../../components/EditPage/LeftPanel';
import RightPanel from '../../components/EditPage/RightPanel';
import EditHeader from '../../components/EditPage/EditHeader';
import { useGetPageInfo } from '../../hooks';

const EditPage = () => {
  const { loading, question } = useLoading();
  const pageInfo = useGetPageInfo();
  const { title: questionTitle } = question || {};
  const { title } = pageInfo || {};
  const dispatch = useDispatch();
  useTitle(`${title || questionTitle || '问卷调查'} - 问卷编辑`);

  return (
    <Spin spinning={loading}>
      <EditPageWrapper>
        <div className="header">
          <EditHeader />
        </div>
        <div className="contentWrapper">
          <Content>
            <div className="left">
              <LeftPanel />
            </div>
            <div className="center" onClick={() => dispatch(changeSelectedId(''))}>
              <div className="centerWrapper">
                <EditCanvas loading={loading} />
              </div>
            </div>
            <div className="right">
              <RightPanel />
            </div>
          </Content>
        </div>
      </EditPageWrapper>
    </Spin>
  );
};

export default EditPage;
