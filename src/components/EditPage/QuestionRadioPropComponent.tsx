import React from 'react';
import {
  QuestionRadioPropsType,
  QuestionRadioOptionType,
} from '../../types/QuestionComponents/question_radio';
import { Form, Input, Select, Button, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

const QuestionRadioPropComponent = (props: QuestionRadioPropsType) => {
  const { options } = props;

  const labelColObj = {
    span: 8,
    offset: 0,
  };
  const wrapperColObj = {
    span: 16,
    offset: 0,
  };

  return (
    <>
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入单选标题' }]}
        labelCol={labelColObj}
        wrapperCol={wrapperColObj}
      >
        <Input placeholder="请输入单选标题" />
      </Form.Item>
      <Form.Item label="默认选项" name="value" labelCol={labelColObj} wrapperCol={wrapperColObj}>
        <Select options={options} placeholder="请选择" />
      </Form.Item>
      <Form.Item
        name="isVertical"
        label="排列方向"
        labelCol={labelColObj}
        wrapperCol={wrapperColObj}
      >
        <Select
          options={[
            { label: '水平', value: false },
            { label: '垂直', value: true },
          ]}
        />
      </Form.Item>
      <Form.Item name="options" label="选项" labelCol={labelColObj} wrapperCol={wrapperColObj}>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    name={[name, 'label']}
                    rules={[
                      { required: true, message: '请输入选项' },
                      {
                        validator: (_, text) => {
                          let count = 0;
                          options?.forEach((option: QuestionRadioOptionType) => {
                            if (option.label === text) {
                              count++;
                            }
                          });
                          if (count > 1) {
                            return Promise.reject(new Error('选项不能重复'));
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="请输入选项" />
                  </Form.Item>
                  {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ label: '', value: nanoid() })}
                  block
                  icon={<PlusOutlined />}
                  disabled={fields.length >= 4}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    </>
  );
};

export default QuestionRadioPropComponent;
