import { inverter_list } from '../services/api';

export default {
  namespace: 'inverter_list',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *inverter_list({ payload }, { call, put }) {
      // const params={}
      const response = yield call(inverter_list, payload);
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
