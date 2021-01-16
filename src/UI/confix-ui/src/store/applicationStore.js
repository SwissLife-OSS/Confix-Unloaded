
const applicationStore = {
    namespaced: true,
    state: () => ({
        apps: []
    }),
    mutations: {
        APPS_LOADED(state, apps) {
            state.apps = apps;
        }

    },
    actions: {
        async loadApps({ commit }) {

            const apps = [{
                id: "123",
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
                id: "345",
                name: 'CRM',
                parts: [
                    { name: 'UI' },
                ]
            }]

            commit('APPS_LOADED', apps);
        }
    },
    getters: {

    }
};

export default applicationStore;
