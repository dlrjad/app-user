import Vuew from 'vue';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: "",
    token: "",
    authenticated: ""
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
    }
  }
})