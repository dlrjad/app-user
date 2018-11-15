<template>
  <section class="data" data-css>
    <div v-show="!error">
      <table class="table">
        <thead class="header">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{{ $t('message.User') }}</th>
            <th scope="col">Mail</th>
            <th scope="col">{{ $t('message.Modify') }}</th>
            <th scope="col">{{ $t('message.Remove') }}</th>
          </tr>
        </thead>
        <tbody class="data" v-for="(user, index) in paginatedData" :key="index">
          <tr>
            <th scope="row"><router-link :to="`/user/${user.user_id}`">{{ user.user_id }}</router-link></th>
            <td><router-link :to="`/user/${user.user_id}`">{{ user.name }}</router-link></td>
            <td><router-link :to="`/user/${user.user_id}`">{{ user.mail }}</router-link></td>
            <td><button type="button" class="btn btn-primary" @click="showUpdateForm(user.user_id, user.roles, user.name, user.password, user.mail)">{{ $t('message.Modify') }}</button></td>
            <td><button type="button" class="btn btn-danger" @click="deleteUser(user.user_id, $t('message.deleteUser'))">{{ $t('message.Remove') }}</button></td>
          </tr>
        </tbody>
      </table>

      <div class="clear"></div>

      <button class="btn btn-info btn-sm" @click="prevPage">
        &lt;
      </button>
      <button class="btn btn-info btn-sm" @click="nextPage">
        &gt;
      </button>
      
      <div class="clear"></div>

      <button type="button" class="btn btn-success" @click="showRegisterForm()">{{ $t('message.Add') }}</button>

      <div class=clear></div>

      <form class="form" data-css action="" v-show="showAdd">
        <h4 v-show="showAdd">{{ $t('message.Register') }}</h4>
        <div class="form-group">
          <input v-model="userName" :placeholder="$t('message.name')">
        </div>
        <div class="form-group">
          <input type="email" v-model="userMail" placeholder="email">
        </div>
        <div class="form-group">
          <input type="password" v-model="userPassword" :placeholder="$t('message.password')">
        </div>
        <div class="form-group">
          <input type="password" v-model="userConfirmPassword" :placeholder="$t('message.confirmPassword')">
        </div>
        <button type="button" class="btn btn-success" @click="addUser(userName, userPassword, userConfirmPassword, userMail)" v-show="showAdd">{{ $t('message.Accept') }}</button>
      </form>

      <form class="form" data-css action="" v-show="showUpdate">
        <h4>{{ $t('message.updateUser') }}: {{userId}}</h4>
        <div class="form-group">
          <input v-model="userName" :placeholder="$t('message.name')">
        </div>
        <div class="form-group">
          <input type="email" v-model="userMail" placeholder="email">
        </div>
        <input type="hidden" v-model="userId">
        <input type="hidden" v-model="userPassword">
        <input type="hidden" v-model="userRoles">
        <button type="button" class="btn btn-success" @click="updateUser(userId, userName, userPassword, userMail, userRoles)" v-show="showUpdate">{{ $t('message.Accept') }}</button>
      </form>

      <!--<div class="alert alert-danger" v-show="errorOperation">
        <strong>Error...</strong> no tienes permisos para realizar esta petición
      </div>-->

      <Alert class="msnError" v-if="messageError" :message="messageError" @close-window="close"></Alert>

    </div>

    <div class="alert alert-danger" v-show="error">
      <strong>Error...</strong> {{ $t('message.permits') }}
    </div>
    
    <!--<pre>{{ $data }}</pre>-->
    
  </section>
</template>

<script>
import axios from 'axios'

import UserServices from '../services/UserServices';
import { setTimeout } from 'timers';
const restApiServices = new UserServices();

import Alert from '../components/MessageComponent';

export default {
  created() {
    //console.log(process.env.ROOT_API)
    //console.log(this.$store.state.token)
    this.error = false
    restApiServices.getUsers().then(
      users => {
        this.users = users
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
      users: [],
      user: {},
      userId: null,
      userName: null,
      userPassword: null,
      userConfirmPassword: null,
      userMail: null,
      userRoles: null,
      showAdd: false,
      showUpdate: false,
      pageNumber: 0,
      error: false,
      messageError: null,
    }
  },
  props: {
    size:{
      type:Number,
      required:false,
      default: 5
    }
  },
  methods: {
    deleteUser(id, message) {
      if(confirm(message  + " " + id + "?")){
        restApiServices.deleteUser(id).then(res => {
          this.users.splice(this.users.findIndex(e=>e.user_id==id), 1)
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
    addUser(name, password, confirmPassword, mail) {
      if(password != confirmPassword) {
        alert("contraseñas no coinciden")
      }else {
        restApiServices.addUser(name, password, mail).then(res => {
          this.users.push(res.data);
          this.showForm = false
          this.showAdd = false
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
    updateUser(id, name, password, mail, roles) {
      console.log(id, name, password, mail, roles)
      restApiServices.updateUser(id, name, password, mail, roles).then(response => {
        console.log(response)
        this.$set(this.users, this.users.findIndex(e=>e.user_id==id), response.data)
        this.showForm = false
        this.showUpdate = false
      })
      .catch(
        error => {
          console.log(error),
          //alert(error)
          this.showError()
        }
      )
    },
    showRegisterForm() {
      this.showForm = true
      this.showAdd = true
      this.showUpdate = false
      this.userName = null
      this.userPassword = null
      this.userMail = null
    },
    showUpdateForm(id, roles, name, password, mail) {
      this.userId = id
      this.userRoles = roles
      this.userName = name
      this.userPassword = password
      this.userMail = mail
      this.showForm = true
      this.showUpdate = true
      this.showAdd = false
    },
    showError() {
      this.messageError = "Error peticion no tienes permisos"
    },
    close() {
      this.messageError = null
    },
    nextPage(){
      if(this.pageNumber < this.pageCount)
        this.pageNumber++;
    },
    prevPage(){
      if(this.pageNumber > 0)
        this.pageNumber--;
    }
  },
  computed: {
    pageCount(){
      let l = this.users.length,
      s = this.size;
      return Math.floor(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
      end = start + this.size;
      return this.users.slice(start, end);
    }
  },
  components: {
    Alert
  }
}
  
</script>

<style>
.data[data-css] {
  /*margin: auto;
  width: 50%;
  padding: 10px;
  border-top-style: ridge;*/
  margin-top: 20px;
}

.form[data-css] {
  border-top-style: ridge;
  width: 50%;
  display:block;
  margin-left: auto;
  margin-right: auto;
}

.form[data-css] h4 {
  margin-top: 10px;
}

.form[data-css] .btn {
  margin: 10px 0;
}

.header {
  background-color: grey;
  color: white;
}

.data a {
  color: blue;
  font: bold;
}

th :hover {
  text-decoration: none;
}

td :hover {
  text-decoration: none;
}

.clear {
  margin-bottom: 20px;
}

.msnError {
  margin-top: 15px;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-left: 10%;
}

.btn {
  margin: 5px 0;
  padding: 8px;
  width: 100px;
}

.btn.btn-info.btn-sm {
  width: 40px;
}

.btn.btn-primary, .btn.btn-danger {
  margin: 0;
  padding: 8px;
}
</style>
