<template>
  <section class="sectionRegister">
    <form class="formRegister" data-css action="">
      <div id="register">
        <h4>{{ $t('message.Register') }}</h4>
        <div class="form-group">
          <label>{{ $t('message.name') }}</label>
          <input class="form-control" v-model="input.userName" :placeholder="$t('message.name')">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="input.userMail" placeholder="Email" @keyup.enter="register">
        </div>
        <button type="button" class="btn btn-success" @click="register()">{{ $t('message.Register') }}</button>
        <Alert class="msnError" v-if="messageError" :message="messageError" @close-window="close"></Alert>
        <Alert class="msnError" :messageState="$t('message.Success')" error="success" v-if="messageRegister" :message="messageRegister" @close-window="close"></Alert>
      </div>
    </form>
  </section>
</template>

<script>

import UserServices from '../services/UserServices';
import Alert from '../components/MessageComponent';

import {store} from '../main.js';

const restApiServices = new UserServices();

export default {
  data() {
    return {
      input: {
        userName: "",
        userMail: "",
      },
      messageError: null,
      messageRegister: null,
    };
  },
  methods: {
    register() {
      //console.log(this.input.userName, this.input.userMail)
      if(this.input.userName=="" || this.input.userMail=="") {
        this.$i18n.locale == "es" ? this.messageError = "Debe introducir nombre y/o email" : this.messageError = "You must enter Email and/or password";
      }else {
        restApiServices.registerUser(this.input.userName, this.input.userMail).then(res => {
          //console.log(res.data)
          this.$i18n.locale == "es" ? this.messageRegister = "Usuario registrado con éxito" : this.messageRegister = "Registered user with success";
        })
        .catch(
          error => {
            this.$i18n.locale == "es" ? this.messageError = "No pudo registrarse el usuario": this.messageError = "The user couldn't register";
          }
        )
        this.input.userName = "";
        this.input.userMail = "";
      }
    },    
    close() {
      this.messageError = null,
      this.messageRegister = null
    },
  },
  components: {
    Alert
  }
};
</script>

<style scoped>
.formRegister {
  margin-top: 100px;
}

#register {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
}

#register label {
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