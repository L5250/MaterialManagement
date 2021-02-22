import service from './service';

export default {
  namespace: 'materialManager',
  state: {
    data: [
      {
        key: 1,
        MaterialName: 111,
        LiterIds: "FBA61D48-A84A-4B15-8EE1-F956EAE7C9FF,122s",
        MaterialEName: 1
      }
    ],// 材料数据
    formRef: {},
    rowData: {},// 选择材料行
    title: '',
    isInvalid: 1,// 是否有效
    keyWords: '',
    literData: [
      {
        "LiterId": "FBA61D48-A84A-4B15-8EE1-F956EAE7C9FF",
        "LiterCode": "10.3969/j.cn.34-1080(s).2006.03.015",
        "LiterYear": 2006,
        "LiterName": "中华人民共和国国家质量监督检验检疫总局, 中国国家标准化管理委员会. 2005. GB/T 7714—2005文后参考文献著录规则. 北京: 中国标准出版社.",
        "CreateDate": " 2020-01-02 12:24:36",
        "IsValid": 1,
        "Remark": ""
      }
    ],// 文献数据
    literKeys: [],// 文献选择行id
    literRows: [],// 文献选择行数据
  },
  effects: {
    *getData({ params }, { call, put }) {
      const { Data, State } = yield call(service.getData(params));
      console.log(params)
      // return response
      return { data: Data, state: State }
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
