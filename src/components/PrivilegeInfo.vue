<template>
  <section id="data" data-css>
    <h2>{{ $t('message.privilegeData') }} {{this.privilege.privilege_id}}</h2>
    <ul>
      <li>{{ $t('message.name') }}: {{ this.privilege.name }}</li>
    </ul>

  </section>
</template>

<script>
import axios from 'axios'

import PrivilegeServices from '../services/PrivilegeServices';
const restApiServices = new PrivilegeServices();

export default {
  created() {
    console.log(this.id)
    restApiServices.getPrivilege(this.id).then(res => {
      console.log(res.data)
      this.privilege = res.data
    })
  },
  data() {
    return {
      id: this.$route.params.id,
      privilege: [],
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