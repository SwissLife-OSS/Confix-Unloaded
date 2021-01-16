
const variableStore = {
    namespaced: true,
    state: () => ({
        vars: []
    }),
    mutations: {
        VARS_LOADED(state, vars) {
            state.vars = vars;
        }
    },
    actions: {
        async loadVariables({ commit }) {
            const vars = [{
                id: "1",
                name: 'ACCOUNT_DB_CONNECTIONSTRING',
                isSecret: true,
            }, {
                id: "2",
                name: 'ACCOUNT_SERVICEBUS_CONNECTIONSTRING',
                isSecret: true,
            }, {
                id: "3",
                name: 'ACCOUNT_CACHE_LIFETIME',
                isSecret: false,
            }];
            commit('VARS_LOADED', vars);
        }
    },
    getters: {

    }
};

export default variableStore;
