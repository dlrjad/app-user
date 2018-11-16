import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: "",
    token: "",
    authenticated: "",
    cookie: "",
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    setAuthenticated(state, flag) {
      state.authenticated = flag
    },
    setCookie(state, token) {
      document.cookie = "cookieUser=" + token+"; max-age=3600";
    },
    deleteCookie(state) {
      document.cookie = "cookieUser=; max-age=0"; //eliminar cookie
    }
  }
})