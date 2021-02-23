import request from '@/utils/request';

// export async function getData(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
async function getData(params) {
  return request(`/api/ActionApi/LiterManage/GetLiterList`, { params });
}

async function saveLiter(params) {
  console.log(params)
  return request(`/api/ActionApi/LiterManage/SaveLiterInfo`, { method: 'POST', data: params });
}

async function deleteLiter(params) {
  return request(`/api/ActionApi/LiterManage/DeleteLiter`, { params });
}

export default { getData, saveLiter, deleteLiter }
