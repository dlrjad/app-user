<template>
    <div id="login">
        <h1>Login</h1>
        <form>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" @keyup.enter="login" />
        <button type="button"   class="btn btn-primary" @click="login()">Login</button>
        </form>
    </div>
</template>

<script>

import UserServices from '../services/UserServices';
import { isUndefined } from 'util';
const restApiServices = new UserServices();

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        restApiServices.getUserByNamePassword(this.input.username, this.input.password).then(res => {
          //console.log(res.data.roles)
          this.user = res.data
          console.log(this.user)
          if((!this.user.isNullOrUndefined) && (!this.user.name.isUndefined)) {
            this.$emit("authenticated", true);
            this.$router.replace({ name: "users" });
          }
        }).catch(
          error => {
            console.log(error),
            console.log("The username and / or password is incorrect");
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