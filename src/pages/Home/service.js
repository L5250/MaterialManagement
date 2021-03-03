import request from '@/utils/request';

// 获取最近新建的5条材料
async function getDataTop5(params) {
  return request(`/api/ActionApi/MaterialManage/GetMaterialTop5Records`, { params });
}
// 获取材料引用文献次数
async function getLiterToMaterialCount(params) {
  return request(`/api/ActionApi/MaterialManage/GetLiterToMaterialCount`, { params });
}
// 获取文献年份计数统计
async function getLiterPerYearCount(params) {
  return request(`/api/ActionApi/MaterialManage/GetLiterPerYearCount`, { params });
}
// 应用场景占比图
async function getAppliSceneDist(params) {
  return request(`/api/ActionApi/MaterialManage/GetAppliSceneDist`, { params });
}

export default { getDataTop5, getLiterToMaterialCount, getLiterPerYearCount, getAppliSceneDist };
