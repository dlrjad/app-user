<template>
  <section class="data" data-css>
    <div v-show="!error">
      <table class="header">
        <tr>
          <th><h2>ID</h2></th>
          <th><h2>{{ $t('message.Role') }}</h2></th>
          <th><h2>{{ $t('message.Modify') }}</h2></th>
          <th><h2>{{ $t('message.Remove') }}</h2></th>
        </tr>
      </table>
      <div v-for="(role, index) in roles" :key="index">
        <table>
          <tr>
            <router-link :to="`/role/${role.role_id}`"><a><td><h3>{{ role.role_id }}</h3></td>
            <td style="padding-left: 200px"><h3>{{ role.name }}</h3></td></a></router-link>
            <td style="padding-left: 0px"><button type="button" class="btn btn-primary" @click="showUpdateForm(role.role_id, role.privileges, role.name)">{{ $t('message.Modify') }}</button></td>
            <td style="padding-left: 270px"><button type="button" class="btn btn-danger"  @click="deleteRole(role.role_id, $t('message.deleteRole'))">{{ $t('message.Remove') }}</button></td>
          </tr>
        </table>
      </div>

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

      <form action="" v-show="showForm">
        <h4 v-show="showAdd">{{ $t('message.Register') }}</h4>
        <h4 v-show="showUpdate">{{ $t('message.updateRole') }}: {{roleId}}</h4>
        <input v-model="roleName" :placeholder="$t('message.name')">
        <input type="hidden" v-model="roleId">
        <input type="hidden" v-model="rolePrivileges">
        
        <button type="button" class="btn btn-success" @click="addRole(roleName)" v-show="showAdd">{{ $t('message.Accept') }}</button>
        <button type="button" class="btn btn-success" @click="updateRole(roleId, roleName, rolePrivileges)" v-show="showUpdate">{{ $t('message.Accept') }}</button>
      </form>

      <Alert class="msnError" v-if="messageError" :message="messageError" @close-window="close"></Alert>

    </div>

    <div class="alert alert-danger" v-show="error">
      <strong>Error...</strong> no tienes permisos para realizar esta petición
    </div>

  </section>
  
</template>

<script>
import axios from 'axios'

import RoleServices from '../services/RoleServices';
const restApiServices = new RoleServices();

import Alert from '../components/MessageComponent';

export default {
  created() {
    this.error = false
    restApiServices.getRoles().then(
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
      roles: [],
      role: {},
      roleId: null,
      roleName: null,
      rolePrivileges: null,
      showForm: false,
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
    deleteRole(id, message) {
      if(confirm(message  + " " + id + "?")){
        restApiServices.deleteRole(id).then(res => {
          this.roles.splice(this.roles.findIndex(e=>e.role_id==id), 1)
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
    addRole(name) {
      restApiServices.addRole(name).then(res => {
        this.roles.push(res.data);
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
    },
    showRegisterForm() {
      this.showForm = true
      this.showAdd = true
      this.showUpdate = false
    },
    showUpdateForm(id, privileges, name) {
      this.roleId = id
      this.rolePrivileges = privileges
      this.roleName = name
      this.showForm = true
      this.showUpdate = true
      this.showAdd = false
    },
    updateRole(id, name, privileges) {
      console.log(id, name, privileges)
      restApiServices.updateRole(id, name, privileges).then(response => {
        console.log(response)
        this.$set(this.roles, this.roles.findIndex(e=>e.role_id==id), response.data)
        this.showForm = false
        this.showUpdate = false
      }).catch(
        error => {
          console.log(error),
          //alert(error)
          this.showError()
        }
      )
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
      let l = this.roles.length,
      s = this.size;
      return Math.floor(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
      end = start + this.size;
      return this.roles.slice(start, end);
    }
  },
  components: {
    Alert
  }
}
  
</script>

<style>
.data[data-css] {
  margin: auto;
  margin-top: 50px;
  width: 50%;
  padding: 10px;
}
.header {
  background-color: grey;
  color: white;
}
 tr, td {
  margin: auto;
  width: 10%;
  padding: 10px;
  text-align: justify
}
th {
  margin: auto;
  width: 10%;
  padding: 10px;
}

.data h2 {
  color: white;
  font: bold;
  font-size: 21px;
}
.data h3 {
  font-size: 18px;
  color: blue;
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
</style>