<template>
  <section class="data" data-css>
    <div v-show="!error">
      <table class="header">
        <tr>
          <th><h2>ID</h2></th>
          <th><h2>{{ $t('message.Privilege') }}</h2></th>
          <th><h2>{{ $t('message.Modify') }}</h2></th>
          <th><h2>{{ $t('message.Remove') }}</h2></th>
        </tr>
      </table>
      <div v-for="(privilege, index) in privileges" :key="index">
        <table>
          <tr>
            <router-link :to="`/privilege/${privilege.privilege_id}`"><a><td><h3>{{ privilege.privilege_id }}</h3></td>
            <td style="padding-left: 200px"><h3>{{ privilege.name }}</h3></td></a></router-link>
            <td style="padding-left: 100px"><button type="button" class="btn btn-primary" @click="showUpdateForm(privilege.privilege_id)">{{ $t('message.Modify') }}</button></td>
            <td style="padding-left: 270px"><button type="button" class="btn btn-danger" @click="deletePrivilege(privilege.privilege_id, $t('message.deletePrivilege'))">{{ $t('message.Remove') }}</button></td>
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

      <div class="clear"></div>

      <form action="" v-show="showForm">
        <h4 v-show="showAdd">{{ $t('message.Register') }}</h4>
        <h4 v-show="showUpdate">{{ $t('message.updatePrivilege') }}: {{privilegeId}}</h4>
        <input v-model="privilegeName" :placeholder="$t('message.name')">
        <input type="hidden" v-model="privilegeId">
        
        <button type="button" class="btn btn-success" @click="addPrivilege(privilegeName)" v-show="showAdd">{{ $t('message.Accept') }}</button>
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
    },
    showUpdateForm(id) {
      this.privilegeId = id
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
</style>