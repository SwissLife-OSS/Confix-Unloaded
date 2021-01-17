
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
            }, {
                id: "4",
                name: 'OAUTH_AUTHORITY',
                isSecret: false,
            }, {
                id: "5",
                name: 'OUATH_CLIENT_ID',
                isSecret: false,
            }, {
                id: "6",
                name: "OAUTH_CLIENT_SECRET",
                isSecret: true,
            }];
            commit('VARS_LOADED', vars);
        }
    },
    getters: {

    }
};

export default variableStore;
