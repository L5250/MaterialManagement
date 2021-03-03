import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { WordCloud } from '@ant-design/charts';

const HomeWordCloud = (props) => {
  const { literCount } = props;

  const config = {
    data: literCount,
    wordField: 'name',
    weightField: 'count',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 32],
      rotation: 0,
    },
    random: function random() {
      return 0.5;
    },
  };
  return <WordCloud {...config} />;
};
export default connect(({ home, loading }) => ({ ...home, loading }))(HomeWordCloud);
