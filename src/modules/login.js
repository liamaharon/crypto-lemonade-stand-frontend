import request from '../utils/request';
// import router from '../router';

export default {
  state: {
    loggingIn: false,
    loginError: null
  },
  mutations: {
    initLogin(state) {
      state.loggingIn = true;
    },
    loginSuccess(state) {
      state.loggingIn = false;
      state.loginError = null
    },
    loginFailed(state, err) {
      state.loggingIn = false;
      state.loginError = err
    }
  },
  actions: {
    async login({ commit }, data) {
      commit('initLogin');
      try {
        await request('post', '/accounts/login', data);
        commit('loginSuccess');
      } catch (err) {
        let errMsg = err.message;
        if (err.message.includes('401')) {
          errMsg = "Invalid email or password"
        }
        commit('loginFailed', errMsg);
      }
    }
  }
}
