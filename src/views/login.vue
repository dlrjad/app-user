<template>
  <section class="sectionLogin">
    <form class="formLogin">
      <div id="login">
        <h4>{{ $t('message.Login') }}</h4>
        <div class="form-group">
          <label>Email</label>
          <input type="mail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="mail" v-model="input.mail" placeholder="Mail" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" name="password" v-model="input.password" placeholder="Password" @keyup.enter="login" />
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label">{{ $t('message.rememberPassword') }}</label>
        </div>
        <button type="button" class="btn btn-primary" @click="login()">{{ $t('message.Login') }}</button>
        <Alert class="msnError" v-if="messageError" :message="messageError" @close-window="close"></Alert>
      </div>
    </form>
    <Register></Register>
  </section>
</template>

<script>

import UserServices from '../services/UserServices';
import Alert from '../components/MessageComponent';
import Register from './Register';
import ManagementCookie from '../utils/CookiesManagement';

import {store} from '../main.js';

const restApiServices = new UserServices();
const managementCookie = new ManagementCookie();

export default {
  name: "Login",
  data() {
    return {
      input: {
        mail: "",
        password: ""
      },
      messageError: null
    };
  },
  methods: {
    login() {
      if (this.input.mail != "" && this.input.password != "") {
        restApiServices.getUserByMailPassword(this.input.mail, this.input.password).then(res => {
          
          if((!res.data.isNullOrUndefined) ) {

            //let userData = JSON.parse(res.config.data)

            this.$emit("authenticated", true);
            this.$store.commit("setUser", res.data.name);
            //this.$store.commit("setUserMail", userData.mail);
            this.$store.commit("setToken", res.data.token);
            managementCookie.setCookie("cookieUser", res.data.token);
            managementCookie.setCookie("cookieUserName", res.data.name);
            this.$router.replace({ name: "users" });
            
          }
        }).catch(
          error => {
            this.messageError = "The mail and / or password is incorrect"
          }
        )

      } else {
        //this.messageError = "{{$t('message.errorNotDataLogin')}}"
        this.messageError = "You must enter mail and password"
      }
    },
    close() {
      this.messageError = null
    },
  },
  components: {
    Alert,
    Register
  }
};
</script>

<style scoped>
.sectionLogin {
  display: flex;
  flex-direction: row;
  margin: 0 15%;
}

.formLogin {
  margin-top: 100px;
  margin-right: 13%;
}

#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
}

#login label, #login .form-check {
  display: flex;
  align-items: left;
}

.btn {
  margin: 5px 0;
  padding: 8px;
  width: 130px;
}

.msnError {
  margin-top: 15px;
  width: 40%;
  margin-left: 30%;
}
</style>