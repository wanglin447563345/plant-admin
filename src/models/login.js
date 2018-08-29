import { routerRedux } from 'dva/router';
import { Login } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import MD5 from 'md5'
import Cookie from 'js-cookie'
import { message } from "antd"

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const params={
        user_name:payload.user_name,
        password:MD5(payload.password),
      };
      const response = yield call(Login, params);
      if (response.errno === 0) {
        Cookie.set("user_info",response.data);
        window.location.href='/center/dashboard/analysis'; // 注：这里用routerRedux.push()会有问题
      }else {
        message.error(response.errmsg)
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'admin',
        },
      });

      // reloadAuthorized();
      // const urlParams = new URL(window.location.href);
      // console.log('urlParams:' + urlParams)
      // const params = getPageQuery();
      // let { redirect } = params;
      // if (redirect) {
      //   const redirectUrlParams = new URL(redirect);
      //   console.log('redirectUrlParams:' + redirectUrlParams)
      //   if (redirectUrlParams.origin === urlParams.origin) {
      //     redirect = redirect.substr(urlParams.origin.length);
      //     if (redirect.startsWith('/#')) {
      //       redirect = redirect.substr(2);
      //     }
      //   } else {
      //     window.location.href = redirect;
      //     return;
      //   }
      // }

      // Login successfully

    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/center/user/login',
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
