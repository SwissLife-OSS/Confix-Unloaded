import { getAllComponents, addComponent } from "../services/componentService"
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
        }
    },
    actions: {
        async loadComponents({ commit }) {
            const result = await excuteGraphQL(() => getAllComponents());
            if (result.success) {
                commit('COMPONENTS_LOADED', result.data.components);
            }
        },
        async addComponent({ commit }, input) {
            const result = await excuteGraphQL(() => addComponent(input));
            if (result.success) {
                commit('COMPONENT_ADDED', result.data.Component_Add.component);
            }
        }
    },
    getters: {

    }
};

export default componentStore;
