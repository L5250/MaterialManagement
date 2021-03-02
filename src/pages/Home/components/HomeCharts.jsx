import React from 'react';
import { connect } from 'umi';
import { DualAxes } from '@ant-design/charts';

const HomeCharts = () => {
  const data = [
    {
      time: '2019-03',
      value: 350,
      count: 800,
    },
    {
      time: '2019-04',
      value: 900,
      count: 600,
    },
    {
      time: '2019-05',
      value: 300,
      count: 400,
    },
    {
      time: '2019-06',
      value: 450,
      count: 380,
    },
    {
      time: '2019-07',
      value: 470,
      count: 220,
    },
  ];
  const config = {
    autoFit: true,
    data: [data, data],
    xField: 'time',
    yField: ['value', 'count'],
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
