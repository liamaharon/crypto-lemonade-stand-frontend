import Vue from "vue";
import Vuex from "vuex";
import request from "./utils/request";
import router from './router';
import { pathToFileURL } from "url";

Vue.use(Vuex);

const moduleSignup = {
  state: {
    signingUp: false,
    signupError: null
  },
  mutations: {
    initSignup(state) {
      state.signingUp = true;
    },
    signupSuccess(state) {
      state.signingUp = false;
      state.signupError = null
    },
    signupFailed(state, err) {
      state.signingUp = false;
      state.signupError = err
    }
  },
  actions: {
    async signUp({ commit }, data) {
      commit('initSignup');
      try {
        await request('post', '/accounts', data);
        commit('signupSuccess');
        router.push('login&signup-success=true');
      } catch (err) {
        commit('signupFailed', err.message);
      }
    }
  }
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    signup: moduleSignup
  },
  strict: true,
});
