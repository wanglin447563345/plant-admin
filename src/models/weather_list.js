import { weather_list } from '../services/api';

export default {
  namespace: 'weather_list',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *weather_list({ payload }, { call, put }) {
      const response = yield call(weather_list, payload);
      const data={
        list:response.data.data,
        pagination:{
          total: response.data.count,
          current: response.data.currentPage,
        },
      }
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
