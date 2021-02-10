import { createApplication, getAllApplications, updatePart } from "../services/applicationService";
import { excuteGraphQL } from "./graphqlClient";

const applicationStore = {
    namespaced: true,
    state: () => ({
        apps: [],
        environments: [
            { id: "a35e912456774ba8976ad63eb9b8a5a1", name: "DEV" },
            { id: "a35e912456774ba8976ad63eb9b8a5a2", name: "STAGE" },
            { id: "a35e912456774ba8976ad63eb9b8a5a3", name: "PROD" },
        ],

    }),
    mutations: {
        APPS_LOADED(state, apps) {
            state.apps = apps;
        },
        APPLICATION_CREATED(state, app) {
            state.apps.push(app);
        },
        APP_UPDATED(state, app) {
            var index = state.app.findIndex(x => x.id === app.id);
            if (index > -1) {
                state.apps[index] = app;
            }
        }
    },
    actions: {
        async loadApplications({ commit, dispatch }) {
            const result = await excuteGraphQL(() => getAllApplications(), dispatch);
            if (result.success) {
                commit('APPS_LOADED', result.data.applications);
            }
        },
        async addApplication({ commit, dispatch }, input) {
            const result = await excuteGraphQL(() => createApplication(input), dispatch);

            if (result.success) {
                console.log(result);

                commit("APPLICATION_CREATED", result.data.createApplication.application);

                dispatch("shell/addMessage", {
                    type: "SUCCES",
                    text: "Application added"
                }, { root: true });
            }
        },
        async updatePart({ commit, dispatch }, input) {
            const result = await excuteGraphQL(() => updatePart(input), dispatch);

            if (result.success) {
                console.log(result);

                commit("APP_UPDATED", result.data.ApplicationPart_Update.application);
            }
        },
    },
    getters: {

    }
};

export default applicationStore;
