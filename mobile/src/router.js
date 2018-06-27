import VueRouter from 'vue-router'

import HomePage from './pages/HomePage'
import Auth from './Auth'
import ContactsPage from './pages/ContactsPage'
import CameraPage from './pages/CameraPage'
import BluetoothPage from './pages/BluetoothPage'
import PostsPage from './pages/PostsPage'
import PostPage from './pages/PostPage'
import Status from './pages/StatusPage'

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage,
      name: 'home',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      component: Auth,
    },
    {
      path: '/status',
      component: Status,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/contacts',
      component: ContactsPage,
    },
    {
      path: '/bluetooth',
      component: BluetoothPage,
    },
    {
      path: '/camera',
      component: CameraPage,
    },
    {
      path: '/posts',
      component: PostsPage,
    },
    {
      path: '/posts/:slug',
      component: PostPage,
    },
    {
      path: '*',
      name: 'auth',
      component: Auth,
    },
  ],
})
