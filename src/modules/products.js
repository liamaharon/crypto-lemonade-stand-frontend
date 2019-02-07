import request from '../utils/request';
// import router from '../router';

export default {
  state: {
    data: {},
    loading: false,
    error: null,
    productsUpdating: {}
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
    },
    initUpdateProduct(state, productId) {
      state.productsUpdating = {...state.productsUpdating, [productId]: true};
    },
    updateProductSuccess(state, {productId, newProduct}) {
      const newProductsUpdating = {...state.productsUpdating};
      delete newProductsUpdating[productId];

      state.data = {...state.data, [productId]: newProduct};
      state.productsUpdating = newProductsUpdating;
      state.error = null;
    },
    updateProductFailed(state, productId, err) {
      const newProductsUpdating = {...state.productsUpdating};
      delete newProductsUpdating[productId];

      state.error = err;
      state.productsUpdating = newProductsUpdating;
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
    },
    async updateProduct({ commit, rootState }, {productId, newProduct}) {
      commit('initUpdateProduct', productId);
      try {
        const method = 'put';
        const path = `/products/${productId}`;
        const token = rootState.auth.loggedInUser.authToken;
        // simulate some network delay
        setTimeout(async () => {
          const res = await request({ method, path, token, data: newProduct });
          commit('updateProductSuccess', {productId, newProduct: res.data});
        }, 1000);
      } catch (err) {
        commit('updateProductFailed', err);
      }
    }
  }
};
