
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login'
import MainPage from './components/manage/MainPage'
import Dashboard from './components/manage/Dashboard'

import GroupMain from './components/manage/groups/GroupMain'
import GroupAdd from './components/manage/groups/GroupAdd'
import GroupEdit from './components/manage/groups/GroupEdit'

import MemberMain from './components/manage/members/MemberMain'
import MemberAdd from './components/manage/members/MemberAdd'

import _ from 'lodash'

Vue.use(VueRouter)

let routes = [
  {
    path: '/manage',
    component: MainPage,
    needLogin: true,
    children: [
      { path: '', component: Dashboard },
      { path: 'groups',
        component: GroupMain,
        children: [
          { path: 'add', component: GroupAdd },
          { path: 'edit/:groupId', component: GroupEdit, props: true },
          { path: 'edit', redirect: '/manage/groups' }
        ]
      },
      { path: 'members',
        component: MemberMain,
        children: [
          { path: 'add', component: MemberAdd }
        ]
      }
    ]
  },
  { path: '/login', component: Login, needLogin: false },
  { path: '*', component: MainPage, needLogin: true }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let loggedIn = localStorage.getItem('user')
  let paths = _.groupBy(routes, 'path')
  let authNeeded = paths[to.path] ? paths[to.path][0].needLogin : true
  if (authNeeded && !loggedIn) {
    return next('/login')
  } else if (loggedIn && to.path === '/login') {
    return next('/')
  }

  next()
})

export default router
