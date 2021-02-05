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
async function text(param = { sv: 200, tid: 'gda', tv: 'r20210202', st: 'env' }) {
  console.log(222);
  return request('/api/getconfig/sodar', { params: param });
}

export default { getData, text };
