import React from 'react';
import { connect } from 'umi';
import { Column } from '@ant-design/charts';

const HomeColumns = (props) => {
  const { materialCount } = props;
  const config = {
    autoFit: true,
    data: materialCount,
    xField: 'name',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      name: { alias: '自愈类型' },
      count: { alias: '材料数' },
    },
  };
  return <Column {...config} />;
};
export default connect(({ home, loading }) => ({ ...home, loading }))(HomeColumns);
