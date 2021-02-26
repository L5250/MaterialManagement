import request from '@/utils/request';

// export async function getData(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
async function getData(params) {
  return request(`/api/ActionApi/MaterialManage/GetMaterialRecords`, { params });
}
async function saveMaterialRecord(params) {
  return request(`/api/ActionApi/MaterialManage/SaveMaterialRecord`, {
    method: 'POST',
    data: params,
  });
}
async function deleteMaterialRecord(params) {
  return request(`/api/ActionApi/MaterialManage/DeleteMaterialRecord`, { params });
}
// 查询材料引用的文献信息
async function getLiterInfo(params) {
  return request(`/api/ActionApi/MaterialManage/GetLiterInfo`, { params });
}
async function getValidLiterInfo(params) {
  return request(`/api/ActionApi/MaterialManage/GetValidLiterInfo`, { params });
}
// 获取应用场景和自愈类型列表
async function getSceneAndTypeList(params) {
  return request(`/api/ActionApi/MaterialManage/GetSceneAndTypeList`, { params });
}

export default {
  getData,
  saveMaterialRecord,
  deleteMaterialRecord,
  getLiterInfo,
  getValidLiterInfo,
  getSceneAndTypeList,
};
