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

export default { getData }
