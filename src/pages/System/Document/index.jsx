import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Layout, Button, Modal, Input, message, Row, Col } from 'antd';
import { connect } from 'umi';
import ModalForm from './components/modalForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Content } = Layout;
const { Search } = Input;

const DocumentManagement = (props) => {
  const [visible, setVisible] = useState(false);

  const { dispatch, rowData, loading } = props;

  // 获取文献
  const getData = (params = { year: 0, keyWords: '' }) => {
    dispatch({
      type: 'document/getData',
      params: { year: params.year || props.year, keyWords: params.keyWords ?? props.keyWords },
    });
  };
  const onCreate = (values) => {
    dispatch({
      type: 'document/saveLiter',
      params: {
        formData: {
          ...values,
          IsValid: values.IsValid ? 1 : 0,
          LiterYear: moment(values).format('YYYY'),
          LiterId: rowData.LiterId || '',
        },
      },
    }).then((res) => {
      if (res.State) {
        setVisible(false);
        getData();
        message.success('保存成功！');
      }
    });
  };
  const add = () => {
    props.formRef.resetFields();
    props.dispatch({
      type: 'document/setState',
      params: {
        rowData: {},
        title: '新增文献',
      },
    });
    setVisible(true);
  };

  const edit = (record) => {
    props.formRef.setFieldsValue({ ...record, LiterYear: moment(record.LiterYear, 'YYYY') });
    props.dispatch({
      type: 'document/setState',
      params: {
        rowData: { ...record },
        title: '编辑文献',
      },
    });
    setVisible(true);
  };

  // 删除
  const deleteItem = (record) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除自愈材料？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'document/deleteLiter',
          params: { id: record.LiterId },
        }).then((res) => {
          if (res.State) {
            getData();
            message.success('删除成功！');
          }
        });
      },
    });
  };

  // 查询
  const onSearch = (value) => {
    dispatch({
      type: 'document/setState',
      params: { keyWords: value },
    });
    getData({ keyWords: value });
  };

  useEffect(() => {
    getData();
  }, []);

  // 表格列
  const columns = [
    {
      title: '序号',
      dataIndex: 'a',
      align: 'center',
      width: 100,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: 'DOI号',
      dataIndex: 'LiterCode',
      width: 300,
      align: 'center',
    },
    {
      title: '文献年份',
      dataIndex: 'LiterYear',
      width: 300,
      align: 'center',
    },
    {
      title: '文献名称',
      dataIndex: 'LiterName',
      align: 'center',
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
      dataIndex: '',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            title="编辑"
            onClick={() => edit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            title="删除"
            danger
            onClick={() => deleteItem(record)}
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
                placeholder={'输入文献名称查询'}
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
      <Layout>
        <Content>
          <Table
            loading={loading && loading.models.document}
            columns={columns}
            dataSource={props.data}
            rowKey="LiterId"
            pagination={false}
            scroll={{ x: 1200, y: 'calc(100% - 50px)' }}
          />
        </Content>
      </Layout>
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
export default connect(({ document, loading }) => ({ ...document, loading }))(DocumentManagement);
