import request from '../utils/request';

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
        router.push('login?signup-success=true');
      } catch (err) {
        commit('signupFailed', err.message);
      }
    }
  }
}
