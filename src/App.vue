<template>
  <div id="app">
    <h1>{{ $t('message.Title') }}</h1>
    <div>
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <router-link to="/users" class="nav-item nav-link" active-class="activo"><a id="nav-users-tab" data-toggle="tab" href = "users"  role="tab" aria-controls="nav-users" aria-selected="true">{{ $t('message.Users') }}</a></router-link>
        <router-link to="/roles" class="nav-item nav-link" active-class="activo"><a  id="nav-roles-tab" data-toggle="tab" href="roles" role="tab" aria-controls="nav-roles" aria-selected="false">{{ $t('message.Roles') }}</a></router-link>
        <router-link to="/privileges" class="nav-item nav-link" active-class="activo"><a  id="nav-privileges-tab" data-toggle="tab" href="privileges" role="tab" aria-controls="nav-privileges" aria-selected="false">{{ $t('message.Privileges') }}</a></router-link>

        <a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" @click="Spanish"><img :src="require('./assets/spanish.png')"/></a>
        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" @click="English"><img :src="require('./assets/english.jpg')"/></a>

        <div v-if="$store.state.authenticated" class="user">
          <span>{{ $t('message.User') }}: {{this.$store.state.user}}</span>
          <router-link to="/login" class="nav-item nav-link" active-class="activo" v-on:click.native="logout()" replace>{{ $t('message.Logout') }}</router-link>
        </div>
      </div>
    </nav>
    
    </div>
    <router-view @authenticated="setAuthenticated"></router-view>
  </div>
</template>

<script>

import {store} from './main.js'

export default {
  name: 'app',
  methods: {
    switchLocale() {
      this.$i18n.locale === 'es' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'es'
    },
    Spanish() {
      this.$i18n.locale = 'es'
    },
    English() {
      this.$i18n.locale = 'en'
    },
    setAuthenticated(status) {
      this.$store.commit("setAuthenticated", status);
    },
    logout() {
      this.$store.commit("setAuthenticated", false);
      this.$store.commit("setUser", "");
      this.$store.commit("setToken", "");
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.activo a {
  color: blue;
  font-weight: bold
}

img {
  width: 40px;
  height: 30px;
}

.user {
  text-align: right;
  margin-left: 50%;
}
.user span {
  font-weight: bold;
}
</style>
