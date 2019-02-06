import request from '../utils/request';
// import router from '../router';

export default {
  state: {
    data: [],
    loading: false,
    error: null
  },
  mutations: {
    initFetchOrders(state) {
      state.loading = true;
    },
    fetchOrdersSuccess(state, data) {
      state.loading = false;
      state.error = null;
      state.data = data;
    },
    fetchOrdersFailed(state, err) {
      state.loading = false;
      state.error = err;
      state.data = [];
    }
  },
  actions: {
    async fetchOrders({ commit, rootState }, accountId) {
      commit('initFetchOrders', accountId);
      try {
        const method = 'get';
        const path = '/orders';
        const token = rootState.auth.loggedInUser.authToken;
        const res = await request({ method, path, token });
        commit('fetchOrdersSuccess', res.data);
      } catch (err) {
        commit('fetchOrdersFailed', err);
      }
    }
  },
  getters: {
    ordersWithProduct: function (state, getters, rootState) {
      const orders = state.data;
      const products = rootState.products.data;
      const ordersWithProduct = orders.map((order) => {
        const product = products[order.productId] || 'loading';
        return { ...order, product };
      });
      return ordersWithProduct;
    }
  },
};
