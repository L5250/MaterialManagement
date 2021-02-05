import request from '@/utils/request';

// export async function getData(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
async function getData(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
async function text(param = {}) {
  console.log(222);
  return request('/api/users', { params: param });
}

export default { getData, text };
