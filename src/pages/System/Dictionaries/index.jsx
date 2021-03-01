import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Row, Col, Layout, Button, Modal, Input, message } from 'antd';
import { connect } from 'umi';
import ModalForm from './components/modalForm';
import ModalFormDicItem from './components/modalFormItem';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Header, Content } = Layout;

const Dictionaries = (props) => {
  const [visible, setVisible] = useState(false);
  const [visibleItem, setVisibleItem] = useState(false);

  const {
    dispatch,
    rowData,
    rowItemData,
    loading,
    formDicItemRef,
    dicSortsSourceData,
    dicSortsData,
    dicItemData,
    dicItemSourceData,
  } = props;

  // 获取字典分类
  const getDictSorts = (params = { year: 0 }) => {
    dispatch({
      type: 'dictionaries/getDictSorts',
    });
  };

  const onCreate = (values) => {
    dispatch({
      type: 'dictionaries/saveDictSort',
      params: {
        formData: {
          ...values,
          DictSortId: rowData.DictSortId || '',
        },
      },
    }).then((res) => {
      if (res.State) {
        setVisible(false);
        getDictSorts();
        dispatch({
          type: 'dictionaries/setState',
          params: { dicItemData: [], dicItemSourceData: [] },
        });
        message.success('保存字典分类成功！');
      }
    });
  };
  const addSorts = () => {
    props.formRef.resetFields();
    dispatch({
      type: 'dictionaries/setState',
      params: {
        rowData: {},
        title: '新增字典分类',
      },
    });
    setVisible(true);
  };

  const editSorts = (e, record) => {
    e.stopPropagation();
    props.formRef.setFieldsValue({ ...record });
    props.dispatch({
      type: 'dictionaries/setState',
      params: {
        rowData: record,
        title: '编辑字典分类',
      },
    });
    setVisible(true);
  };
  const deleteSorts = (e, record) => {
    e.stopPropagation();
    Modal.confirm({
      title: '提示',
      content: '确认删除字典分类？',
      onOk: () => {
        props
          .dispatch({
            type: 'dictionaries/deleteDictSort',
            params: {
              keyId: record.DictSortId,
            },
          })
          .then((res) => {
            if (res.State) {
              getDictSorts();
              dispatch({
                type: 'dictionaries/setState',
                params: { dicItemData: [], dicItemSourceData: [] },
              });
              message.success('删除字典分类成功！');
            }
          });
      },
    });
  };
  const onSearch = (value) => {
    const arr = dicSortsSourceData.filter((item) => {
      return item.DictSortName.indexOf(value) !== -1 || item.DictSortCode.indexOf(value) !== -1;
    });
    if (value === '') {
      dispatch({
        type: 'dictionaries/setState',
        params: { dicSortsData: dicSortsSourceData },
      });
    } else {
      dispatch({
        type: 'dictionaries/setState',
        params: { dicSortsData: arr },
      });
    }
  };

  // 字典项
  const getDicItemData = (record = {}) => {
    if (record.DictSortId) {
      dispatch({
        type: 'dictionaries/setState',
        params: { rowData: record },
      });
      dispatch({
        type: 'dictionaries/getDictItems',
        params: {
          keyId: record.DictSortId,
        },
      }).then((res) => {});
    }
  };
  const onCreateItem = (values) => {
    dispatch({
      type: 'dictionaries/saveDictItem',
      params: {
        formData: {
          ...values,
          IsModify: values.IsModify ? 1 : 0,
          // IsEnable: values.IsEnable ? 1 : 0,
          IsEnable: 1,
          DictItemId: rowItemData.DictItemId || '',
          LevelCode: 1,
        },
      },
    }).then((res) => {
      if (res.State) {
        setVisibleItem(false);
        getDicItemData(rowData);
        message.success('保存字典项成功！');
      }
    });
  };
  const addItem = () => {
    formDicItemRef.resetFields();
    dispatch({
      type: 'dictionaries/setState',
      params: {
        rowItemData: {},
        title: '新增字典项',
      },
    });
    setVisibleItem(true);
  };

  const editItem = (record) => {
    formDicItemRef.setFieldsValue({ ...record });
    dispatch({
      type: 'dictionaries/setState',
      params: {
        rowItemData: record,
        title: '编辑字典项',
      },
    });
    setVisibleItem(true);
  };
  const deleteItem = (record) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除字典项？',
      onOk: () => {
        dispatch({
          type: 'dictionaries/deleteDictItem',
          params: {
            keyId: record.DictItemId,
          },
        }).then((res) => {
          if (res.State) {
            getDicItemData(rowData);
            message.success('删除字典项成功！');
          }
        });
      },
    });
  };
  const onSearchItem = (value) => {
    const arr = dicItemSourceData.filter((item) => {
      return item.DictItemName.indexOf(value) !== -1 || item.DictItemCode.indexOf(value) !== -1;
    });
    if (value === '') {
      dispatch({
        type: 'dictionaries/setState',
        params: { dicItemData: dicItemSourceData },
      });
    } else {
      dispatch({
        type: 'dictionaries/setState',
        params: { dicItemData: arr },
      });
    }
  };

  useEffect(() => {
    getDictSorts();
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
      title: '顺序码',
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
      fixed: 'right',
      width: 200,
      render: (record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            title="编辑"
            onClick={(e) => editSorts(e, record)}
            disabled={record.IsModify === 0}
          />
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            title="删除"
            danger
            onClick={(e) => deleteSorts(e, record)}
            disabled={record.IsModify === 0}
          />
        </Space>
      ),
    },
  ];

  const dicItemColumns = [
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
      fixed: 'right',
      width: 200,
      render: (record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            title="编辑"
            onClick={() => editItem(record)}
            disabled={rowData.IsModify === 0}
          />
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            title="删除"
            danger
            onClick={() => deleteItem(record)}
            disabled={rowData.IsModify === 0}
          />
        </Space>
      ),
    },
  ];

  const setRowClassName = (record) => {
    return record.DictSortId === rowData.DictSortId ? 'clickRowStyl' : '';
  };

  return (
    <PageContainer>
      <Layout style={{ height: '50%' }}>
        <Header style={{ marginBottom: 10 }}>
          <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Search
              placeholder={'输入字典分类查询'}
              allowClear
              enterButton
              style={{ width: 300 }}
              onSearch={onSearch}
            />
            <Button style={{ textAlign: 'right' }} onClick={addSorts} key="2" type="primary">
              新增
            </Button>
          </Space>
        </Header>
        <Content>
          <Table
            loading={loading && loading.models.dictionaries}
            columns={columns}
            dataSource={props.dicSortsData}
            rowKey="DictSortId"
            pagination={false}
            rowClassName={setRowClassName}
            scroll={{ x: 800, y: 'calc(50vh - 200px)' }}
            onRow={(record) => {
              return {
                onClick: () => {
                  getDicItemData(record);
                },
              };
            }}
          />
        </Content>
      </Layout>

      <Layout style={{ marginTop: 10, height: '50%' }}>
        <Header style={{ marginBottom: 10 }}>
          <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Search
              placeholder={'输入字典名称查询'}
              allowClear
              enterButton
              style={{ width: 300 }}
              onSearch={onSearchItem}
            />
            <Button style={{ textAlign: 'right' }} onClick={addItem} key="2" type="primary">
              新增
            </Button>
          </Space>
        </Header>
        <Content>
          <Table
            loading={loading && loading.models.dictionaries}
            columns={dicItemColumns}
            dataSource={props.dicItemData}
            rowKey="DictItemId"
            pagination={false}
            scroll={{ x: 800, y: 'calc(50vh - 200px)' }}
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
      <ModalFormDicItem
        visible={visibleItem}
        onCreate={onCreateItem}
        onCancel={() => {
          setVisibleItem(false);
        }}
      />
    </PageContainer>
  );
};
export default connect(({ dictionaries, loading }) => ({ ...dictionaries, loading }))(Dictionaries);
