<template>
  <section id="data" data-css>
    <h2>{{ $t('message.userData') }} {{this.user.user_id}}</h2>
    <ul>
      <li>{{ $t('message.name') }}: {{ this.user.name }}</li>
      <li>Email: {{ this.user.mail }}</li>
      <div class=clear></div>
      <span>{{ $t('message.Roles') }}:</span>
      <ul v-for="(role, index) in this.checkedNames" :key="index">
        <li>
          {{ role.name }}
        </li>
      </ul>
    </ul>

    <div class="formAssign">
      <h2>{{ $t('message.rolesAssign') }}:</h2>

      <div v-for="(role, index) in roles" :key="index">
        <input type="checkbox" :id="role.role_id" :value="role" v-model="checkedNames">
        <label :for="role.name">{{role.role_id}} {{role.name}}</label>
      </div>
      <button type="button" class="btn btn-primary" @click="assignRole(user.user_id, user.name, user.password, user.mail)">{{ $t('message.Assign') }}</button>
    </div>

    <div class=clear></div>

    <div class="formUpdate">
      <form @keyup.enter="updateUser(user.user_id, userName, user.password, userMail)">
        <h4>{{ $t('message.updateUser') }}</h4>
        <div class="form-group">
          <input type="text" class="form-control" :placeholder="$t('message.name')" v-model="user.name">
        </div>
        <div class="form-group">
          <input type="email" class="form-control" placeholder="email" v-model="user.mail">
        </div>
        <button type="button" class="btn btn-success" @click="updateUser(user.user_id, user.name, user.password, user.mail)">{{ $t('message.Accept') }}</button>
      </form>
    </div>

    <div class=clear></div>

    <div class="formChangePassword">
      <form @keyup.enter="changePassword(user.user_id, userName, userMail)">
        <h4>{{ $t('message.changePassword') }}</h4>
        <div class="form-group">
          <label>{{ $t('message.Password') }}</label>
          <input type="password" class="form-control" name="password" v-model="input.password" :placeholder="$t('message.Password')" />
        </div>
        <div class="form-group">
          <label>{{ $t('message.ConfirmPassword') }}</label>
          <input type="password" class="form-control" name="password" v-model="input.confirmPassword" :placeholder="$t('message.ConfirmPassword')"  />
        </div>
        <button type="button" class="btn btn-success" @click="changePassword(user.user_id, userName, userMail)">{{ $t('message.Accept') }}</button>
      </form>
    </div>

    <Alert class="msnError" v-if="messageError" :message="messageError" @close-window="close"></Alert>

    <div class="alert alert-danger" v-show="error">
      <strong>Error...</strong> {{ $t('message.permits') }}
    </div>

  </section>
  
</template>

<script>
import axios from 'axios'

import UserServices from '../services/UserServices';
const restApiServices = new UserServices();

import RoleServices from '../services/RoleServices';
const restApiServices_ = new RoleServices();

import Alert from '../components/MessageComponent';

export default {
  mounted() {
    this.error = false
    restApiServices.getUser(this.id).then(res => {
      //console.log(res.data.roles)
      this.user = res.data
      res.data.roles.forEach(e => {
        this.checkedNames.push(e)
      });
    })
    .catch(
      error => {
        console.log(error),
        //alert(error)
        this.error = true
      }
    )

    restApiServices_.getRoles().then(
      roles => {
        this.roles = roles.data
      }
    ).catch(
      error => {
        console.log(error),
        //alert(error)
        this.error = true
      }
    )
  },
  data() {
    return {
      id: this.$route.params.id,
      userName: null,
      userMail: null,
      user: [],
      roles: [],
      role: {},
      assignRoles: [],
      checkedNames: [],
      error: false,
      messageError: null,
      input: {
        password: null,
        confirmPassword: null
      },
    }
  },
  methods: {
    assignRole(id, name, password, mail) {
      this.managementUpdateUser(id, name, password, mail)
    },
    updateUser(id, name, password, mail) {
      if(name == "" || mail == "" || name == null || mail == null) {
        this.$i18n.locale == "es" ? this.messageError = "debes indicar nombre y/o email": this.messageError = "you must enter name and email";
      } else {
        this.managementUpdateUser(id, name, password, mail)
      }
    },
    changePassword(id, name, mail) {
      if(this.input.password == "" || this.input.confirmPassword == "" || this.input.password == null || this.input.confirmPassword == null) {
        this.$i18n.locale == "es" ? this.messageError = "debes indicar contraseña y/o confirmar contraseña": this.messageError = "you must enter password and confirm password";
      } else if(this.input.password != this.input.confirmPassword) {
        this.$i18n.locale == "es" ? this.messageError = "contraseña y confirmar contraseña deben coincidir": this.messageError = "password and confirm password must match";
      } else{
        this.managementUpdateUser(id, name, this.input.password, mail)
      }
    },
    managementUpdateUser(id, name, password, mail) {
      let flag = true
      for(let i=0; i<this.checkedNames.length; i++) {
        flag = false
        //console.log(this.checkedNames[i])
        restApiServices_.getRole(this.checkedNames[i].role_id).then(res => {
          //console.log(res.data)
          this.assignRoles.push(res.data)
        }).catch(
          error => {
            //console.log(error),
            //alert(error)
            this.error = true
          }
        ).then(res => {
          console.log(this.assignRoles)
          restApiServices.updateUser(id, name, password, mail, this.assignRoles).then(res => {
            //console.log("update: " + res.data)
            this.user=res.data
          })
          .catch(
            error => {
              //console.log(error),
              this.error = true
            }
          )
        })
      }
      if(flag) {
        restApiServices.updateUser(id, name, password, mail, this.assignRoles).then(res => {
          //console.log("update: " + res.data)
          this.user=res.data
        })
        .catch(
          error => {
            console.log(error),
            this.error = true
          }
        )
      }
    },
    close() {
      this.messageError = null
    }
  },
  components: {
    Alert
  }
}
</script>
