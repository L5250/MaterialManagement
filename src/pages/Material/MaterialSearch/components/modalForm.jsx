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
  Table,
  Select,
  Space,
  Image,
  InputNumber,
} from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const itemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const eleLayout = {
  labelCol: { span: 11 },
  wrapperCol: { span: 13 },
};
const eleItemLayout = {
  wrapperCol: { span: 24 },
};
const ModalForm = ({ visible, onCreate, onCancel, cRef, ...props }) => {
  const [form] = Form.useForm();

  const { dispatch, loading, types, scenes } = props;
  useEffect(() => {
    props.dispatch({
      type: 'materialSearch/setState',
      params: { formRef: form },
    });
  }, []);

  console.log(form.getFieldValue('ele1'));
  return (
    <Modal
      confirmLoading={loading && loading.models.materialSearch}
      forceRender
      centered
      width={760}
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
      <Form form={form} {...layout} name="materialSearch" initialValues={{ searchType: 1 }}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="keyWords" label="关键字" {...itemLayout}>
              <Input placeholder="请输入常用名/英文名/CAS号关键字模糊查询" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="chemical" label="分子式" {...itemLayout}>
              <Input placeholder="请输入分子式" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="stBoil" label="沸点范围">
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}℃`}
                parser={(value) => value.replace('℃', '')}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="edBoil" label="至">
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}℃`}
                parser={(value) => value.replace('℃', '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="stMel" label="熔点范围">
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}℃`}
                parser={(value) => value.replace('℃', '')}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="edMel" label="至">
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}℃`}
                parser={(value) => value.replace('℃', '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="stFla" label="闪点范围">
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}℃`}
                parser={(value) => value.replace('℃', '')}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="edFla" label="至">
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}℃`}
                parser={(value) => value.replace('℃', '')}
              />
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item name="ele1" label="所含元素" {...eleLayout}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="ele2"
              {...eleItemLayout}
              label=""
              dependencies={['ele1']}
              // rules={[
              //   ({ getFieldValue }) => ({
              //     validator(_, value) {
              //       if (!value || getFieldValue('ele1') === value) {
              //         return Promise.resolve();
              //       }
              //       return Promise.reject('The two passwords that you entered do not match!');
              //     },
              //   }),
              // ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="ele3" {...eleItemLayout} label="">
              <Input />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="ele4" {...eleItemLayout} label="">
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="searchType" label="查询关系" {...itemLayout}>
              <Radio.Group>
                <Radio value={1}>And</Radio>
                <Radio value={2}>Or</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="scenes" label="应用场景" {...itemLayout}>
              <Select placeholder="请选择应用场景">
                {scenes.map((item) => {
                  return (
                    <Option key={item.DictItemId} value={item.DictItemId}>
                      {item.DictItemName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="types" label="材料自愈类型" {...itemLayout}>
              <Select placeholder="请选择材料自愈类型">
                {types.map((item) => {
                  return (
                    <Option key={item.DictItemId} value={item.DictItemId}>
                      {item.DictItemName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default connect(({ materialSearch, loading }) => ({ ...materialSearch, loading }))(
  ModalForm,
);
