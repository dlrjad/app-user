<template>
  <section id="data" data-css>
    <h2>{{ $t('message.roleData') }} {{this.role.role_id}}</h2>
    <ul>
      <li>{{ $t('message.name') }}: {{ this.role.name }}</li>
      <p>Privilegios:</p>
      <ul v-for="(privilege, index) in checkedNames" :key="index">
        <li>
          {{ privilege.name }}
        </li>
      </ul>
      
    </ul>

    <h2>{{ $t('message.privilegesAssign') }}:</h2>

    <div v-for="(privilege, index) in privileges" :key="index">
      <input type="checkbox" :id="privilege.privilege_id" :value="privilege" v-model="checkedNames">
      <label :for="privilege.name">{{privilege.privilege_id}} {{privilege.name}}</label>
    </div>

    <button type="button" class="btn btn-primary" @click="assignPrivilege(role.role_id, role.name)">{{ $t('message.Assign') }}</button>

    <div class=clear></div>

    <form>
      <h4>{{ $t('message.updateRole') }}</h4>
      <input type="text" :placeholder="$t('message.name')" v-model="roleName">
      
      <button type="button" class="btn btn-success" @click="updateRole(role.role_id, roleName)">{{ $t('message.Accept') }}</button>
    </form>
    
  </section>
</template>

<script>
import axios from 'axios'

import RoleServices from '../services/RoleServices';
const restApiServices = new RoleServices();

import PrivilegeServices from '../services/PrivilegeServices';
const restApiServices_ = new PrivilegeServices();

export default {
  created() {
    console.log(this.id)
    restApiServices.getRole(this.id).then(res => {
      //console.log(res.data)
      this.role = res.data;
      res.data.privileges.forEach(e => {
        this.checkedNames.push(e)
      });
    })

    restApiServices_.getPrivileges().then(
      privileges => {
        this.privileges = privileges
      }
    ).catch(
      error => {
        console.log(error),
        alert(error)
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
      checkedNames: []
    }
  },
  methods: {
    assignPrivilege(id, name) {
      for(let i=0; i<this.checkedNames.length; i++) {
        //console.log(this.checkedNames[i])
        restApiServices_.getPrivilege(this.checkedNames[i].privilege_id).then(res => {
          //console.log(res.data)
          this.assignPrivileges.push(res.data)
        }).catch(
          error => {
            console.log(error),
            alert(error)
          }
        ).then(res => {
          //console.log(this.assignPrivileges)
          //console.log(id, name)
          restApiServices.updateRole(id, name, this.assignPrivileges).then(res => {
            //console.log("update: " + res.data)
            this.role=res.data
          })
        })
      }
    },
    updateRole(id, name) {
      for(let i=0; i<this.checkedNames.length; i++) {
        //console.log(this.checkedNames[i])
        restApiServices_.getPrivilege(this.checkedNames[i].privilege_id).then(res => {
          //console.log(res.data)
          this.assignPrivileges.push(res.data)
        }).catch(
          error => {
            console.log(error),
            alert(error)
          }
        ).then(res => {
          console.log(this.assignPrivileges)
          //console.log(id, name)
          restApiServices.updateRole(id, name, this.assignPrivileges).then(res => {
            //console.log("update: " + res.data)
            this.role=res.data
          })
        })
      }
    },
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