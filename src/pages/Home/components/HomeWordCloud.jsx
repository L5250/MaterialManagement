import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { WordCloud } from '@ant-design/charts';

const HomeWordCloud = (props) => {
  const { literCount } = props;

  const config = {
    autoFit: true,
    data: literCount,
    wordField: 'name',
    weightField: 'count',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [16, 50],
      rotation: 0,
    },
    random: function random() {
      return 0.5;
    },
  };
  return <WordCloud {...config} />;
};
export default connect(({ home, loading }) => ({ ...home, loading }))(HomeWordCloud);
