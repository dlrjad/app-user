import Vue from 'vue'
import Router from 'vue-router'

import BootStrapComponent from '@/components/BootStrapComponent'
import Home from '@/views/Home.vue'
import Users from '@/views/User.vue'
import User from '@/components/UserInfo.vue'
import Roles from '@/views/Role.vue'
import Role from '@/components/RoleInfo.vue'
import Privileges from '@/views/Privilege.vue'
import Privilege from '@/components/PrivilegeInfo.vue'
import NotFound from '@/views/NotFound.vue'

import LoginComponent from "@/views/Login.vue"
import RegisterComponent from "@/views/Register.vue"

import { store } from "../store/store.js";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  
  routes: [
    
    {path: '/home', component: Home},
    
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'login', component: LoginComponent},

    {path: '/register', name: 'register', component: RegisterComponent},

    
    {path: '/users', component: BootStrapComponent,  
      children: [
        {path: '', name: 'users', component: Users},
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
   
    {path: '*', component: NotFound},

  ]
})

router.beforeEach((to, from, next) => !store.state.token && to.path != '/login' ? next('/login') : next())

export default router