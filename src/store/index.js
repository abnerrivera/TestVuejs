import { createStore } from 'vuex';

export default createStore({
  state: {
    user: [],
    username: null,
    auth: false,
    msg: 'desde Vuex',
  },
  mutations: {
    doLogin(state, username) {
      state.auth = true;
      state.username = username;
    },
    doLogout(state) {
      state.auth = false;
      state.username = null;
    },
    doToken(state) {
      state.auth = true;
    },
  },
  actions: {
    doLogin({ commit }, username) {
      commit('doLogin', username);
    },
    doLogout({ commit }) {
      commit('doLogout');
    },
    doToken({ commit }) {
      commit('doToken');
    },
  },
  getters: {
    message(state) {
      return state.msg;
    },
  },
  modules: {},
});
