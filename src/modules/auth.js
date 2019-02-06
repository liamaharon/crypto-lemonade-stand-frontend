import request from '../utils/request';
import router from '../router';

export default {
  state: {
    loggingIn: false,
    loginError: null,
    loggedInUser: null
  },
  mutations: {
    initLogin(state) {
      state.loggingIn = true;
    },
    loginSuccess(state, user) {
      state.loggingIn = false;
      state.loginError = null;
      state.loggedInUser = user;
    },
    loginFailed(state, err) {
      state.loggingIn = false;
      state.loginError = err;
      state.loggedInUser = null;
    },
    logout(state) {
      state.loggedInUser = null;
    }
  },
  actions: {
    async login({ commit }, payload) {
      commit('initLogin');
      try {
        const method = 'post';
        const path = '/accounts/login';
        const { data } = await request({ method, path, data: payload });
        const { userId, id } = data;
        const user = {
          email: payload.email,
          authToken: id,
          id: userId
        };
        commit('loginSuccess', user);
        router.push('/admin');
      } catch (err) {
        let errMsg = err.message;
        if (err.message.includes('401')) {
          errMsg = "Invalid email or password";
        }
        commit('loginFailed', errMsg);
      }
    },
    async logout({ commit, state }) {
      const token = state.loggedInUser.authToken;
      commit('logout');
      router.push('/');
      try {
        const method = 'post';
        const path = '/accounts/logout';
        await request({ method, path, token });
      } catch (err) {
        console.error('Error logging out on server: ', err);
      }
    }
  }
};
