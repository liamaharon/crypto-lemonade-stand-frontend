import request from '../utils/request';
import router from '../router';

export default {
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
        router.push('login?fromSignup=true');
      } catch (err) {
        commit('signupFailed', err.message);
      }
    }
  }
}
