import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tinymce',
    name: 'Tinymce',
    component: () => import('@/views/component-demo/tinymce.vue')
  },
  {
    path: '/markdown',
    name: 'MarkdownEditor',
    component: () => import('@/views/component-demo/markdown.vue')
  },
  {
    path: '/svgicon',
    name: 'SvgIcon',
    component: () => import('@/views/icons/index.vue')
  },
  {
    path: '/clipboard',
    name: 'Clipboard',
    component: () => import('@/views/clipboard/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
