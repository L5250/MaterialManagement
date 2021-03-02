import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Layout, Button, Modal, Input, message, Row, Col, Card } from 'antd';
import { connect } from 'umi';
import CheckMaterial from '@/components/CheckMaterial';
import { EyeOutlined } from '@ant-design/icons';
import formatFormula from '@/utils/formatFormula';
import HomeCharts from './components/HomeCharts';
import HomePie from './components/HomePie';
import HomeWordCloud from './components/HomeWordCloud';
import styles from './index.less';

const { Content } = Layout;
const { Search } = Input;

const Home = (props) => {
  const [visible, setVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);

  const { dispatch, rowData, loading, imageUrl64 } = props;

  // 查看
  const check = (record) => {
    dispatch({
      type: 'materialManager/setState',
      params: {
        rowData: { ...record },
      },
    });
    setCheckVisible(true);
  };

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
      render: (text) => formatFormula(text),
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
      render: (text) => `${text}℃`,
    },
    {
      title: '熔点',
      align: 'center',
      dataIndex: 'MeltingPoint',
      render: (text) => `${text}℃`,
    },
    {
      title: '闪点',
      align: 'center',
      dataIndex: 'FlashPoint',
      render: (text) => `${text}℃`,
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: '',
      width: 200,
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
    <Layout className={styles.home}>
      <Content>
        <Row gutter={24} style={{ height: '50%', marginBottom: 12 }}>
          <Col span={16} className={styles.home_col}>
            <Card title="1" bordered={false} hoverable>
              <Table
                loading={loading && loading.models.materialManager}
                columns={columns}
                dataSource={props.data}
                rowKey="key"
                scroll={{ y: 'calc(100vh - 320px)' }}
                pagination={false}
              />
            </Card>
          </Col>
          <Col span={8} className={styles.home_col}>
            <Card title="1" bordered={false} hoverable>
              <HomePie />
            </Card>
          </Col>
        </Row>

        <Row gutter={24} style={{ height: '50%' }}>
          <Col span={12} className={styles.home_col}>
            <Card title="1" bordered={false} hoverable>
              <HomeCharts />
            </Card>
          </Col>
          <Col span={12} className={styles.home_col}>
            <Card title="1" bordered={false} hoverable>
              <HomeWordCloud />
            </Card>
          </Col>
        </Row>

        <CheckMaterial
          visible={checkVisible}
          onCancel={() => setCheckVisible(false)}
          dataObj={rowData || {}}
        />
      </Content>
    </Layout>
  );
};
export default connect(({ home, loading }) => ({ ...home, loading }))(Home);
