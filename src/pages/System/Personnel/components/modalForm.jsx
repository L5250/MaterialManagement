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

  const { loading } = props;

  useEffect(() => {
    props.dispatch({
      type: 'personnel/setState',
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

  const addType = () => {
    console.log(122);
  };
  const reset = () => {
    form.setFieldsValue({ psw: '' });
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
        form={form}
        {...layout}
        name="personnel"
      // initialValues={props.formData}
      >
        <Form.Item
          name="name"
          label="用户名"
          rules={[
            {
              required: true,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="placeholder" />
        </Form.Item>

        <Form.Item
          name="psw"
          label="密码"
          rules={[
            {
              required: true,
              message: 'Input something!',
            },
          ]}
        >
          <Search placeholder="placeholder" enterButton="重置" onSearch={reset} />
        </Form.Item>

        <Form.Item name="address" label="用户姓名">
          <Input placeholder="placeholder" />
        </Form.Item>

        <Form.Item name="address" label="联系电话">
          <Input placeholder="placeholder" />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item {...layoutSingle} name="isadmin" label="是否管理员">
              <Checkbox />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item {...layoutSingle} name="address" label="是否启用">
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default connect(({ personnel, loading }) => ({ ...personnel, loading }))(ModalForm);
