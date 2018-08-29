import { plant_list, removeRule, addRule } from '../services/api';

export default {
  namespace: 'plant_list',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *plant_list({ payload }, { call, put }) {
      // const params={}
      const response = yield call(plant_list, payload);
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
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
