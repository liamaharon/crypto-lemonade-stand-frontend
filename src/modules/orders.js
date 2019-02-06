import request from '../utils/request';

export default {
  state: {
    data: [],
    loading: false,
    error: null,
    ordersUpdating: {} 
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
    },
    initUpdateOrder(state, orderId) {
      state.ordersUpdating = {...state.ordersUpdating, [orderId]: true};
    },
    updateOrderSuccess(state, {orderId, newOrder}) {
      const orderIndex = state.data.findIndex((order) => order.id === orderId);
      const newData = [...state.data];
      newData[orderIndex] = newOrder;
      const newOrdersUpdating = {...state.ordersUpdating};
      delete newOrdersUpdating[orderId];

      state.data = newData;
      state.ordersUpdating = newOrdersUpdating;
      state.error = null;
    },
    updateOrderFailed(state, orderId, err) {
      const newOrdersUpdating = {...state.ordersUpdating};
      delete newOrdersUpdating[orderId];

      state.error = err;
      state.ordersUpdating = newOrdersUpdating;
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
    },
    async updateOrder({ commit, rootState }, {orderId, newOrder}) {
      commit('initUpdateOrder', orderId);
      try {
        const method = 'put';
        const path = `/orders/${orderId}`;
        const token = rootState.auth.loggedInUser.authToken;
        // simulate some network delay
        setTimeout(async () => {
          const res = await request({ method, path, token, data: newOrder });
          commit('updateOrderSuccess', {orderId, newOrder: res.data});
        }, 1000);
      } catch (err) {
        commit('updateOrderFailed', err);
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
