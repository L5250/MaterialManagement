import React, { useState, useImperativeHandle, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Button, Modal, Form, Input, Radio, Row, Col, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const layoutSingle = {
  labelCol: { span: 4 },
};

const { TextArea } = Input;

const ModalForm = ({ visible, onCreate, onCancel, cRef, ...props }) => {
  const [form] = Form.useForm();

  const imageUrl = form.getFieldValue('image');

  useEffect(() => {
    props.dispatch({
      type: 'document/setState',
      params: { formRef: form },
    });
  }, []);
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      {props.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Modal
      forceRender
      width={460}
      visible={visible}
      title={props.title}
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        name={'liter'}
        form={form}
        {...layout}
        // initialValues={props.formData}
      >
        <Form.Item
          name="LiterCode"
          label="DOI号"
          rules={[
            {
              required: true,
              message: '请输入DOI号',
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
              message: '请输入文献年份',
            },
          ]}
        >
          <Input placeholder="请输入文献年份" />
        </Form.Item>
        <Form.Item
          name="LiterName"
          label="文献名称"
          rules={[
            {
              required: true,
              message: '请输入文献名称',
            },
          ]}
        >
          <TextArea placeholder="请输入文献名称" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(({ document, loading }) => ({ ...document, loading }))(ModalForm);
