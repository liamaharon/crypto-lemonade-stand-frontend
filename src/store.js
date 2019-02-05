import Vue from "vue";
import Vuex from "vuex";

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
    signUp({ commit }) {
      commit('initSignup');
      try {
        // TODO make request
        commit('signupSuccess');
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
