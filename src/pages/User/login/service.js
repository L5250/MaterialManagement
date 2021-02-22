import request from '@/utils/request';

// export async function getData(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }

async function login(param = {}) {
  console.log(222);
  return request('/api/ActionApi/Login/GetUserInfo', { params: param });
}

export default { login };
