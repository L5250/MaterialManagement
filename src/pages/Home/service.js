import request from '@/utils/request';

async function getData(params) {
  return request(`/api/ActionApi/MaterialManage/GetMaterialRecords`, { params });
}

export default { getData };
