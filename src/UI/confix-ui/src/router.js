import Vue from 'vue'
import VueRouter from 'vue-router'
import ApplicationView from "./components/Applications/ApplicationView"
import VariableSearch from "./components/Variables/VariableSearch"
import ComponentSearch from "./components/Components/ComponentSearch"
import ExplorerView from "./components/Shell/ExplorerView"

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
    component: VariableSearch
  },
  {
    path: '/comp',
    name: 'Components',
    component: ComponentSearch
  },
  {
    path: '/explorer',
    name: 'Explorer',
    component: ExplorerView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
