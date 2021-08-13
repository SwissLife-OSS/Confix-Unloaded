import Vue from "vue";
import Vuex from "vuex";
import { Any } from "../helpers/Any";
import applicationStore from "./applicationStore";
import componentStore from "./componentStore";
import shellStore from "./shellStore";
export const modules = {
  apps: applicationStore,
  shell: shellStore,
  comp: componentStore,
};

export type Modules = typeof modules;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: modules as Any,
});

export default store;
