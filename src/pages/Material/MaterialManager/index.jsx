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
  Checkbox
} from 'antd';
import { connect } from 'umi';
import ProCard from '@ant-design/pro-card';
import { } from '@ant-design/icons';
import ModalForm from './components/modalForm';

const { Search } = Input;

const MaterialManager = (props) => {
  const [visible, setVisible] = useState(false);

  const { dispatch } = props

  // 获取自愈材料列表
  const getData = (params = { isInvalid: 1, keyWords: '' }) => {
    console.log(11121,params);
    dispatch({
      type: "materialManager/getData",
      params: { isInvalid: params.isInvalid || props.isInvalid, keyWords: params.keyWords || props.keyWords }
    }).then(res => {
      console.log(res);
      if (res.state) {
        console.log(res);
      } else {
        dispatch({
          type: "materialManager/setState",
          params: {
            data: [
              {
                key: 1,
                MaterialName: 111
              }
            ]
          }
        })
      }
    })
  };

  // console.log(process.env.NODE_ENV, 'eeee');
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };
  const add = () => {
    props.formRef.resetFields();
    props.dispatch({
      type: 'materialManager/setState',
      params: {
        rowData: {},
        title: '新增自愈材料',
      },
    });
    setVisible(true);
  };

  // 编辑
  const edit = (record) => {
    console.log(record);
    props.formRef.setFieldsValue({ ...record});
    props.dispatch({
      type: 'materialManager/setState',
      params: {
        rowData: record,
        title: '编辑自愈材料',
      },
    });
    setVisible(true);
  };

  // 删除
  const deleteItem = () => {
    Modal.confirm({
      title: '提示',
      content: '确认删除自愈材料？',
      onOk: () => {
        console.log('ok');
      },
    });
  };

  // 查询
  const onSearch = (value) => {
    console.log(value);
    dispatch({
      type: 'materialManager/setState',
      params: { keyWords: value }
    })
    getData({ keyWords: value })
  };

  // 显示禁用的材料
  const invalidChange = (e) => {
    console.log(e.target.checked);
    dispatch({
      type: 'materialManager/setState',
      params: { isInvalid: e.target.checked }
    })
    getData({ isInvalid: e.target.checked })
  }


  useEffect(() => {
    // getData()
  }, [])

  // 表格列
  const columns = [
    {
      title: 'CAS号',
      align: 'center',
      dataIndex: 'MaterialRecordCode',
    },
    {
      title: '常用名',
      align: 'center',
      dataIndex: 'MaterialName',
    },
    {
      title: '英文名',
      align: 'center',
      dataIndex: 'MaterialEName',
    },
    {
      title: '分子式',
      align: 'center',
      dataIndex: 'ChemicalFormula',
    },
    {
      title: '分子量',
      align: 'center',
      dataIndex: 'MolecularWeight',
    },
    {
      title: '密度',
      align: 'center',
      dataIndex: 'Density',
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
          <Checkbox key="1" onChange={invalidChange}>显示禁用的材料</Checkbox>,
          <Search
            key="2"
            placeholder={'输入材料名称或DAS号查询'}
            allowClear
            enterButton
            style={{ width: 300 }}
            onSearch={onSearch}
          />,
          <Button onClick={add} key="3" type="primary">
            新增
          </Button>,
        ],
      }}
    >
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey="key"
        scroll={{ y: 'calc(100vh - 320px)' }}
        pagination={false}
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
export default connect(({ materialManager, loading }) => ({ ...materialManager, loading }))(
  MaterialManager,
);
