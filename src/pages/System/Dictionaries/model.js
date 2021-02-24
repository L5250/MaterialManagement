import service from './service';

export default {
  namespace: 'dictionaries',
  state: {
    dicSortsData: [],// 字典分类列表
    dicItemData: [],// 字典项列表
    formRef: {},
    formDicItemRef: {},
    rowData: {},
    rowItemData:{},
    title: '',
  },
  effects: {
    // 获取字典分类列表
    *getDictSorts({ params }, { call, put }) {
      const { Data, State } = yield call(service.getDictSorts, params);
      yield put({
        type: 'setState',
        params: { dicSortsData: Data },
      });
      return { Data, State }
    },

    // 删除字典分类
    *deleteDictSort({ params }, { call, put }) {
      const { Data, State } = yield call(service.deleteDictSort, params);
      yield put({
        type: 'setState',
        params,
      });
      return { Data, State }
    },
    // 保存字典分类
    *saveDictSort({ params }, { call, put }) {
      const { Data, State } = yield call(service.saveDictSort, params);
      return { Data, State }
    },
    // 根据字典分类ID获取字典项列表
    *getDictItems({ params }, { call, put }) {
      const { Data, State } = yield call(service.getDictItems, params);
      yield put({
        type: 'setState',
        params: { dicItemData: Data },
      });
      return { Data, State }
    },
    // 删除字典项
    *deleteDictItem({ params }, { call, put }) {
      const { Data, State } = yield call(service.deleteDictItem, params);
      yield put({
        type: 'setState',
        params,
      });
      return { Data, State }
    },
    // 保存字典项
    *saveDictItem({ params }, { call, put }) {
      const { Data, State } = yield call(service.saveDictItem, params);
      yield put({
        type: 'setState',
        params,
      });
      return { Data, State }
    },

  },
  reducers: {
    setState: (state, { params }) => {
      return { ...state, ...params };
    },
  },
};
