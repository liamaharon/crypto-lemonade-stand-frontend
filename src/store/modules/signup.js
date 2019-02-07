import request from '@/utils/request';
import router from '@/router';

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
      state.signupError = null;
    },
    signupFailed(state, err) {
      state.signingUp = false;
      state.signupError = err;
    }
  },
  actions: {
    async signUp({ commit }, data) {
      commit('initSignup');
      try {
        const method = 'post';
        const path = '/accounts';
        await request({ method, path, data });
        commit('signupSuccess');
        router.push(`login?signupEmail=${data.email}`);
      } catch (err) {
        commit('signupFailed', err.message);
      }
    }
  }
};
