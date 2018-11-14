<template>
    <div id="login">
        <h1>Login</h1>
        <form>
        <input type="mail" name="mail" v-model="input.mail" placeholder="Mail" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" @keyup.enter="login" />
        <button type="button"   class="btn btn-primary" @click="login()">Login</button>
        </form>
    </div>
</template>

<script>

import UserServices from '../services/UserServices';
import { isUndefined } from 'util';
import {store} from '../main.js'

const restApiServices = new UserServices();

export default {
  name: "Login",
  data() {
    return {
      input: {
        mail: "",
        password: ""
      }
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
            console.log(error)
            console.log("The mail and / or password is incorrect")
            alert("Nombre o Password incorrecto")
          }
        )

      } else {
        console.log("A username and password must be present");
      }
    },
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
.btn {
  margin-top: 20px;
}
</style>