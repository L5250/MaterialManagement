import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Layout, Button, Modal, Input, message, Row, Col, Card } from 'antd';
import { connect } from 'umi';
import CheckMaterial from '@/components/CheckMaterial';
import { EyeOutlined } from '@ant-design/icons';
import formatFormula from '@/utils/formatFormula';
import HomeWordCloud from './components/HomeWordCloud';
import HomeCharts from './components/HomeCharts';
import HomeColumns from './components/HomeColumns';
import HomePie from './components/HomePie';
import styles from './index.less';

const { Content } = Layout;
const { Search } = Input;

const Home = (props) => {
  const [visible, setVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);

  const { dispatch, rowData, loading, dataTop5 } = props;

  const getDataTop5 = () => {
    dispatch({
      type: 'home/getDataTop5',
    });
  };
  const getLiterToMaterialCount = () => {
    dispatch({
      type: 'home/getLiterToMaterialCount',
    });
  };
  const getLiterPerYearCount = () => {
    dispatch({
      type: 'home/getLiterPerYearCount',
    });
  };
  const getAppliSceneDist = () => {
    dispatch({
      type: 'home/getAppliSceneDist',
    });
  };
  const getTypeMaterialCount = () => {
    dispatch({
      type: 'home/getTypeMaterialCount',
    });
  };
  // 查看
  const check = (record) => {
    dispatch({
      type: 'home/setState',
      params: {
        rowData: { ...record },
      },
    });
    setCheckVisible(true);
  };

  useEffect(() => {
    getDataTop5();
    getLiterToMaterialCount();
    getLiterPerYearCount();
    getAppliSceneDist();
    getTypeMaterialCount();
  }, []);
  // 表格列
  const columns = [
    {
      title: 'CAS号',
      align: 'center',
      dataIndex: 'MaterialRecordCode',
      render: (text, record) => (
        <Space>
          <Button type="link" onClick={() => check(record)} title={text}>
            {text}
          </Button>
        </Space>
      ),
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
    // {
    //   title: '操作',
    //   align: 'center',
    //   dataIndex: '',
    //   width: 200,
    //   render: (record) => (
    //     <Space>
    //       <Button
    //         icon={<EyeOutlined />}
    //         onClick={() => check(record)}
    //         type="primary"
    //         title="查看"
    //       />
    //     </Space>
    //   ),
    // },
  ];

  return (
    <Layout className={styles.home}>
      <Content>
        <Row gutter={[24, 16]} style={{ height: '100%' }}>
          <Col span={24} xl={18} className={styles.home_col}>
            <Card title="最近材料" bordered={false} hoverable>
              <Table
                loading={loading && loading.models.materialManager}
                columns={columns}
                dataSource={dataTop5}
                rowKey="key"
                scroll={{ x: 800, y: 'calc(100% - 50px)' }}
                pagination={false}
              />
            </Card>
          </Col>
          <Col span={24} xl={6} className={styles.home_col}>
            <Card title="引用文献次数" bordered={false} hoverable>
              <HomeWordCloud />
            </Card>
          </Col>

          <Col span={24} xl={9} className={styles.home_col}>
            <Card title="文献年份计数统计" bordered={false} hoverable>
              <HomeCharts />
            </Card>
          </Col>
          <Col span={24} xl={9} className={styles.home_col}>
            <Card title="自愈类型材料计数" bordered={false} hoverable>
              <HomeColumns />
            </Card>
          </Col>

          <Col span={24} xl={6} className={styles.home_col}>
            <Card title="应用场景占比" bordered={false} hoverable>
              <HomePie />
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
