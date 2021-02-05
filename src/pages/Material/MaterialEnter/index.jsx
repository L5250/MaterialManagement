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

const { Search } = Input;

const MaterialEnter = (props) => {
  const [visible, setVisible] = useState(false);
  console.log(process.env.NODE_ENV, 'eeee');
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };
  const add = () => {
    props.formRef.resetFields();
    props.dispatch({
      type: 'materialEnter/setState',
      params: {
        rowData: {},
        title: '新增自愈材料',
      },
    });
    setVisible(true);
  };

  const edit = (record) => {
    props.formRef.setFieldsValue({ ...record });
    props.dispatch({
      type: 'materialEnter/setState',
      params: {
        rowData: record,
        title: '编辑自愈材料',
      },
    });
    setVisible(true);
  };
  const deleteItem = () => {
    Modal.confirm({
      title: '提示',
      content: '确认删除自愈材料？',
      onOk: () => {
        console.log('ok');
      },
    });
  };

  const onSearch = (value) => {
    console.log(value);
    props
      .dispatch({
        type: 'materialEnter/text',
      })
      .then((res) => {
        console.log(res);
      });
  };

  // 表格列
  const columns = [
    {
      title: 'CAS号',
      align: 'center',
      dataIndex: 'a',
    },
    {
      title: '常用名',
      align: 'center',
      dataIndex: 'b',
    },
    {
      title: '英文名',
      align: 'center',
      dataIndex: 'v',
    },
    {
      title: '分子式',
      align: 'center',
      dataIndex: 'c',
    },
    {
      title: '分子量',
      align: 'center',
      dataIndex: 'd',
    },
    {
      title: '密度',
      align: 'center',
      dataIndex: 'e',
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: '',
      width: 200,
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
          <Search
            key="1"
            placeholder={'输入材料名称或DAS号查询'}
            allowClear
            enterButton
            style={{ width: 300 }}
            onSearch={onSearch}
          />,
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
        scroll={{ y: 'calc(100vh - 320px)' }}
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
export default connect(({ materialEnter, loading }) => ({ ...materialEnter, loading }))(
  MaterialEnter,
);
