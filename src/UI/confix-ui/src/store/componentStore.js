
const componentStore = {
    namespaced: true,
    state: () => ({
        components: []
    }),
    mutations: {
        COMPONENTS_LOADED(state, components) {
            state.components = components;
        }
    },
    actions: {
        async loadComponents({ commit }) {
            const components = [{
                id: "1",
                name: 'Security',
            }, {
                id: "2",
                name: 'Tracing',
            }, {
                id: "3",
                name: 'Audit',
                isSecret: false,
            }];
            commit('COMPONENTS_LOADED', components);
        }
    },
    getters: {

    }
};

export default componentStore;
