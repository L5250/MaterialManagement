import React, { useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Alert,
  Typography,
  Table,
  Space,
  Row,
  Col,
  Layout,
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
  Input,
  Form,
} from 'antd';
import { connect } from 'umi';
import ProCard from '@ant-design/pro-card';
import {} from '@ant-design/icons';

import ModalForm from './components/modalForm';

const { Content } = Layout;
const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const MaterialEnter = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [formData, setformData] = useState({});

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };
  const add = () => {
    form.setFieldsValue({});
    setVisible(true);
  };

  const edit = (record) => {
    form.setFieldsValue({ name: 2222 });
    setVisible(true);
  };
  const deleteItem = () => {
    Modal.confirm({
      title: '111',
    });
  };
  const columns = [
    {
      title: 'CAS号',
      dataIndex: 'a',
    },
    {
      title: '常用名',
      dataIndex: 'b',
    },
    {
      title: '英文名',
      dataIndex: 'v',
    },
    {
      title: '分子式',
      dataIndex: 'c',
    },
    {
      title: '分子量',
      dataIndex: 'd',
    },
    {
      title: '密度',
      dataIndex: 'e',
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      render: (record) => (
        <Space size="middle">
          {/* <Button title="编辑" icon={<EditOutlined />} type="primary" />
          <Button title="删除" icon={<DeleteOutlined />} type="danger" /> */}
          <a onClick={() => edit(record)}>编辑</a>
          <a onClick={() => deleteItem(record)}>删除</a>
        </Space>
      ),
    },
  ];

  console.log(props, 'props');
  return (
    <PageContainer
      header={{
        extra: [
          <Search key="1" allowClear enterButton style={{ width: 300 }} />,
          <Button onClick={add} key="2" type="primary">
            新增
          </Button>,
        ],
      }}
    >
      <ProCard direction="column" ghost>
        <Table columns={columns} dataSource={props.data} />
      </ProCard>
      {/* <ModalFormSet
        visible={visible}
        onCreate={onCreate}
        setModalVisit={(params) => {
          setVisible(params);
        }}
      /> */}

      <Modal
        visible={false}
        onCancel={() => setVisible(false)}
        width={760}
        title="新增"
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

      <ModalForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default connect(({ materialEnter, loading }) => ({ ...materialEnter, loading }))(
  MaterialEnter,
);
