import { Object } from "core-js";
import { getAllComponents, addComponent, updateSchema } from "../services/componentService"
import { excuteGraphQL } from "./graphqlClient";

const componentStore = {
    namespaced: true,
    state: () => ({
        components: []
    }),
    mutations: {
        COMPONENTS_LOADED(state, components) {
            state.components = components;
        },
        COMPONENT_ADDED(state, component) {
            state.components.push(component)
        },
        SCHEMA_UPDATED(state, component) {
            const index = state.components.findIndex(x => x.id === component.id);
            state.components[index] = Object.assign(state.components[index], component);
        }
    },
    actions: {
        async loadComponents({ commit, dispatch }) {
            const result = await excuteGraphQL(() => getAllComponents(), dispatch);
            if (result.success) {
                commit('COMPONENTS_LOADED', result.data.components);
            }
        },
        async addComponent({ commit, dispatch }, input) {
            const result = await excuteGraphQL(() => addComponent(input), dispatch);
            if (result.success) {
                commit('COMPONENT_ADDED', result.data.Component_Add.component);
            }
        },
        async updateSchema({ commit, dispatch }, input) {
            const result = await excuteGraphQL(() => updateSchema(input), dispatch);
            console.log(result)

            if (result.success) {
                commit('SCHEMA_UPDATED', result.data.Component_UpdateSchema.component);
            }
        }
    },
    getters: {

    }
};

export default componentStore;
