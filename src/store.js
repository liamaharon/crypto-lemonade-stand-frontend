import Vue from "vue";
import Vuex from "vuex";
import {
  login,
  signup
} from './modules';
import request from "./utils/request";
import router from './router';
import { pathToFileURL } from "url";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    signup,
    login,
  },
  strict: true,
});
