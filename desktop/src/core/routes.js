import Vue from 'vue'
import Router from 'vue-router'

import Home from './Home'
// import About from '@/components/About';
import Auth from './Auth'
// import TeacherHome from '../modules/misc/TeacherHome'
// import ClassroomHome from '../modules/misc/ClassroomHome'
// import AssignmentHome from '../modules/misc/AssignmentHome'
// import StudentHome from '../modules/misc/StudentHome'
// import NewHardware from '../modules/equipment/FormHardware'
import Hardware from '../modules/equipment/hardware/Hardware'
import NewHardware from '../modules/equipment/hardware/NewHardware'
import EditHardware from '../modules/equipment/hardware/EditHardware'
import Profile from '../modules/people/Profile'
import store from './store'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Home,
      meta: { isLanding: true },
    },
    {
      path: '/hardware',
      name: 'Hardware',
      component: Hardware,
      meta: { requiresAuth: true },
    },
    {
      path: '/hardware/new',
      name: 'NewHardware',
      component: NewHardware,
      meta: { requiresAuth: true },
    },
    {
      path: '/hardware/:id/edit',
      name: 'EditHardware',
      component: EditHardware,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: { requiresAuth: true },
    },
    {
      path: '/newhardware',
      name: 'newhardware',
      component: NewHardware,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About,
    // },
    // {
    //   path: '/auth',
    //   name: 'login',
    //   component: Auth,
    // },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: TeacherHome,
    //   meta: { requiresAuth: true },
    // },
    // {
    //   path: '/classroomhome/:id',
    //   name: 'ClassroomHome',
    //   component: ClassroomHome,
    //   meta: { requiresAuth: true },
    // },
    // {
    //   path: '/assignmenthome/:classId/:id',
    //   name: 'AssignmentHome',
    //   component: AssignmentHome,
    //   meta: { requiresAuth: true },
    // },
    // {
    //   path: '/studenthome/:id',
    //   name: 'StudentHome',
    //   component: StudentHome,
    //   meta: { requiresAuth: true },
    // },
    {
      path: '*',
      name: 'landing',
      component: Home,
      meta: { isLanding: true },
    },
  ],
})
router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // console.log(store.state)
  // console.log(store.state.common.isLoggedIn)
  // console.log(store.state['common/user'])
  console.log(to.name)

  if (
    store.state.common.isLoggedIn &&
    to.matched.some(record => record.meta.isLanding)
  )
    next('profile')
  if (requiresAuth && !store.state.common.isLoggedIn) next('landing')
  else next()

  next()
})
export default router
