import React, { useEffect, useState } from 'react';
import { Question } from '../../types/QuestionPage';
import { QuestionPageContainer, QuestionPageTitle } from '../../styles/QuestionPage';
import { Typography, Input, Empty, Table, Space, Button, Tag, Modal } from 'antd';
import type { TableColumnsType } from 'antd';
import type { Key } from 'antd/es/table/interface';
import ListSearch from '../../components/Common/ListSearch';

const TrashPage = () => {
  const [questionsList, setQuestionsList] = useState<Question[]>();
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const newQuestionsList: Question[] = [
    {
      id: 'q1',
      title: '问卷一',
      isPublished: false,
      createdAt: '2025-01-01',
      isStar: false,
      answerCount: Math.floor(Math.random() * 100),
    },
    {
      id: 'q2',
      title: '问卷二',
      isPublished: true,
      createdAt: '2025-01-02',
      isStar: false,
      answerCount: Math.floor(Math.random() * 100),
    },
    {
      id: 'q3',
      title: '问卷三',
      isPublished: true,
      createdAt: '2025-01-03',
      isStar: false,
      answerCount: Math.floor(Math.random() * 100),
    },
    {
      id: 'q4',
      title: '问卷四',
      isPublished: false,
      createdAt: '2025-01-04',
      isStar: false,
      answerCount: Math.floor(Math.random() * 100),
    },
  ];

  const columns: TableColumnsType<Question> = [
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
      render: (_: string, record: Question) => (
        <Space>
          <Button onClick={() => handleRestore(record.id)}>恢复</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setQuestionsList(newQuestionsList);
  }, []);

  const handleSelectChange = (selectedRowKeys: Key[], selectedRows: Question[]) => {
    console.log(selectedRowKeys, selectedRows);
    setSelectedQuestions(selectedRows);
  };

  const handleDelete = (id: string | string[]) => {
    console.log('删除', id);
    Modal.confirm({
      title: '确定要删除吗？',
      content: '删除后将无法恢复',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setQuestionsList(questionsList?.filter(q => !id.includes(q.id)));
      },
    });
  };

  const handleRestore = (id: string | string[]) => {
    console.log('恢复', id);
    setQuestionsList(questionsList?.map(q => (q.id === id ? { ...q, isPublished: true } : q)));
  };

  return (
    <QuestionPageContainer>
      <QuestionPageTitle>
        <Typography.Title level={4}>回收站</Typography.Title>
        <ListSearch />
      </QuestionPageTitle>
      {questionsList?.length ? (
        <>
          <Space style={{ marginBottom: 20 }}>
            <Button
              type="primary"
              disabled={selectedQuestions.length === 0}
              onClick={() => handleRestore(selectedQuestions.map(q => q.id))}
            >
              批量恢复
            </Button>
            <Button
              danger
              disabled={selectedQuestions.length === 0}
              onClick={() => handleDelete(selectedQuestions.map(q => q.id))}
            >
              批量删除
            </Button>
          </Space>
          <Table
            dataSource={questionsList}
            columns={columns}
            pagination={false}
            rowKey={q => q.id}
            rowSelection={{
              type: 'checkbox',
              onChange: handleSelectChange,
              getCheckboxProps: (record: Question) => ({
                disabled: record.isPublished,
              }),
            }}
          />
        </>
      ) : (
        <Empty description="暂无回收站问卷" />
      )}
    </QuestionPageContainer>
  );
};

export default TrashPage;
