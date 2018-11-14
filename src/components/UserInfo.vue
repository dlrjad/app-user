<template>
  <section id="data" data-css>
    <h2>{{ $t('message.userData') }} {{this.user.user_id}}</h2>
    <ul>
      <li>{{ $t('message.name') }}: {{ this.user.name }}</li>
      <li>Email: {{ this.user.mail }}</li>
      <p>{{ $t('message.Roles') }}:
      <ul v-for="(role, index) in this.checkedNames" :key="index">
        <li>
          {{ role.name }}
        </li>
      </ul>
      </p>
    </ul>

    <h2>{{ $t('message.rolesAssign') }}:</h2>

    <div v-for="(role, index) in roles" :key="index">
      <input type="checkbox" :id="role.role_id" :value="role" v-model="checkedNames">
      <label :for="role.name">{{role.role_id}} {{role.name}}</label>
    </div>

    <button type="button" class="btn btn-primary" @click="assignRole(user.user_id, user.name, user.password, user.mail)">{{ $t('message.Assign') }}</button>

    <div class=clear></div>

    <form>
      <h4>{{ $t('message.updateUser') }}</h4>
      <input type="text" :placeholder="$t('message.name')" v-model="userName = user.name">
      <input type="email" placeholder="email" v-model="userMail = user.mail" >

      <button type="button" class="btn btn-success" @click="updateUser(user.user_id, userName, user.password, userMail)">{{ $t('message.Accept') }}</button>
    </form>

    <div class="alert alert-danger" v-show="error">
      <strong>Error...</strong> no tienes permisos para realizar esta petición
    </div>

  </section>
  
</template>

<script>
import axios from 'axios'

import UserServices from '../services/UserServices';
const restApiServices = new UserServices();

import RoleServices from '../services/RoleServices';
const restApiServices_ = new RoleServices();

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
      error: false
    }
  },
  methods: {
    assignRole(id, name, password, mail) {
      for(let i=0; i<this.checkedNames.length; i++) {
        //console.log(this.checkedNames[i])
        restApiServices_.getRole(this.checkedNames[i].role_id).then(res => {
          //console.log(res.data)
          this.assignRoles.push(res.data)
        }).catch(
          error => {
            console.log(error),
            //alert(error)
            this.error = true
          }
        ).then(res => {
          console.log(this.assignRoles)
          //console.log(id, name, mail)
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
        })
      }
    },
    updateUser(id, name, password, mail) {
      for(let i=0; i<this.checkedNames.length; i++) {
        //console.log(this.checkedNames[i])
        restApiServices_.getRole(this.checkedNames[i].role_id).then(res => {
          //console.log(res.data)
          this.assignRoles.push(res.data)
        }).catch(
          error => {
            console.log(error),
            //alert(error)
            this.error = true
          }
        ).then(res => {
          console.log(this.assignRoles)
          //console.log(id, name, mail)
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
        })
      }
    }
  }
}
</script>

<style>

#data[data-css] {
  margin: auto;
  margin-top: 50px;
  width: 50%;
  padding: 10px;
}

.clear {
  margin-bottom: 20px;
}

</style>
