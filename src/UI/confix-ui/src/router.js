import Vue from 'vue'
import VueRouter from 'vue-router'
import ApplicationView from "./components/Applications/ApplicationView"
import VariablesSearch from "./components/Variables/VariablesSearch"

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
    component: VariablesSearch
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
