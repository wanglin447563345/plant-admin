import { position } from '../services/api';

export default {
  namespace: 'dashboard',

  state: {
  },

  effects: {
    *position({ payload }, { call, put }) {
      // const params={}
      const response = yield call(position, payload);
      return response.data.data
    },
  },

};
