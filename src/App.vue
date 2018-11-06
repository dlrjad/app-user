<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h1>{{ $t('message.Title') }}</h1>
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <router-link to="/users" class="nav-item nav-link" active-class="activo"><a id="nav-users-tab" data-toggle="tab" href = "#nav-roles"  role="tab" aria-controls="nav-users" aria-selected="true">{{ $t('message.Users') }}</a></router-link>
        <router-link to="/roles" class="nav-item nav-link" active-class="activo"><a  id="nav-roles-tab" data-toggle="tab" href="#nav-roles" role="tab" aria-controls="nav-roles" aria-selected="false">{{ $t('message.Roles') }}</a></router-link>
        <router-link to="/privileges" class="nav-item nav-link" active-class="activo"><a  id="nav-privileges-tab" data-toggle="tab" href="#nav-privileges" role="tab" aria-controls="nav-privileges" aria-selected="false">{{ $t('message.Privileges') }}</a></router-link>

        <a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" @click="Spanish"><img :src="require('./assets/spanish.png')"/></a>
        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" @click="English"><img :src="require('./assets/english.jpg')"/></a>

      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import User from './views/User.vue'
import Role from './views/Role.vue'
import Privilege from './views/Privilege.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'app-user',
    }
  },
  components: {
    User,
    Role,
    Privilege
  },
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
  width: 100px;
  height: 80px;
}
</style>
