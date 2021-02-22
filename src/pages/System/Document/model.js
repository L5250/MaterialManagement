import service from './service';

export default {
  namespace: 'document',
  state: {
    data: [{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},],
    formRef: {},
    rowData: {},
    title: "",
    year: 0,
    keyWords: '',
  },
  effects: {

    // 获取文献列表
    *getData({ params }, { call, put }) {
      const response = yield call(service.getData(params));
      yield put({
        type: 'setData',
        params: { data: [{ a: 1 }] },
      });
    },

    // 保存文献列表
    *saveLiter({ params }, { call, put }) {
      const response = yield call(service.saveLiter(params));
      yield put({
        type: 'setData',
        params: { data: [{ a: 1 }] },
      });
    },

    // 删除文献列表
    *deleteLiter({ params }, { call, put }) {
      const response = yield call(service.deleteLiter(params));

    },
  },
  reducers: {
    setState: (state, { params }) => {
      return { ...state, ...params };
    },
  },
};
