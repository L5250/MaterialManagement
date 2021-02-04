import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, Row, Col } from 'antd';
import { connect } from 'umi';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const ModalForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
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
      <Form form={form} {...layout}>
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
            <Form.Item name="英文名" label="英文名">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="常用名" label="CAS号">
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
          <Col span={12}>
            <Form.Item name="asd" label="上传文件">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="常用名">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="name" label="ooo">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(({ materialEnter, loading }) => ({ ...materialEnter, loading }))(ModalForm);
