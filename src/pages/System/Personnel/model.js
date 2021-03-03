import service from './service';

export default {
  namespace: 'personnel',
  state: {
    data: [],
    dataSource: [],
    formRef: {},
    rowData: {},
    title: '',
  },
  effects: {
    *getAllUsers({ params }, { call, put }) {
      const { Data, State } = yield call(service.getAllUsers, params);
      yield put({
        type: 'setState',
        params: { data: Data, dataSource: Data },
      });
      return { Data, State };
    },
    *deleteUserInfo({ params }, { call, put }) {
      const { Data, State } = yield call(service.deleteUserInfo, params);
      yield put({
        type: 'setState',
        params,
      });
      return { Data, State };
    },
    *saveUserInfo({ params }, { call, put }) {
      const { Data, State } = yield call(service.saveUserInfo, params);
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
