import { weather_raw } from '../services/api';

export default {
  namespace: 'weather_raw',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *weather_raw({ payload }, { call, put }) {
      // const params={}
      const response = yield call(weather_raw, payload);
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
