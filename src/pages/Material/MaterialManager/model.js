import service from './service';

export default {
  namespace: 'materialManager',
  state: {
    data: [],// 材料数据
    formRef: {},
    rowData: {},// 选择材料行
    title: '',
    isInvalid: true,// 是否有效
    keyWords: '',
    literData: [],// 文献数据
    literKeys: [],// 文献选择行id
    literRows: [],// 文献选择行数据

    // imageUrl64: '',// 图片
    isAddLiter: false,// 是否新增文献
    isEditor: false,// 是否编辑富文本
  },
  effects: {
    *getData({ params }, { call, put }) {
      const { Data, State } = yield call(service.getData, params);
      yield put({
        type: "setState",
        params: { data: Data || [] }
      })
      return { Data, State }
    },
    * saveMaterialRecord({ params }, { call, put }) {
      const { Data, State } = yield call(service.saveMaterialRecord, params);
      return { Data, State }
    },
    * deleteMaterialRecord({ params }, { call, put }) {
      const { Data, State } = yield call(service.deleteMaterialRecord, params);
      return { Data, State }
    },
    // 查询材料引用的文献信息
    *getLiterInfo({ params }, { call, put }) {
      const { Data, State } = yield call(service.getLiterInfo, params);
      yield put({
        type: "setState",
        params: { literData: Data || [] }
      })
      return { Data, State }
    },
    *getValidLiterInfo({ params }, { call, put }) {
      const { Data, State } = yield call(service.getValidLiterInfo, params);
      yield put({
        type: "setState",
        params: { literData: Data || [] }
      })
      return { Data, State }
    }
  },
  reducers: {
    setState: (state, { params }) => {
      return { ...state, ...params };
    },
  },
};
