import React, { useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, Modal, message, Input, Row, Col } from 'antd';
import { connect } from 'umi';
import { EditOutlined, RedoOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalForm from './components/modalForm';

const { Search } = Input;

const Personnel = (props) => {
  const [visible, setVisible] = useState(false);

  const { dispatch, rowData, loading, dataSource } = props;

  const getAllUsers = () => {
    dispatch({
      type: 'personnel/getAllUsers',
    });
  };
  const onCreate = (values) => {
    dispatch({
      type: 'personnel/saveUserInfo',
      params: {
        formData: {
          ...values,
          UserId: rowData.UserId || '',
          IsAdmin: values.IsAdmin ? 1 : 0,
          IsValid: values.IsValid ? 1 : 0,
        },
      },
    }).then((res) => {
      if (res.State) {
        setVisible(false);
        getAllUsers();
        message.success('保存成功！');
      }
    });
  };
  const add = () => {
    props.formRef.resetFields();
    props.dispatch({
      type: 'personnel/setState',
      params: {
        rowData: {},
        title: '新增人员',
      },
    });
    setVisible(true);
  };

  const edit = (record) => {
    props.formRef.setFieldsValue({ ...record });
    props.dispatch({
      type: 'personnel/setState',
      params: {
        rowData: record,
        title: '编辑人员',
      },
    });
    setVisible(true);
  };
  const deleteItem = (record) => {
    if (record.UserCode === 'admin') {
      Modal.info({
        title: '提示',
        content: '管理员不可删除！',
      });
      return;
    }
    Modal.confirm({
      title: '提示',
      content: '是否确认删除用户？',
      onOk: () => {
        dispatch({
          type: 'personnel/deleteUserInfo',
          params: { keyId: record.UserId },
        }).then((res) => {
          if (res.State) {
            message.success('删除成功！');
            getAllUsers();
          }
        });
      },
    });
  };
  const resetPassword = (record) => {
    Modal.confirm({
      title: '提示！',
      content: '重置后密码为【123456】，是否确定重置密码？',
      onOk: () => {
        dispatch({
          type: 'personnel/saveUserInfo',
          params: {
            formData: { ...record, PassWord: '' },
          },
        }).then((res) => {
          if (res.State) {
            getAllUsers();
            message.success('重置成功！');
          }
        });
      },
    });
  };

  const onSearch = (value) => {
    const arr = dataSource.filter((item) => {
      return item.UserName.indexOf(value) !== -1 || item.UserCode.indexOf(value) !== -1;
    });
    if (value === '') {
      dispatch({
        type: 'personnel/setState',
        params: { data: dataSource },
      });
    } else {
      dispatch({
        type: 'personnel/setState',
        params: { data: arr },
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
        return text === 1 ? '是' : '否';
      },
    },
    {
      title: '是否有效',
      align: 'center',
      dataIndex: 'IsValid',
      render: (text) => {
        return text === 1 ? '是' : '否';
      },
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: '',
      fixed: 'right',
      width: 150,
      render: (record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => edit(record)}
            title="编辑"
          />
          <Button
            icon={<RedoOutlined />}
            type="primary"
            onClick={() => resetPassword(record)}
            title="重置密码"
          />
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            disabled={record.UserCode === 'admin'}
            onClick={() => deleteItem(record)}
            title="删除"
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        extra: [
          <Row key="1" gutter={[12, 8]} align="middle">
            <Col>
              <Search
                placeholder={'输入用户名或用户姓名查询'}
                allowClear
                enterButton
                style={{ width: 300 }}
                onSearch={onSearch}
              />
            </Col>
            <Col>
              <Button onClick={add} type="primary">
                新增
              </Button>
            </Col>
          </Row>,
        ],
      }}
    >
      <Table
        loading={loading && loading.models.personnel}
        columns={columns}
        dataSource={props.data}
        rowKey="UserId"
        scroll={{ x: 1200, y: 'calc(100% - 50px)' }}
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
