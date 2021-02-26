import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, Modal, Input, Checkbox } from 'antd';
import { connect } from 'umi';
import ModalForm from './components/modalForm';
import CheckMaterial from '@/components/CheckMaterial';

const { Search } = Input;

const MaterialManager = (props) => {
  const [visible, setVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);

  const { dispatch, rowData, loading, imageUrl64 } = props;

  // 获取自愈材料列表
  const getData = (params = { isInvalid: true, keyWords: '' }) => {
    dispatch({
      type: 'materialManager/getData',
      params: {
        isInvalid: params.isInvalid || props.isInvalid,
        keyWords: params.keyWords ?? props.keyWords,
      },
    });
  };

  // 获取应用场景和自愈类型列表
  const getSceneAndTypeList = () => {
    dispatch({
      type: 'materialManager/getSceneAndTypeList',
    });
  };

  const onCreate = (values) => {
    console.log(values);
    // setVisible(false);
    const formData = {
      ...values,
      // IsValid: 1,
      // IsDelete: 0,
      Symbol: imageUrl64,
      MaterialRecordID: rowData.MaterialRecordID || '',
      MaterialType: values.MaterialType?.toString(),
    };
    console.log(formData);
    // return
    dispatch({
      type: 'materialManager/saveMaterialRecord',
      params: {
        formData,
      },
    }).then((res) => {
      if (res.State) {
        setVisible(false);
        getData();
      }
    });
  };

  // 新增
  const add = () => {
    props.formRef.resetFields();
    props.dispatch({
      type: 'materialManager/setState',
      params: {
        literKeys: [],
        literRows: [],
        rowData: {},
        imageUrl64: '',
        title: '新增自愈材料',
      },
    });
    setVisible(true);
  };

  // 查看
  const check = (record) => {
    props.dispatch({
      type: 'materialManager/setState',
      params: {
        rowData: { ...record },
      },
    });
    setCheckVisible(true);
  };
  // 编辑
  const edit = (record) => {
    props.formRef.setFieldsValue({
      ...record,
      SceneName: record.SceneName ? record.SceneName.join() : [],
      MaterialType: record.MaterialType ? record.MaterialType.join() : [],
    });
    props.dispatch({
      type: 'materialManager/setState',
      params: {
        rowData: { ...record },
        imageUrl64: record.Symbol,
        literKeys: record.LiterIds ? record.LiterIds.split(',') : '',
        // literRows: [],
        title: '编辑自愈材料',
      },
    });
    setVisible(true);
  };
  // 删除
  const deleteItem = (record) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除自愈材料？',
      onOk: () => {
        dispatch({
          type: 'materialManager/deleteMaterialRecord',
          params: {
            keyId: record.key,
          },
        }).then((res) => {
          if (res.State) {
            getData();
          }
        });
      },
    });
  };

  // 查询
  const onSearch = (value) => {
    dispatch({
      type: 'materialManager/setState',
      params: { keyWords: value },
    });
    getData({ keyWords: value });
  };

  // 显示禁用的材料
  const invalidChange = (e) => {
    dispatch({
      type: 'materialManager/setState',
      params: { isInvalid: e.target.checked },
    });
    getData({ isInvalid: e.target.checked });
  };

  useEffect(() => {
    getData();
    getSceneAndTypeList();
  }, []);

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
          <a onClick={() => check(record)}>查看</a>
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
          <Checkbox key="1" onChange={invalidChange}>
            显示禁用的材料
          </Checkbox>,
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
        loading={loading && loading.models.materialManager}
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

      <CheckMaterial
        visible={checkVisible}
        onCancel={() => setCheckVisible(false)}
        data={rowData}
      />
    </PageContainer>
  );
};
export default connect(({ materialManager, loading }) => ({ ...materialManager, loading }))(
  MaterialManager,
);
