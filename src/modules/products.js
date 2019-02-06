import request from '../utils/request';
// import router from '../router';

export default {
  state: {
    data: {},
    loading: false,
    error: null
  },
  mutations: {
    initFetchProducts(state) {
      state.loading = true;
    },
    fetchProductsSuccess(state, data) {
      state.loading = false;
      state.error = null;
      // convert array into object with 'id' as the key
      const productsObj = data.reduce((acc, cur) => ({...acc, [cur.id]: cur}), {});
      state.data = productsObj;
    },
    fetchProductsFailed(state, err) {
      state.loading = false;
      state.error = err;
      state.data = {};
    }
  },
  actions: {
    async fetchProducts({ commit, rootState }, accountId) {
      commit('initFetchProducts', accountId);
      try {
        const method = 'get';
        const path = '/products';
        const token = rootState.auth.loggedInUser.authToken;
        const res = await request({ method, path, token });
        commit('fetchProductsSuccess', res.data);
      } catch (err) {
        commit('fetchProductsFailed', err);
      }
    }
  }
};
