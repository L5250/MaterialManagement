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
const ModalForm = ({ visible, onCreate, onCancel, cRef, ...props }) => {
  const [form] = Form.useForm();

  const imageUrl = form.getFieldValue('image');

  useEffect(() => {
    props.dispatch({
      type: 'materialManager/setState',
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
      width={760}
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
        name="materialManager"
        // initialValues={props.formData}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="常用名"
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="英文名">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="key" label="CAS号">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="分子量">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="密度">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="沸点">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="分子式">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="熔点">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="闪点">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="信号词">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item {...layoutSingle} name="asd" label="MSDN">
              <Radio.Group>
                <Radio value={1}>中文版</Radio>
                <Radio value={2}>美版</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item {...layoutSingle} name="image" label="上传文件">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                // onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="相关文献">
              <Button type="primary">查看/添加</Button>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="应用实例" label="应用实例">
              <Button type="primary">查看/添加</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default connect(({ materialManager, loading }) => ({ ...materialManager, loading }))(
  ModalForm,
);
