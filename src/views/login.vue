<template>
  <form>
    <div id="login">
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
    </div>
    <Alert class="msnError" v-if="messageError" :message="messageError" @close-window="close"></Alert>
  </form>
</template>

<script>

import UserServices from '../services/UserServices';
import Alert from '../components/MessageComponent';

import {store} from '../main.js';

const restApiServices = new UserServices();

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
          //console.log(res.data)
          if((!res.data.isNullOrUndefined) ) {
            this.$emit("authenticated", true);
            this.$store.commit("setUser", this.input.mail);
            this.$store.commit("setToken", res.data);
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
    Alert
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
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