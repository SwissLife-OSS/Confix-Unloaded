import Vue from 'vue'
import VueRouter from 'vue-router'
import ApplicationView from "./components/Applications/ApplicationView"
import VariablesView from "./components/Variables/VariablesView"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Applications',
    component: ApplicationView
  },
  {
    path: '/vars',
    name: 'Variables',
    component: VariablesView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
