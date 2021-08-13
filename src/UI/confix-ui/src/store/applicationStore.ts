import { CreateApplicationInput } from "../graphql-operations";
import { Any } from "../helpers/Any";
import { useModules } from "../helpers/bind";
import { defineModule } from "../helpers/defineModule";
import { array } from "../helpers/state";
import { Application } from "../state/Application";
import { Environment } from "../state/Environment";
import { useClient } from "./graphqlClient";

const applicationStore = defineModule({
  namespaced: true,
  state: () => ({
    apps: array<Application>(),
    environments: array<Environment>([
      { id: "a35e912456774ba8976ad63eb9b8a5a1", name: "DEV" },
      { id: "a35e912456774ba8976ad63eb9b8a5a2", name: "STAGE" },
      { id: "a35e912456774ba8976ad63eb9b8a5a3", name: "PROD" },
    ]),
  }),
  mutations: {
    APPS_LOADED(state, apps: Application[]) {
      state.apps = apps;
    },
    APPLICATION_CREATED(state, app: Application) {
      state.apps.push(app);
    },
    APP_UPDATED(state, app: Application) {
      state.apps = state.apps.map((x) => {
        if (x.id === app.id) {
          return app;
        } else {
          return x;
        }
      });
    },
  },
  actions: {
    async loadApplications(context) {
      const { mutate } = useModules(context);
      const { allApps } = useClient(context);
      const response = await allApps();
      const apps = response.data?.applications?.edges?.map((x) => x.node);
      if (apps) {
        mutate("apps", "APPS_LOADED").commit(apps);
      }
    },
    async addApplication(context, input: CreateApplicationInput) {
      const { mutate, action } = useModules(context);
      const { createApplication } = useClient(context);
      const response = await createApplication({ input });
      const app = response.data?.createApplication?.application;
      if (app) {
        mutate("apps", "APPLICATION_CREATED").commit(app);
        action("shell", "addMessage").rootDispatch({
          type: "SUCCESS",
          text: "Application added",
        });
      }
    },
    //TODO implement
    async updatePart(context, t: Any) {
      throw new Error("NotImplemented");
    },
  },
  getters: {},
});

export default applicationStore;
