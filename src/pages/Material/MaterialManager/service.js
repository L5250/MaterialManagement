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
async function text(params = {}) {
  console.log(222);
  return request('/api/users', { params });
}

export default { getData, text };
