import request from '@/utils/request';

async function getData(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}


export default { getData };
