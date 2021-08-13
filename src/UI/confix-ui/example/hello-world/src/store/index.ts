import { createStore } from "vuex";
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

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: modules as Any,
});

export default store;
