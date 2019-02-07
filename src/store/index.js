import Vue from "vue";
import Vuex from "vuex";
import {
  auth,
  signup,
  orders,
  products
} from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    signup,
    auth,
    orders,
    products
  },
  strict: true,
});
