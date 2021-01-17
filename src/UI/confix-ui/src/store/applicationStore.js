
const applicationStore = {
    namespaced: true,
    state: () => ({
        apps: [],
        environments: [
            { id: "1", name: "DEV" },
            { id: "2", name: "STAGE" },
            { id: "3", name: "PROD" },
        ]
    }),
    mutations: {
        APPS_LOADED(state, apps) {
            state.apps = apps;
        }
    },
    actions: {
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
