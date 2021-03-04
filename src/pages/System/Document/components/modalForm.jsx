import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Form, Input, InputNumber, Checkbox, DatePicker } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { TextArea } = Input;

const ModalForm = ({ visible, onCreate, onCancel, cRef, ...props }) => {
  const [form] = Form.useForm();
  const { loading } = props;
  useEffect(() => {
    props.dispatch({
      type: 'document/setState',
      params: { formRef: form },
    });
  }, []);

  return (
    <Modal
      confirmLoading={loading && loading.models.document}
      forceRender
      centered
      width={460}
      visible={visible}
      title={props.title}
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          onCreate(values);
        });
      }}
    >
      <Form name={'liter'} form={form} {...layout} initialValues={{ IsValid: 1 }}>
        <Form.Item
          name="LiterCode"
          label="DOI号"
          rules={[
            {
              required: true,
              message: 'DOI号为必填项！',
            },
          ]}
        >
          <Input placeholder="请输入DOI号" />
        </Form.Item>
        <Form.Item
          name="LiterYear"
          label="文献年份"
          rules={[
            {
              required: true,
              message: '文献年份为必填项！',
            },
          ]}
        >
          <DatePicker
            picker="year"
            style={{ width: '100%' }}
            placeholder="请选择文献年份"
            format={'YYYY'}
          />
        </Form.Item>
        <Form.Item
          name="LiterName"
          label="文献名称"
          rules={[
            {
              required: true,
              message: '文献名称为必填项！',
            },
          ]}
        >
          <TextArea
            placeholder="请输入文献名称"
            autoSize={{ minRows: 6, maxRows: 10 }}
            maxLength={500}
          />
        </Form.Item>

        <Form.Item name="IsValid" label="是否有效" valuePropName="checked">
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(({ document, loading }) => ({ ...document, loading }))(ModalForm);
