import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Table,
  Space,
  Row,
  Col,
  Layout,
  Button,
  Modal,
  Input,
} from 'antd';
import { connect } from 'umi';
import ModalForm from './components/modalForm';
import ModalFormDicItem from './components/modalFormItem';

const { Search } = Input;
const { Header, Content } = Layout;

const Dictionaries = (props) => {

  const [visible, setVisible] = useState(false);
  const [visibleItem, setVisibleItem] = useState(false);

  const { dispatch, rowData, rowItemData, loading, formDicItemRef } = props

  // 获取字典分类
  const getDictSorts = (params = { year: 0, keyWords: '' }) => {
    dispatch({
      type: "dictionaries/getDictSorts",
      params: { keyWords: params.keyWords ?? props.keyWords }
    })
  }

  const onCreate = (values) => {
    dispatch({
      type: 'dictionaries/saveDictSort',
      params: {
        formData: {
          ...values,
          IsModify: values.IsModify ? 1 : 0,
          // IsEnable: values.IsEnable ? 1 : 0,
          IsEnable: 1,
          DictSortId: rowData.DictSortId || '',
        }
      },
    }).then(res => {
      if (res.State) {
        setVisible(false);
        getDictSorts()
        dispatch({
          type: "dictionaries/setState",
          params: { dicItemData: [] }
        })
      }
    })
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
    e.stopPropagation()
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
    e.stopPropagation()
    Modal.confirm({
      title: '提示',
      content: '确认删除字典分类？',
      onOk: () => {
        props.dispatch({
          type: 'dictionaries/deleteDictSort',
          params: {
            keyId: record.DictSortId,
          },
        }).then(res => {
          if (res.State) {
            getDictSorts();
            dispatch({
              type: "dictionaries/setState",
              params: { dicItemData: [] }
            })
          }
        });
      },
    });
  };
  const onSearch = (value) => {
    dispatch({
      type: 'dictionaries/setState',
    })

  };

  // 字典项
  const getDicItemData = (record) => {
    dispatch({
      type: "dictionaries/setState",
      params: { rowData: record }
    })
    dispatch({
      type: "dictionaries/getDictItems",
      params: {
        keyId: record.DictSortId
      }
    }).then(res => {

    })
  }
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
        }
      },
    }).then(res => {
      if (res.State) {
        setVisibleItem(false);
        getDicItemData(rowData)
      }
    })
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
        props.dispatch({
          type: 'dictionaries/deleteDictItem',
          params: {
            keyId: record.DictItemId,
          },
        }).then(res => {
          if (res.State) {
            getDicItemData(rowData);
          }
        });
      },
    });
  };
  const onSearchItem = (value) => {

  };
  useEffect(() => {
    getDictSorts()
  }, [])
  console.log(loading);
  // 表格列
  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '',
      width: 120,
      render: (text, record, index) => {
        return index + 1
      }
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
      render: (text, record) => {
        return <div onClick={() => getDicItemData(record)}><a >{text}</a></div>
      }
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
          <a onClick={(e) => editSorts(e, record)}>编辑</a >
          <a disabled={record.IsModify === 0} onClick={(e) => deleteSorts(e, record)}>删除</a>
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
          <a disabled={rowData.IsModify === 0} onClick={() => editItem(record)}>编辑</a>
          <a disabled={rowData.IsModify === 0} onClick={() => deleteItem(record)}>删除</a>
        </Space>
      ),
    },

  ]

  return (
    <PageContainer>
      <Layout>
        <Layout>
          <Header style={{ marginBottom: 10 }}>
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Search
                placeholder={'输入字典分类查询'}
                allowClear
                enterButton
                style={{ width: 300 }}
                onSearch={onSearch}
              />
              <Button style={{ textAlign: "right" }} onClick={addSorts} key="2" type="primary">新增</Button>
            </Space>
          </Header>
          <Content>
            <Table
              loading={loading && loading.models.dictionaries}
              columns={columns}
              dataSource={props.dicSortsData}
              rowKey="DictSortId"
              pagination={false}
              scroll={{ x: 800, y: 'calc(50vh - 200px)' }}
              onRow={record => {
                return {
                  onClick: () => { getDicItemData(record) }
                }
              }}
            />
          </Content>
        </Layout>

        <Layout style={{ marginTop: 10 }}>
          <Header style={{ marginBottom: 10 }}>
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Search
                placeholder={'输入字典名称查询'}
                allowClear
                enterButton
                style={{ width: 300 }}
                onSearch={onSearchItem}
              />
              <Button style={{ textAlign: "right" }} onClick={addItem} key="2" type="primary">新增</Button>
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
