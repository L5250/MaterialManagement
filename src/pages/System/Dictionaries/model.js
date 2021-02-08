import service from './service';

export default {
  namespace: 'dictionaries',
  state: {
    data: [{ name: 1 }],
    formRef: {},
    rowData: {},
    title: '',
  },
  effects: {
    *getData({ params }, { call, put }) {
      const response = yield call(service.getData(params));
      yield put({
        type: 'setData',
        params,
      });
    },
    //
    *text({ params }, { call, put }) {
      console.log(1111);
      const response = yield call(service.text, params);
      console.log(response);
      yield put({
        type: 'setData',
        params,
      });
      return response;
    },
  },
  reducers: {
    setState: (state, { params }) => {
      return { ...state, ...params };
    },
  },
};
