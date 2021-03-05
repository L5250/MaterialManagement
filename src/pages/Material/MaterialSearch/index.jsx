import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, Modal, Input, Checkbox } from 'antd';
import { connect } from 'umi';
import ModalForm from './components/modalForm';
import CheckMaterial from '@/components/CheckMaterial';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import formatFormula from '@/utils/formatFormula';

const { Search } = Input;
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

const MaterialSearch = (props) => {
  const [visible, setVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);

  const { dispatch, rowData, loading, imageUrl64 } = props;

  // 获取自愈材料列表
  const materialSearch = (params = { isInvalid: true, keyWords: '' }) => {
    dispatch({
      type: 'materialSearch/materialSearch',
      // params: {
      //   isInvalid: params.isInvalid || props.isInvalid,
      //   keyWords: params.keyWords ?? props.keyWords,
      // },
    });
  };

  // 获取应用场景和自愈类型列表
  const getSceneAndTypeList = () => {
    dispatch({
      type: 'materialSearch/getSceneAndTypeList',
    });
  };

  const onCreate = (values) => {
    const formData = {
      ...values,
      // Symbol: imageUrl64,
      // MaterialRecordID: rowData.MaterialRecordID || '',
      ele1: values.ele1 || undefined,
      ele2: values.ele2 || values.ele1 || undefined,
      ele3: values.ele3 || values.ele1 || undefined,
      ele4: values.ele4 || values.ele1 || undefined,
      scenes: values.scenes?.toString(),
      types: values.types?.toString(),
    };
    dispatch({
      type: 'materialSearch/materialSearch',
      params: {
        ...formData,
      },
    }).then((res) => {
      if (res.State) {
        setVisible(false);
      }
    });
  };

  // 新增
  const search = () => {
    props.formRef.resetFields();
    props.dispatch({
      type: 'materialSearch/setState',
      params: {
        title: '查询材料',
      },
    });
    setVisible(true);
  };

  // 查看
  const check = (record) => {
    props.dispatch({
      type: 'materialSearch/setState',
      params: {
        rowData: { ...record },
      },
    });
    setCheckVisible(true);
  };

  useEffect(() => {
    materialSearch();
    getSceneAndTypeList();
  }, []);

  // 表格列
  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '',
      width: 80,
      render: (text, record, index) => {
        return index + 1;
      },
    },
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
      render: (text) => <span>{formatFormula(text)}</span>,
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
      title: '沸点',
      align: 'center',
      dataIndex: 'BoilingPoint',
      render: (text) => text && `${text}℃`,
    },
    {
      title: '熔点',
      align: 'center',
      dataIndex: 'MeltingPoint',
      render: (text) => text && `${text}℃`,
    },
    {
      title: '闪点',
      align: 'center',
      dataIndex: 'FlashPoint',
      render: (text) => text && `${text}℃`,
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: '',
      fixed: 'right',
      width: 80,
      render: (record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => check(record)}
            type="primary"
            title="查看"
          />
        </Space>
      ),
    },
  ];
  return (
    <PageContainer
      header={{
        extra: [
          // <Checkbox key="1" onChange={invalidChange}>
          //   显示禁用的材料
          // </Checkbox>,
          // <Search
          //   key="2"
          //   placeholder={'输入材料名称或DAS号查询'}
          //   allowClear
          //   enterButton
          //   style={{ width: 300 }}
          //   onSearch={onSearch}
          // />,
          <Button onClick={search} key="3" type="primary">
            查询
          </Button>,
        ],
      }}
    >
      <Table
        loading={loading && loading.models.materialSearch}
        columns={columns}
        dataSource={props.data}
        rowKey="key"
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

      <CheckMaterial
        visible={checkVisible}
        onCancel={() => setCheckVisible(false)}
        dataObj={rowData || {}}
      />
    </PageContainer>
  );
};
export default connect(({ materialSearch, loading }) => ({ ...materialSearch, loading }))(
  MaterialSearch,
);
