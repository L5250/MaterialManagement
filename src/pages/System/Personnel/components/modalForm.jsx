import React, { useState, useImperativeHandle, useEffect, useRef } from 'react';
import { connect } from 'umi';
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Row,
  Col,
  Upload,
  message,
  Select,
  Checkbox,
  Switch,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const layoutSingle = {
  labelCol: { span: 16 },
};
const { Option } = Select;
const { Search } = Input;
const ModalForm = ({ visible, onCreate, onCancel, cRef, ...props }) => {
  const [form] = Form.useForm();

  const { loading, rowData } = props;

  useEffect(() => {
    props.dispatch({
      type: 'personnel/setState',
      params: { formRef: form },
    });
  }, []);

  const reset = () => {
    form.setFieldsValue({ PassWord: '123456' });
  };

  return (
    <Modal
      confirmLoading={loading && loading.global}
      forceRender
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
      <Form
        form={form}
        {...layout}
        name="personnel"
        initialValues={{ IsAdmin: false, IsValid: true }}
      >
        <Form.Item
          name="UserCode"
          label="用户名"
          rules={[
            {
              required: true,
              message: '用户名为必填项！',
            },
          ]}
        >
          <Input placeholder="请输入用户名" disabled={rowData.UserCode === 'admin'} />
        </Form.Item>

        <Form.Item
          name="PassWord"
          label="密码"
          rules={[
            {
              required: true,
              message: '密码为必填项！',
            },
          ]}
        >
          <Search placeholder="请输入密码" enterButton="重置" onSearch={reset} />
        </Form.Item>

        <Form.Item
          name="UserName"
          label="用户姓名"
          rules={[
            {
              required: true,
              message: '用户姓名为必填项！',
            },
          ]}
        >
          <Input placeholder="请输入用户姓名" disabled={rowData.UserCode === 'admin'} />
        </Form.Item>

        <Form.Item name="UserTel" label="联系电话">
          <Input placeholder="请输入联系电话" />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item {...layoutSingle} name="IsAdmin" label="是否管理员" valuePropName="checked">
              <Switch disabled={rowData.UserCode === 'admin'} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item {...layoutSingle} name="IsValid" label="是否启用" valuePropName="checked">
              <Switch disabled={rowData.UserCode === 'admin'} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default connect(({ personnel, loading }) => ({ ...personnel, loading }))(ModalForm);
