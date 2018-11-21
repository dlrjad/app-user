<template>
  <section id="data" data-css>
    <h2>{{ $t('message.privilegeData') }} {{this.privilege.privilege_id}}</h2>
    <ul>
      <li>{{ $t('message.name') }}: {{ this.privilege.name }}</li>
    </ul>

    <div class="alert alert-danger" v-show="error">
      <strong>Error...</strong> {{ $t('message.permits') }}
    </div>

  </section>
</template>

<script>
import axios from 'axios'

import PrivilegeServices from '../services/PrivilegeServices';
const restApiServices = new PrivilegeServices();

export default {
  created() {
    this.error = false
    restApiServices.getPrivilege(this.id).then(res => {
      this.privilege = res.data
    })
    .catch(
      error => {
        this.error = true
      }
    )
  },
  data() {
    return {
      id: this.$route.params.id,
      privilege: [],
      error: false
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

</style>