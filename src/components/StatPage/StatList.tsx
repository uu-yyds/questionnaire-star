import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getAnswerList } from '../../services/answer';
import { answerInfoType, answerListType, answerItemType } from '../../types/Stat';
import { message, Spin, Table, Typography, Space } from 'antd';
import { useRequest } from 'ahooks';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../../stores';
import { ComponentsState } from '../../stores/components_reducer';

const StatList = (props: {
  componentId: string;
  setComponentId: (id: string) => void;
  componentType: string;
}) => {
  const { componentId, setComponentId, componentType } = props;
  const { id } = useParams();
  const [answerList, setAnswerList] = useState<answerItemType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagination, setPagination] = useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 10,
  });
  const { componentList } = useSelector<StoreStateType, ComponentsState>(
    state => state.components.present
  );

  const { run: getAnswerListData, loading } = useRequest(
    async (id: string, pagination: { page: number; pageSize: number }) => {
      try {
        const res =
          (await getAnswerList(id, {
            ...pagination,
          })) || [];
        const { list, count } = res;
        setAnswerList(list || []);
        setTotal(count || 0);
      } catch (error: any) {
        message.error(error?.data?.message || '获取答卷列表失败');
      }
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    getAnswerListData(id || '', pagination);
  }, [id]);

  const columns = Object.keys(answerList[0] || {})
    .filter(key => key !== 'id')
    .map(key => ({
      title: (
        <div
          style={{ color: componentId === key ? '#1890ff' : '#000', cursor: 'pointer' }}
          onClick={() => setComponentId(key)}
        >
          {componentList.find(item => item?.fe_id === key)?.props?.title}
        </div>
      ),
      dataIndex: key,
    }));

  return (
    <Spin spinning={loading}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Title
          style={{
            margin: '20px 0',
            fontSize: 20,
          }}
        >
          <span
            style={{
              border: '1px solid #f0f0f0',
              padding: 10,
              borderRadius: 4,
              backgroundColor: '#f0f0f0',
              cursor: 'pointer',
            }}
          >
            答卷数量：{total}
          </span>
        </Typography.Title>
        <Table
          dataSource={answerList}
          columns={columns}
          pagination={{
            position: ['bottomCenter'],
            pageSize: pagination.pageSize,
            total: total,
            current: pagination.page,
            onChange: (page, pageSize) => {
              setPagination({ page, pageSize });
              getAnswerListData(id || '', { page, pageSize });
            },
          }}
          rowKey={record => record.id}
        />
      </Space>
    </Spin>
  );
};

export default StatList;
