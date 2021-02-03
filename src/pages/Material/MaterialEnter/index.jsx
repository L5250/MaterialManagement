import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Table, Space, Tag, Layout, Button } from 'antd';
import { useIntl, FormattedMessage, connect } from 'umi';

const { Content } = Layout

const MaterialEnter = (props) => {
  const intl = useIntl();
  const getData = () => {
    props.dispatch({
      type: "materialEnter/setState",
      params: {
        data: []
      }
    })
  }

  const columns = [
    {
      title: 'a',
      dataIndex: 'a',
      key: 'a',
      render: text => <a>{text}</a>,
    },
  ];


  console.log(intl);

  return (
    <PageContainer>
      <Button onClick={getData}>122</Button>
      <Table columns={columns} dataSource={props.data} rowKey="key" />

    </PageContainer>
  );
};
export default connect(({ materialEnter, loading }) => ({ ...materialEnter, loading }))(MaterialEnter);
