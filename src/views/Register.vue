<template>
  <section class="sectionRegister">
    <form class="formRegister" data-css action="">
      <div id="register">
        <h4>{{ $t('message.Register') }}</h4>
        <div class="form-group">
          <input v-model="input.userName" :placeholder="$t('message.name')">
        </div>
        <div class="form-group">
          <input type="email" v-model="input.userMail" placeholder="email">
        </div>
        <div class="form-group">
          <input type="password" v-model="input.password" :placeholder="$t('message.password')">
        </div>
        <div class="form-group">
          <input type="password" v-model="input.confirmPassword" :placeholder="$t('message.confirmPassword')">
        </div>
        <button type="button" class="btn btn-success" @click="register()">{{ $t('message.Register') }}</button>
        <Alert class="msnError" v-if="messageError" :message="messageError" @close-window="close"></Alert>
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
        password: "",
        confirmPassword: "",
      },
      messageError: null
    };
  },
  methods: {
    register() {
      if(this.input.password != this.input.confirmPassword) {
        //alert("contraseñas no coinciden")
        this.messageError = "Password y confirmar password deben coincidir"
      }else {
        //console.log(this.input.userName, this.input.password, this.input.userMail)
        restApiServices.registerUser(this.input.userName, this.input.password, this.input.userMail).then(res => {
          console.log(res.data)
        })
        .catch(
          error => {
            console.log(error),
            //alert(error)
            this.showError()
          }
        )
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