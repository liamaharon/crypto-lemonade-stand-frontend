import Vue from "vue";
import Vuex from "vuex";
import {
  auth,
  signup
} from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    signup,
    auth,
  },
  strict: true,
});
