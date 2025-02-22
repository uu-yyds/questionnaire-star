import React, { useEffect, useState } from 'react';
import { QuestionInfo } from '../../types/QuestionPage';
import { QuestionPageContainer, QuestionPageTitle } from '../../styles/QuestionPage';
import { Typography, Empty, Table, Space, Button, Tag, Modal, Spin, message } from 'antd';
import type { TableColumnsType } from 'antd';
import type { Key } from 'antd/es/table/interface';
import ListSearch from '../../components/Common/ListSearch';
import { useLoadingList } from '../../hooks/useLoadingList';
import ListPagination from '../../components/Common/ListPagination';
import { deleteQuestion, deleteQuestionList, updateQuestion } from '../../services/question';
import { useTitle } from 'ahooks';

const TrashPage = () => {
  useTitle('回收站');
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionInfo[]>([]);
  const {
    list: questionsList,
    total,
    loading,
    fetchQuestionList,
  } = useLoadingList({
    isDeleted: true,
  });

  useEffect(() => {
    try {
      fetchQuestionList();
    } catch (error: any) {
      message.error('获取回收站问卷失败');
    }
  }, []);

  const columns: TableColumnsType<QuestionInfo> = [
    {
      title: '问卷标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? <Tag color="success">已发布</Tag> : <Tag color="error">未发布</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '回答数量',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      fixed: 'right',
      render: (_: string, record: QuestionInfo) => (
        <Space>
          <Button onClick={() => handleRestore(record._id)}>恢复</Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleSelectChange = (selectedRowKeys: Key[], selectedRows: QuestionInfo[]) => {
    setSelectedQuestions(selectedRows);
  };

  const handleDelete = (id: string | string[]) => {
    Modal.confirm({
      title: '确定要彻底删除吗？',
      content: '删除后将无法恢复',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        if (Array.isArray(id)) {
          await deleteQuestionList(id);
        } else {
          await deleteQuestion(id as string);
        }
        message.success('永久删除成功');
        fetchQuestionList();
      },
    });
  };

  const handleRestore = (id: string | string[]) => {
    Modal.confirm({
      title: '确定要恢复吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        if (Array.isArray(id)) {
          id.forEach(async id => {
            await updateQuestion(id, { isDeleted: false });
          });
        } else {
          await updateQuestion(id as string, { isDeleted: false });
        }
        message.success('恢复成功');
        fetchQuestionList();
      },
    });
  };

  return (
    <QuestionPageContainer>
      <QuestionPageTitle>
        <Typography.Title level={4}>回收站</Typography.Title>
        <ListSearch />
      </QuestionPageTitle>
      <Spin spinning={loading}>
        {questionsList?.length ? (
          <>
            <Space style={{ marginBottom: 20 }}>
              <Button
                type="primary"
                disabled={selectedQuestions.length === 0}
                onClick={() => handleRestore(selectedQuestions.map(q => q._id))}
              >
                批量恢复
              </Button>
              <Button
                danger
                disabled={selectedQuestions.length === 0}
                onClick={() => handleDelete(selectedQuestions.map(q => q._id))}
              >
                批量删除
              </Button>
            </Space>
            <Table
              dataSource={questionsList}
              columns={columns}
              pagination={false}
              rowKey={q => q._id}
              rowSelection={{
                type: 'checkbox',
                onChange: handleSelectChange,
                getCheckboxProps: (record: QuestionInfo) => ({
                  disabled: record.isPublished,
                }),
              }}
            />
            <ListPagination total={total} />
          </>
        ) : (
          <Empty description="暂无回收站问卷" />
        )}
      </Spin>
    </QuestionPageContainer>
  );
};

export default TrashPage;
