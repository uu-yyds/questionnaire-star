import { useGetPageInfo } from '../../hooks';
import React, { useEffect } from 'react';
import { Form } from 'antd';
import { formRender } from '../../components/Common/FormRender';
import { PageSettingConfig } from './PageSettingConfig';
import { updatePageInfo } from '../../stores/pageInfo_reducers';
import { useDispatch } from 'react-redux';
import { PageInfo } from '../../types/QuestionPage';

const PageSetting = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  const handleValuesChange = (changedFields: Partial<PageInfo>, allFields: PageInfo) => {
    dispatch(updatePageInfo(allFields));
  };

  return (
    <Form
      initialValues={pageInfo}
      form={form}
      onValuesChange={handleValuesChange}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
    >
      {formRender(PageSettingConfig())}
    </Form>
  );
};

export default PageSetting;
