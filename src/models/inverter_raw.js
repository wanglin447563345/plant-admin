import { inverter_raw } from '../services/api';

export default {
  namespace: 'inverter_raw',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *inverter_raw({ payload }, { call, put }) {
      // const params={}
      const response = yield call(inverter_raw, payload);
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
