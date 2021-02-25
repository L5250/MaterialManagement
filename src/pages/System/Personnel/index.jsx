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

const { Search } = Input;

const Personnel = (props) => {
  const [visible, setVisible] = useState(false);

  const { dispatch, rowData, loading } = props

  const getAllUsers = () => {
    dispatch({
      type: "personnel/getAllUsers"
    }).then(res => {
      console.log(res);
    })
  }
  const onCreate = (values) => {
    dispatch({
      type: "personnel/saveUserInfo",
      params: {
        formData: { ...values, UserId: rowData.UserId || "", IsAdmin: values.IsAdmin ? 1 : 0, IsValid: values.IsValid ? 1 : 0 }
      }
    }).then(res => {
      if (res.State) {
        setVisible(false);
        getAllUsers();
      }
    })
  };
  const add = () => {
    props.formRef.resetFields();
    props.dispatch({
      type: 'personnel/setState',
      params: {
        rowData: {},
        title: '新增自愈材料',
      },
    });
    setVisible(true);
  };

  const edit = (record) => {
    console.log(record);
    props.formRef.setFieldsValue({ ...record });
    props.dispatch({
      type: 'personnel/setState',
      params: {
        rowData: record,
        title: '编辑自愈材料',
      },
    });
    setVisible(true);
  };
  const deleteItem = (record) => {
    if (record.UserCode === "admin") {
      Modal.info({
        title: "提示",
        content: "管理员不可删除！"
      })
      return
    }
    Modal.confirm({
      title: '提示',
      content: '确认删除用户？',
      onOk: () => {
        dispatch({
          type: "personnel/deleteUserInfo",
          params: { keyId: record.UserId }
        }).then(res => {
          if (res.State) {
            message.success("删除成功！")
            getAllUsers()
          }
        })
      },
    });
  };
  const resetPassword = (record) => {
    dispatch({
      type: "personnel/saveUserInfo",
      params: {
        formData: { ...record, PassWord: "" }
      }
    }).then(res => {
      if (res.State) {
        getAllUsers();
      }
    })
  };

  const onSearch = (value) => {

  };


  useEffect(() => {
    getAllUsers()
  }, [])

  // 表格列
  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '',
      width: 120,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: '用户名',
      align: 'center',
      dataIndex: 'UserCode',
    },
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'UserName',
    },
    {
      title: '联系电话',
      align: 'center',
      dataIndex: 'UserTel',
    },
    {
      title: '是否管理员',
      align: 'center',
      dataIndex: 'IsAdmin',
      render: (text) => {
        return text === 1 ? "是" : "否"
      }
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: '',
      width: 200,
      render: record => (
        <Space size="middle">
          {/* <Button title="编辑" icon={<EditOutlined />} type="primary" />
          <Button title="删除" icon={<DeleteOutlined />} type="danger" /> */}
          <a onClick={() => edit(record)}>编辑</a>
          <a onClick={() => resetPassword(record)}>重置密码</a>
          <a disabled={record.UserCode === 'admin'} onClick={() => deleteItem(record)}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        extra: [
          <Checkbox key="3">显示禁用的用户</Checkbox>,
          <Search
            key="1"
            placeholder={'输入用户名或用户姓名查询'}
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
        loading={loading && loading.models.personnel}
        columns={columns}
        dataSource={props.data}
        rowKey="UserId"
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
export default connect(({ personnel, loading }) => ({ ...personnel, loading }))(Personnel);
