import React from 'react';
import { connect } from 'umi';
import { DualAxes } from '@ant-design/charts';

const HomeCharts = (props) => {
  const { literPerDate } = props;
  const config = {
    autoFit: true,
    data: [literPerDate, literPerDate],
    xField: 'x',
    yField: ['y1', 'y2'],
    meta: {
      x: {
        alias: '年',
        formatter: (e) => {
          return `${e}年`;
        },
      },
      y1: {
        alias: '文献数',
      },
      y2: {
        alias: '文献提及材料数',
      },
    },
    geometryOptions: [
      { geometry: 'column' },
      {
        geometry: 'line',
        lineStyle: { lineWidth: 2 },
      },
    ],
  };
  return <DualAxes {...config} />;
};
export default connect(({ home, loading }) => ({ ...home, loading }))(HomeCharts);
