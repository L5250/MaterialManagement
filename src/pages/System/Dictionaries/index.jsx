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
  Checkbox,
  Form,
} from 'antd';
import { connect } from 'umi';
import ProCard from '@ant-design/pro-card';
import { } from '@ant-design/icons';
import ModalForm from './components/modalForm';
import ModalFormDicItem from './components/modalFormItem';

const { Search } = Input;
const { Header, Content } = Layout;

const Dictionaries = (props) => {
  const [visible, setVisible] = useState(false);
  console.log(process.env.NODE_ENV, 'eeee');
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };
  const add = () => {
    props.formRef.resetFields();
    props.dispatch({
      type: 'dictionaries/setState',
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
      type: 'dictionaries/setState',
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
  const resetPassword = () => {
    console.log('resetPsw');
  };

  const onSearch = (value) => {
    console.log(value);
    props
      .dispatch({
        type: 'dictionaries/text',
      })
      .then((res) => {
        console.log(res);
      });
  };

  // 表格列
  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'ListOrder',
      width: 120,
    },
    {
      title: '分类名称',
      align: 'center',
      dataIndex: 'DictSortName',
    },
    {
      title: '分类项编码',
      align: 'center',
      dataIndex: 'DictSortCode',
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'Remark',
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: '',
      fixed: "right",
      width: 200,
      render: (record) => (
        <Space size="middle">
          <a onClick={() => edit(record)}>编辑</a>
          <a onClick={() => deleteItem(record)}>删除</a>
        </Space>
      ),
    },
  ];

  const dicItemColumns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'ListOrder',
      width: 120,
    },
    {
      title: '字典名称',
      align: 'center',
      dataIndex: 'DictItemName',
    },
    {
      title: '字典编码',
      align: 'center',
      dataIndex: 'DictItemCode',
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'Remark',
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: '',
      fixed: "right",
      width: 200,
      render: (record) => (
        <Space size="middle">
          <a onClick={() => edit(record)}>编辑</a>
          <a onClick={() => deleteItem(record)}>删除</a>
        </Space>
      ),
    },

  ]

  return (
    <PageContainer
    // header={{
    //   extra: [
    //     <Checkbox key="3">显示禁用的用户</Checkbox>,
    //     <Search
    //       key="1"
    //       placeholder={'输入用户名或用户姓名查询'}
    //       allowClear
    //       enterButton
    //       style={{ width: 300 }}
    //       onSearch={onSearch}
    //     />,
    //     <Button onClick={add} key="2" type="primary">
    //       新增
    //     </Button>,
    //   ],
    // }}
    >
      {/* <Table
        columns={columns}
        dataSource={props.data}
        rowKey="name"
        scroll={{ y: 'calc(100vh - 320px)' }}
      /> */}
      <Layout>
        <Row gutter={24}>
          <Col span={12}>
            <Layout>
              <Header style={{ marginBottom: 10 }}>
                <Space>
                  <Search
                    placeholder={'输入用户名或用户姓名查询'}
                    allowClear
                    enterButton
                    style={{ width: 300 }}
                    onSearch={onSearch}
                  />
                  <Button style={{ textAlign: "right" }} onClick={add} key="2" type="primary">新增</Button>
                </Space>
              </Header>
              <Content>
                <Table
                  columns={columns}
                  dataSource={props.data}
                  rowKey="DictSortId"
                  pagination={false}
                  scroll={{ x: 800, y: 'calc(100vh - 300px)' }}

                />
              </Content>
            </Layout>
          </Col>
          <Col span={12}>
            <Layout>
              <Header style={{ marginBottom: 10 }}>
                <Space>
                  <Search
                    placeholder={'输入用户名或用户姓名查询'}
                    allowClear
                    enterButton
                    style={{ width: 300 }}
                    onSearch={onSearch}
                  />
                  <Button style={{ textAlign: "right" }} onClick={add} key="2" type="primary">新增</Button>
                </Space>
              </Header>
              <Content>
                <Table
                  columns={dicItemColumns}
                  dataSource={props.data}
                  rowKey="DictItemId"
                  pagination={false}
                  scroll={{ x: 800, y: 'calc(100vh - 300px)' }}

                />
              </Content>
            </Layout>
          </Col>
        </Row>
      </Layout>
      <ModalForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
       <ModalFormDicItem
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </PageContainer>

  );
};
export default connect(({ dictionaries, loading }) => ({ ...dictionaries, loading }))(Dictionaries);
