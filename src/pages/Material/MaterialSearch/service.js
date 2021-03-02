import request from '@/utils/request';

// export async function getData(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
async function materialSearch(params) {
  return request(`/api/ActionApi/MaterialManage/MaterialSearch`, { params });
}

async function getValidLiterInfo(params) {
  return request(`/api/ActionApi/MaterialManage/GetValidLiterInfo`, { params });
}
// 获取应用场景和自愈类型列表
async function getSceneAndTypeList(params) {
  return request(`/api/ActionApi/MaterialManage/GetSceneAndTypeList`, { params });
}

export default {
  materialSearch,
  getValidLiterInfo,
  getSceneAndTypeList,
};
