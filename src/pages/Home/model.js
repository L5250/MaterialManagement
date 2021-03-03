import service from './service';

export default {
  namespace: 'home',
  state: {
    dataTop5: [],
    literCount: [], // 次数
    literPerDate: [], // 统计
    senceDist: [], // 占比
  },
  effects: {
    *getDataTop5({ params }, { call, put }) {
      const { Data, State } = yield call(service.getDataTop5, params);
      yield put({
        type: 'setState',
        params: { dataTop5: Data },
      });
      return { Data, State };
    },

    *getLiterToMaterialCount({ params }, { call, put }) {
      const { Data, State } = yield call(service.getLiterToMaterialCount, params);
      yield put({
        type: 'setState',
        params: { literCount: Data },
      });
      return { Data, State };
    },

    *getLiterPerYearCount({ params }, { call, put }) {
      const { Data, State } = yield call(service.getLiterPerYearCount, params);
      yield put({
        type: 'setState',
        params: { literPerDate: Data },
      });
      return { Data, State };
    },

    *getAppliSceneDist({ params }, { call, put }) {
      const { Data, State } = yield call(service.getAppliSceneDist, params);
      yield put({
        type: 'setState',
        params: { senceDist: Data },
      });
      return { Data, State };
    },
  },
  reducers: {
    setState: (state, { params }) => {
      return { ...state, ...params };
    },
  },
};
