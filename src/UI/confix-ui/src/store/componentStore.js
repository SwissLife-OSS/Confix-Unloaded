import { Object } from "core-js";
import { getAllComponents, createComponent, updateSchema } from "../services/componentService"
import { excuteGraphQL } from "./graphqlClient";

const componentStore = {
    namespaced: true,
    state: () => ({
        components: []
    }),
    mutations: {
        COMPONENTS_LOADED(state, components) {
            state.components = components.edges.map(x => x.node);
        },
        COMPONENT_CREATED(state, component) {
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
        async createComponent({ commit, dispatch }, input) {
            const result = await excuteGraphQL(() => createComponent(input), dispatch);
            if (result.success) {
                commit('COMPONENT_CREATED', result.data.createComponent.component);
            }
        },
        async updateSchema({ commit, dispatch }, input) {
            const result = await excuteGraphQL(() => updateSchema(input), dispatch);
            console.log(result)

            if (result.success) {
                commit('SCHEMA_UPDATED', result.data.updateComponentSchema.component);
            }
        }
    },
    getters: {

    }
};

export default componentStore;
