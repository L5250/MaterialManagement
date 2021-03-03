import React from 'react';
import { connect } from 'umi';
import { Pie } from '@ant-design/charts';

const HomePie = (props) => {
  const { senceDist } = props;
  const config = {
    appendPadding: 10,
    data: senceDist,
    angleField: 'count',
    colorField: 'name',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  return <Pie {...config} />;
};
export default connect(({ home, loading }) => ({ ...home, loading }))(HomePie);
