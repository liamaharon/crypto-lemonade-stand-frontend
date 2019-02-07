import request from '../utils/request';

export default {
  state: {
    data: [],
    loading: false,
    error: null,
    ordersUpdating: {},
    creatingOrder: false,
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
    initCreateOrder(state) {
      state.creatingOrder = true;
    },
    createOrderSuccess(state, newOrder) {
      state.creatingOrder = false;
      state.error = null;
      state.data = [...state.data, newOrder];
    },
    createOrderFailed(state, err) {
      state.creatingOrder = false;
      state.error = err;
    },
    initUpdateOrder(state, orderId) {
      state.ordersUpdating = { ...state.ordersUpdating, [orderId]: true };
    },
    updateOrderSuccess(state, { orderId, newOrder }) {
      const orderIndex = state.data.findIndex((order) => order.id === orderId);
      const newData = [...state.data];
      newData[orderIndex] = newOrder;
      const newOrdersUpdating = { ...state.ordersUpdating };
      delete newOrdersUpdating[orderId];

      state.data = newData;
      state.ordersUpdating = newOrdersUpdating;
      state.error = null;
    },
    updateOrderFailed(state, {orderId, err}) {
      const newOrdersUpdating = { ...state.ordersUpdating };
      delete newOrdersUpdating[orderId];

      state.error = err;
      state.ordersUpdating = newOrdersUpdating;
    }
  },
  actions: {
    async fetchOrders({ commit, rootState }, accountId) {
      commit('initFetchOrders');
      try {
        const method = 'get';
        let path;
        if (accountId) {
          path = `/accounts/${accountId}/orders`;
        } else {
          path = '/orders';
        }
        const token = rootState.auth.loggedInUser.authToken;
        const res = await request({ method, path, token });
        commit('fetchOrdersSuccess', res.data);
      } catch (err) {
        commit('fetchOrdersFailed', `Failed to fetch orders: ${err}`);
      }
    },
    async updateOrder({ commit, rootState }, { orderId, newOrder }) {
      commit('initUpdateOrder', orderId);
      // simulate some network delay
      setTimeout(async () => {
        try {
          const method = 'put';
          const path = `/orders/${orderId}`;
          const token = rootState.auth.loggedInUser.authToken;
          const res = await request({ method, path, token, data: newOrder });
          commit('updateOrderSuccess', { orderId, newOrder: res.data });
        } catch (err) {
          commit('updateOrderFailed', {orderId, err: `Failed to update order: ${err}`});
        }
      }, 1000);
    },
    async createOrder({ commit, rootState }, order) {
      commit('initCreateOrder');
      // simulate some network delay
      setTimeout(async () => {
        try {
          const method = 'post';
          const {authToken, id} = rootState.auth.loggedInUser;
          const path = `/accounts/${id}/orders`;
          const res = await request({ method, path, token: authToken, data: order });
          commit('createOrderSuccess', res.data);
        } catch (err) {
          commit('createOrderFailed', `Failed to update order: ${err}`);
        }
      }, 1000);
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
