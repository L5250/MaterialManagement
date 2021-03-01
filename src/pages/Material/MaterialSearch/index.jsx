import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {} from 'antd';
import { connect } from 'umi';
import {} from '@ant-design/icons';

class MaterialSearch extends Component {
  render() {
    return <PageContainer>MaterialSearch</PageContainer>;
  }
}

export default connect(({ materialEnter, loading }) => ({ ...materialEnter, loading }))(
  MaterialSearch,
);
