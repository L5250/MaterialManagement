import service from './service';

export default {
  namespace: 'document',
  state: {
    data: [],
    formRef: {},
    rowData: {},
    title: "",
    year: 0,
    keyWords: '',
  },
  effects: {

    // 获取文献列表
    *getData({ params }, { call, put }) {
      console.log(params)
      const { Data, State } = yield call(service.getData, params);
      yield put({
        type: 'setState',
        params: { data: Data },
      });
      return { Data, State }
    },

    // 保存文献列表
    *saveLiter({ params }, { call, put }) {
      const { Data, State } = yield call(service.saveLiter, params);
      // yield put({
      //   type: 'setState',
      //   params: { data: [{ a: 1 }] },
      // });
      return { Data, State }
    },

    // 删除文献列表
    *deleteLiter({ params }, { call, put }) {
      const { Data, State } = yield call(service.deleteLiter, params);
      return { Data, State }

    },
  },
  reducers: {
    setState: (state, { params }) => {
      return { ...state, ...params };
    },
  },
};
