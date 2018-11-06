import Vue from 'vue'
import Router from 'vue-router'

import BootStrapComponent from '@/components/BootStrapComponent'
import Users from '@/views/User.vue'
import User from '@/components/UserInfo.vue'
import Roles from '@/views/Role.vue'
import Role from '@/components/RoleInfo.vue'
import Privileges from '@/views/Privilege.vue'
import Privilege from '@/components/PrivilegeInfo.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  
  routes: [  
    {path: '/', redirect: '/users', component: Users},

    {path: '/users', component: BootStrapComponent,  
      children: [
        {path: '', component: Users},
        {path: '/user/:id', component: User},
      ] 
    },
    
    {path: '/roles', component: BootStrapComponent, 
      children: [
        {path: '', component: Roles},
        {path: '/role/:id', component: Role},
      ]
    },
    
    {path: '/privileges', component: BootStrapComponent, 
      children: [
        {path: '', component: Privileges},
        {path: '/privilege/:id', component: Privilege},
      ]
    },
    
    {path: '*', component: NotFound}
  ]
})
