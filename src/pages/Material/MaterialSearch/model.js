import service from './service';

export default {
  namespace: 'materialSearch',
  state: {
    data: [], // 材料数据
    formRef: {},
    rowData: {}, // 选择材料行
    title: '',
    isInvalid: true, // 是否有效
    keyWords: '',

    scenes: [], // 应用场景
    types: [], // 自愈类型列表
  },
  effects: {
    *materialSearch({ params = {} }, { call, put }) {
      const { Data, State } = yield call(service.materialSearch, params);
      yield put({
        type: 'setState',
        params: { data: Data || [] },
      });
      return { Data, State };
    },
    *getSceneAndTypeList({ params }, { call, put }) {
      const { Data, State } = yield call(service.getSceneAndTypeList, params);
      yield put({
        type: 'setState',
        params: { scenes: Data.scenes || [], types: Data.types || [] },
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
