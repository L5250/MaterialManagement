import service from './service';

export default {
  namespace: 'home',
  state: {},
  effects: {
    *getData({ params }, { call, put }) {
      const { Data, State } = yield call(service.getData(params));
      yield put({
        type: 'setState',
        params,
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
