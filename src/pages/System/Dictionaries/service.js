import request from '@/utils/request';

// 获取字典分类列表
async function getDictSorts(params) {
  return request(`/api/ActionApi/SysSetting/GetDictSorts`, { params });
}
// 删除字典分类
async function deleteDictSort(params) {
  return request(`/api/ActionApi/SysSetting/DeleteDictSort`, { params });
}
// 保存字典分类
async function saveDictSort(params) {
  return request(`/api/ActionApi/SysSetting/SaveDictSort`, { method: "POST", data: params });
}

// 根据字典分类ID获取字典项列表
async function getDictItems(params) {
  return request(`/api/ActionApi/SysSetting/GetDictItems`, { params });
}

// 删除字典项
async function deleteDictItem(params) {
  return request(`/api/ActionApi/SysSetting/DeleteDictItem`, { params });
}

// 保存字典项
async function saveDictItem(params) {
  return request(`/api/ActionApi/SysSetting/SaveDictItem`, { method: "POST", data: params });
}



export default { getDictSorts, deleteDictSort, saveDictSort, getDictItems, deleteDictItem, saveDictItem };
