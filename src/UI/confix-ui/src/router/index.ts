import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ApplicationView from "../components/Applications/ApplicationView.vue";
import VariableSearch from "../components/Variables/VariableSearch.vue";
import ComponentSearch from "../components/Components/ComponentSearch.vue";
import ExplorerView from "../components/Shell/ExplorerView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Applications",
    component: ApplicationView,
  },
  {
    path: "/vars",
    name: "Variables",
    component: VariableSearch,
  },
  {
    path: "/comp",
    name: "Components",
    component: ComponentSearch,
  },
  {
    path: "/explorer",
    name: "Explorer",
    component: ExplorerView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
