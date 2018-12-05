<template>
  <section id="data" data-css>
    <h2>{{ $t('message.roleData') }} {{this.role.role_id}}</h2>
    <ul>
      <li>{{ $t('message.name') }}: {{ this.role.name }}</li>
      <div class=clear></div>
      <span>Privilegios:</span>
      <ul v-for="(privilege, index) in checkedNames" :key="index">
        <li>
          {{ privilege.name }}
        </li>
      </ul> 
    </ul>

    <div class="formAssign">
      <h2>{{ $t('message.privilegesAssign') }}:</h2>
      <div v-for="(privilege, index) in privileges" :key="index">
        <input type="checkbox" :id="privilege.privilege_id" :value="privilege" v-model="checkedNames">
        <label :for="privilege.name">{{privilege.privilege_id}} {{privilege.name}}</label>
      </div>
      <button type="button" class="btn btn-primary" @click="assignPrivilege(role.role_id, role.name)">{{ $t('message.Assign') }}</button>
    </div>

    <div class=clear></div>

    <div class="formUpdateRole">
      <form @submit.prevent="updateRole_(role.role_id, role.name)">
        <h4>{{ $t('message.updateRole') }}</h4>
        <div class="form-group">
          <label>{{ $t('message.Role') }}</label>
          <input type="text" class="form-control" :placeholder="$t('message.name')" v-model="role.name">
        </div>
        <button type="submit" class="btn btn-success">{{ $t('message.Accept') }}</button>
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

import RoleServices from '../services/RoleServices';
const restApiServices = new RoleServices();

import PrivilegeServices from '../services/PrivilegeServices';
const restApiServices_ = new PrivilegeServices();

import Alert from '../components/MessageComponent';

export default {
  created() {
    this.error = false
    restApiServices.getRole(this.id).then(res => {
      this.role = res.data;
      res.data.privileges.forEach(e => {
        this.checkedNames.push(e)
      });
    })
    .catch(
      error => {
        this.error = true
      }
    )

    restApiServices_.getPrivileges().then(
      privileges => {
        this.privileges = privileges
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
      role: [],
      roleName: null,
      privileges: [],
      privilege: {},
      assignPrivileges: [],
      checkedNames: [],
      error: false,
      messageError: null,
    }
  },
  methods: {
    assignPrivilege(id, name) {
      this.managementUpdateRole(id, name)
    },
    updateRole_(id, name) {
      if(name == "" || name == null) {
        this.$i18n.locale == "es" ? this.messageError = "debes indicar nombre": this.messageError = "you must enter name";
      } else {
        this.managementUpdateRole(id, name)
      }
    },
    managementUpdateRole(id, name) {
      let flag = true
      for(let i=0; i<this.checkedNames.length; i++) {
        flag = false
        restApiServices_.getPrivilege(this.checkedNames[i].privilege_id).then(res => {
          this.assignPrivileges.push(res.data)
        }).catch(
          error => {
            this.error = true;
          }
        ).then(res => {
          restApiServices.updateRole(id, name, this.assignPrivileges).then(res => {
            this.role=res.data
          })
        })
        .catch(
          error => {
            this.error = true
          }
        )
      }
      if(flag) {
        restApiServices.updateRole(id, name, this.assignPrivileges).then(res => {
          this.role=res.data
        })
        .catch(
          error => {
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
