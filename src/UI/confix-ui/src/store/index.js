import Vue from 'vue'
import Vuex from 'vuex'
import applicationStore from './applicationStore'
import shellStore from './shellStore'
import variableStore from './variableStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    apps: applicationStore,
    vars: variableStore,
    shell: shellStore
  }
})
