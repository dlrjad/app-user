<template>
  <section class="data" data-css>
    <div v-show="!error">
      <table class="table">
        <thead class="header">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{{ $t('message.Privilege') }}</th>
            <th scope="col">{{ $t('message.Modify') }}</th>
            <th scope="col">{{ $t('message.Remove') }}</th>
          </tr>
        </thead>
        <tbody class="data" v-for="(privilege, index) in privileges" :key="index">
          <tr>
            <th><router-link :to="`/privilege/${privilege.privilege_id}`">{{ privilege.privilege_id }}</router-link></th>
            <td><router-link :to="`/privilege/${privilege.privilege_id}`">{{ privilege.name }}</router-link></td>
            <td><button type="button" class="btn btn-primary" @click="showUpdateForm(privilege.privilege_id, privilege.name)">{{ $t('message.Modify') }}</button></td>
            <td><button type="button" class="btn btn-danger" @click="deletePrivilege(privilege.privilege_id, $t('message.deletePrivilege'))">{{ $t('message.Remove') }}</button></td>
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

      <div class="clear"></div>

      <form class="form mb-3 row col-6" data-css action="" v-show="showAdd">
        <h4>{{ $t('message.Register') }}</h4>
        <div class="form-group">
          <label>{{ $t('message.name') }}</label>
          <input type="text" class="form-control" v-model="privilegeName" :placeholder="$t('message.name')">
        </div>
        <button type="button" class="btn btn-success" @click="addPrivilege(privilegeName)" v-show="showAdd">{{ $t('message.Accept') }}</button>
      </form>

      <form class="form mb-3 row col-6" data-css action="" v-show="showUpdate">
        <h4>{{ $t('message.updatePrivilege') }}: {{privilegeId}}</h4>
        <div class="form-group">
          <input type="text" class="form-control" v-model="privilegeName" :placeholder="$t('message.name')">
        </div>
        <input type="hidden" v-model="privilegeId">
        <button type="button" class="btn btn-success" @click="updatePrivilege(privilegeId, privilegeName)" v-show="showUpdate">{{ $t('message.Accept') }}</button>
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

import PrivilegeServices from '../services/PrivilegeServices';
const restApiServices = new PrivilegeServices();

import Alert from '../components/MessageComponent';

export default {
  created() {
    this.error = false
    restApiServices.getPrivileges().then(
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
      privileges: [],
      privilege: {},
      privilegeId: null,
      privilegeName: null,
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
    deletePrivilege(id, message) {
      if(confirm(message  + " " + id + "?")){
        restApiServices.deletePrivilege(id).then(res => {
          this.privileges.splice(this.privileges.findIndex(e=>e.privilege_id==id), 1)
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
    addPrivilege(name) {
      restApiServices.addPrivilege(name).then(res => {
        this.privileges.push(res.data);
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
      this.privilegeName = null
    },
    showUpdateForm(id, name) {
      this.privilegeId = id
      this.privilegeName = name
      this.showForm = true
      this.showUpdate = true
      this.showAdd = false
    },
    updatePrivilege(id, name) {
      restApiServices.updatePrivilege(id, name).then(response => {
        this.$set(this.privileges, this.privileges.findIndex(e=>e.privilege_id==id), response.data)
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
    showError() {
      this.$i18n.locale == "es" ? this.messageError = "no tienes permisos para realizar esta petición": this.messageError = "you haven`t permits to realize this petition";
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
    },
  },
  computed: {
    pageCount(){
      let l = this.privileges.length,
      s = this.size;
      return Math.floor(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
      end = start + this.size;
      return this.privileges.slice(start, end);
    }
  },
  components: {
    Alert
  }
}  
</script>
