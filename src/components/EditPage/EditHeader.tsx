import React, { useState, useEffect } from 'react';
import { EditHeaderWrapper, EditHeaderContent } from '../../styles/EditPage';
import { Button, Space, Typography, Input, message } from 'antd';
import { LeftOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditToolBar from './EditToolBar';
import { useGetPageInfo } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { updatePageInfo } from '../../stores/pageInfo_reducers';
import { updateQuestion } from '../../services/question';
import { ComponentsState } from '../../stores/components_reducer';
import { useParams } from 'react-router-dom';
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks';
import { StoreStateType } from '../../stores';
import type { Component } from '@/types/QuestionPage';

const { Title } = Typography;

const TitleElement = () => {
  const dispatch = useDispatch();
  const pageInfo = useGetPageInfo();
  const { title } = pageInfo || {};
  const [editState, setEditState] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.trim();
    if (!title) return;
    dispatch(updatePageInfo({ title }));
  };

  if (editState) {
    return (
      <Input
        value={title}
        onBlur={() => setEditState(false)}
        onPressEnter={() => setEditState(false)}
        onChange={handleTitleChange}
      />
    );
  }

  return (
    <Space>
      <Title level={4} style={{ marginBottom: 0 }}>
        {title}
      </Title>
      <Button type="text" icon={<EditOutlined />} onClick={() => setEditState(true)}></Button>
    </Space>
  );
};

const SaveButton = () => {
  const componentList = useSelector<StoreStateType, Component[]>(
    (state: StoreStateType) => state.components.present.componentList
  );
  const pageInfo = useGetPageInfo();
  const { id } = useParams();

  const { loading, run } = useRequest(
    async () => {
      await updateQuestion(id || '', {
        ...pageInfo,
        componentsList: componentList,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('保存成功');
      },
    }
  );

  useKeyPress(['ctrl.s', 'meta.s'], e => {
    e.preventDefault();
    if (!id) return;
    if (!loading) run();
  });

  const handleSave = () => {
    if (!id) return;
    run();
  };

  // 自动保存
  useDebounceEffect(
    () => {
      if (!id) return;
      if (!loading) run();
    },
    [componentList, pageInfo],
    { wait: 1000 }
  );

  return (
    <Button onClick={handleSave} loading={loading}>
      保存
    </Button>
  );
};

const PublishButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { componentList } = useSelector<StoreStateType, ComponentsState>(
    (state: StoreStateType) => state.components.present
  );
  const pageInfo = useGetPageInfo();

  const { loading, run: publish } = useRequest(
    async () => {
      await updateQuestion(id || '', {
        ...pageInfo,
        componentsList: componentList,
        isPublished: true,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功');
        navigate(`/question/stat/${id}`);
      },
    }
  );

  return (
    <Button type="primary" loading={loading} onClick={publish}>
      发布
    </Button>
  );
};

const EditHeader = () => {
  const navigate = useNavigate();
  return (
    <EditHeaderWrapper>
      <EditHeaderContent>
        <div className="left">
          <Space>
            <Button icon={<LeftOutlined />} type="link" onClick={() => navigate(-1)}>
              返回
            </Button>
            <TitleElement />
          </Space>
        </div>
        <div className="main">
          <EditToolBar />
        </div>
        <div className="right">
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </EditHeaderContent>
    </EditHeaderWrapper>
  );
};

export default EditHeader;
