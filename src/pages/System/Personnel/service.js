import request from '@/utils/request';

// export async function getData(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
async function getAllUsers(params) {
  return request(`/api/ActionApi/UserInfo/GetAllUsers`, { params });
}
async function deleteUserInfo(params) {
  return request(`/api/ActionApi/UserInfo/DeleteUserInfo`, { params });
}
async function saveUserInfo(params) {
  return request(`/api/ActionApi/UserInfo/SaveUserInfo`, { method: "POST", data: params });
}

export default { getAllUsers, deleteUserInfo, saveUserInfo };
