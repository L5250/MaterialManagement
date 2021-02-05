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
import { } from '@ant-design/icons';

import ModalForm from './components/modalForm';

const { Header, Content } = Layout;
const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const DocumentManagement = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };
  const add = () => {
    props.formRef.resetFields();
    props.dispatch({
      type: 'document/setState',
      params: {
        rowData: {},
        title: "新增自愈材料"
      },
    });
    setVisible(true);
  };

  const edit = (record) => {
    props.formRef.setFieldsValue({ ...record });
    props.dispatch({
      type: 'document/setState',
      params: {
        rowData: record,
        title: "编辑自愈材料"
      },
    });
    setVisible(true);
  };
  const deleteItem = () => {
    Modal.confirm({
      title: '提示',
      content: "确认删除自愈材料？",
      onOk: () => {
        console.log("ok");
      }
    });
  };

  const onSearch = (value) => {
    console.log(value);
  }

  // 表格列
  const columns = [
    {
      title: '序号',
      dataIndex: 'a',
      align: "center",
      width:100,
      render: (text, record, index) => {
        return index + 1
      }
    },
    {
      title: '文献年份',
      dataIndex: 'b',
      width:300,
      align: 'center',
    },
    {
      title: '文献名称',
      dataIndex: 'v',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width:200,
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

  return (
    <PageContainer
      header={{
        extra: [
          <Search key="1" placeholder={"输入文献名称查询"} allowClear enterButton style={{ width: 300 }} onSearch={onSearch} />,
          <Button onClick={add} key="2" type="primary">
            新增
          </Button>,
        ],
      }}
    >

      <Table
        columns={columns}
        dataSource={props.data}
        rowKey="name"
        scroll={{ y: "calc(100vh - 320px)" }}
      />
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
export default connect(({ document, loading }) => ({ ...document, loading }))(
  DocumentManagement,
);
