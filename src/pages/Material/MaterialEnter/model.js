import service from './service';

export default {
  namespace: 'materialEnter',
  state: {
    data: [{ name: 1 }],
    formRef: {},
    rowData: {},
    title: ""
  },
  effects: {
    *getData({ params }, { call, put }) {
      const response = yield call(service.getData(params));
      yield put({
        type: 'setData',
        params,
      });
    },
  },
  reducers: {
    setState: (state, { params }) => {
      return { ...state, ...params };
    },
  },
};
