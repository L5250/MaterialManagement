import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getData(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
