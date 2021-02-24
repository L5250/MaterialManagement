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
  return request(`/api/ActionApi/MaterialManage/SaveMaterialRecord`, { method: 'POST', params });
}
async function deleteMaterialRecord(params) {
  return request(`/api/ActionApi/MaterialManage/DeleteMaterialRecord`, { params });
}
async function getValidLiterInfo(params) {
  return request(`/api/ActionApi/MaterialManage/GetValidLiterInfo`, { params });
}

export default { getData, saveMaterialRecord, deleteMaterialRecord, getValidLiterInfo };
