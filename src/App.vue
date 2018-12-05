<template>
  <div id="app">
    <div>
      <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <router-link to="/home"><b-navbar-brand><img :src="require('./assets/logo.png')" :alt="$t('message.Title')"/></b-navbar-brand></router-link>

        <b-collapse is-nav id="nav_collapse">

          <div v-if="$store.state.authenticated">
            <b-navbar-nav class="menu">
              <router-link to="/users"><a>{{ $t('message.Users') }}</a></router-link>
              <router-link to="/roles"><a>{{ $t('message.Roles') }}</a></router-link>
              <router-link to="/privileges"><a>{{ $t('message.Privileges') }}</a></router-link>
            </b-navbar-nav>
          </div>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <a class="nav-item nav-link" active-class="activo" id="nav-spanish-tab" data-toggle="tab" href="#nav-spanish" role="tab" aria-controls="nav-spanish" aria-selected="true" @click="switchLocale('es')"><img :src="require('./assets/img/spanish.png')"/></a>
            <a class="nav-item nav-link" id="nav-english-tab" data-toggle="tab" href="#nav-english" role="tab" aria-controls="nav-english" aria-selected="false" @click="switchLocale('en')"><img :src="require('./assets/img/england.png')"/></a>

            <div v-if="$store.state.authenticated">
              <b-nav-item-dropdown right class="menuUser">
                <!-- Using button-content slot -->
                <template slot="button-content">
                  <em><span>{{ $t('message.User') }}: {{this.$store.state.user}}</span></em>
                </template>
                <div class="menuUser">
                  <b-dropdown-item href="#">Profile</b-dropdown-item>
                  <router-link to="/login" v-on:click.native="logout()" replace><b-dropdown-item href="logout">{{ $t('message.Logout') }}</b-dropdown-item></router-link>
                </div>
              </b-nav-item-dropdown>
            </div>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>

    <router-view @authenticated="setAuthenticated"></router-view>
  </div>
</template>

<script>

import {store} from './main.js'

import ManagementCookie from './utils/CookiesManagement'
const managementCookie = new ManagementCookie();

export default {
  name: 'app',
  created() {
    let username = managementCookie.getCookie("cookieUserName")
    let user = managementCookie.getCookie("cookieUser")
    if(username!="") {
      this.$store.commit("setAuthenticated", true);
      this.$store.commit("setUser", username);
      this.$store.commit("setToken", user);
      this.$router.replace({ name: "users" });
    }
  },
  methods: {
    switchLocale(lang) {
      this.$i18n.locale = lang
      //this.$i18n.locale === 'es' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'es'
    },
    setAuthenticated(status) {
      this.$store.commit("setAuthenticated", status);
    },
    logout() {
      this.$store.commit("setAuthenticated", false);
      this.$store.commit("setUser", "");
      this.$store.commit("setToken", "");
      managementCookie.deleteCookie("cookieUser");
      managementCookie.deleteCookie("cookieUserName");
    }
  }
}
</script>

<style>
@import url('../static/style/main.css');
</style>
