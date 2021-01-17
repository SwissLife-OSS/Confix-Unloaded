import { addApplication, getAllApplications, updatePart } from "../services/applicationService";
import { excuteGraphQL } from "./graphqlClient";

const applicationStore = {
    namespaced: true,
    state: () => ({
        apps: [],
        environments: [
            { id: "1", name: "DEV" },
            { id: "2", name: "STAGE" },
            { id: "3", name: "PROD" },
        ],

    }),
    mutations: {
        APPS_LOADED(state, apps) {
            state.apps = apps;
        },
        APP_ADDED(state, app) {
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
        async loadAppsRemote({ commit }) {
            const result = await excuteGraphQL(() => getAllApplications());
            if (result.success) {
                commit('APPS_LOADED', result.data.applications);
            }
        },
        async addApplication({ commit }, input) {
            const result = await excuteGraphQL(() => addApplication(input));

            if (result.success) {
                console.log(result);

                commit("APP_ADDED", result.data.Application_Add.application);
            }
        },
        async updatePart({ commit }, input) {
            const result = await excuteGraphQL(() => updatePart(input));

            if (result.success) {
                console.log(result);

                commit("APP_UPDATED", result.data.ApplicationPart_Update.application);
            }
        },
        async loadApps({ commit }) {

            const apps = [{
                id: "1",
                name: 'Account',
                parts: [
                    {
                        name: 'API', components: [
                            { name: "Security" },
                            { name: "Tracing" },
                            { name: "Audit" },
                        ]
                    },
                    { name: 'Worker', components: [{ name: "Tracing" },] },
                ]
            },
            {
                id: "2",
                name: 'Magnet',
                parts: [
                    { name: 'UI', components: [{ name: "Security" },] },
                    { name: 'Service', components: [{ name: "Tracing" },] },
                    { name: 'Hooks', components: [{ name: "SendGrid" }, { name: "Twilio" }] },
                ]
            },
            {
                id: "3",
                name: 'Snapshooter',
                parts: [
                    { name: 'Tests', components: [{ name: "Security" },] },
                ]
            },
            {
                id: "4",
                name: 'Squadron',
                parts: [
                    { name: 'Api', components: [{ name: "Security" }, { name: "Docker" }] },
                ]
            }]

            commit('APPS_LOADED', apps);
        }
    },
    getters: {

    }
};

export default applicationStore;
