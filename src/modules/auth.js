import request from '../utils/request';
import router from '../router';

export default {
  state: {
    loggingIn: false,
    loginError: null,
    loggedInUser: {
      email: null,
      authToken: null,
      id: null
    }
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
      state.loggedInUser = {
        email: null,
        authToken: null,
        id: null
      };
    },
    logout(state) {
      state.loggedInUser = {
        email: null,
        authToken: null,
        id: null
      };
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
        window.localStorage.setItem('user', JSON.stringify(user));
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
      window.localStorage.removeItem('user');
      commit('logout');
      router.push('/');
      try {
        const method = 'post';
        const path = '/accounts/logout';
        await request({ method, path, token });
      } catch (err) {
        console.error('Error logging out on server: ', err);
      }
    },
    async recoverUserState({commit}) {
      const user = JSON.parse(window.localStorage.getItem('user'));
      if (user.email) {
        commit('loginSuccess', user);
      }
    }
  }
};
