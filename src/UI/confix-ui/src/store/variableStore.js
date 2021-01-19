import { addVariable, getAllVariables, saveValue } from "../services/variableService";
import { excuteGraphQL } from "./graphqlClient";


const variableStore = {
    namespaced: true,
    state: () => ({
        vars: []
    }),
    mutations: {
        VARS_LOADED(state, vars) {
            state.vars = vars;
        },
        VAR_ADDED: function (state, variable) {
            state.vars.push(variable);
        },
        VAR_VALUE_SAVED: function (state, variable) {

            var index = state.vars.findIndex(x => x.id === variable.id);
            state.vars[index] = Object.assign(state.vars[index], variable);
        }
    },
    actions: {
        async loadVariables({ commit, dispatch }) {
            const result = await excuteGraphQL(() => getAllVariables(), dispatch);
            if (result.success) {
                commit('VARS_LOADED', result.data.variables);
            }
        },
        async addVariable({ commit, dispatch }, input) {
            const result = await excuteGraphQL(() => addVariable(input), dispatch);
            if (result.success) {
                commit('VAR_ADDED', result.data.Variable_Add.variable);

                dispatch("shell/addMessage", {
                    type: "SUCCES",
                    text: "Variable added"
                }, { root: true });
            }
        },
        async saveValue({ commit, dispatch }, input) {
            const result = await excuteGraphQL(() => saveValue(input), dispatch);
            if (result.success) {
                commit('VAR_VALUE_SAVED', result.data.Variable_SaveValue.variable);

                dispatch("shell/addMessage", {
                    type: "SUCCES",
                    text: "Values saved"
                }, { root: true });
            }
        }
    },
    getters: {

    }
};

export default variableStore;
