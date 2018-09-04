import {verifyUser} from "../utils/utils"
import {company_stat} from '../services/api'

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    company_stat:{},
  },

  effects: {
    *company_stat({ payload }, { call, put }) {
      const response = yield call(company_stat, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        company_stat: action.payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      if(history.location.pathname==='/center/user/login') {

      }else {
        verifyUser(dispatch)
      }
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
