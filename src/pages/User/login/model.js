import { stringify } from 'querystring';
import { history } from 'umi';
import { message } from 'antd';
import service from './service';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(service.login, payload);
      console.log(response)
      yield put({
        type: 'changeLoginStatus',
        payload: response.Data,
      }); // Login successfully

      if (response.State) {
        if (!response.Data.IsValid) {
          message.error("用户已禁用，不可登录！")
          return
        }
        if (response.Data.IsDeleted) {
          message.error("用户已删除，不可登录！")
          return
        }
        localStorage.setItem("userInfo", JSON.stringify(response.Data))
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('登录成功！');
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
        localStorage.removeItem("userInfo")
        localStorage.setItem("antd-pro-authority",'')
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.IsAdmin ? "admin" : "");
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
