import {
  CreateComponentInput,
  UpdateComponentSchemaAndValuesMutationVariables,
  UpdateComponentSchemaInput,
} from "../graphql-operations";
import { useModules } from "../helpers/bind";
import { defineModule } from "../helpers/defineModule";
import { array } from "../helpers/state";
import { Component } from "../state/Component";
import { useClient } from "./graphqlClient";
const componentStore = defineModule({
  namespaced: true,
  state: () => ({
    components: array<Component>(),
  }),
  mutations: {
    COMPONENTS_LOADED(state, components: Component[]) {
      state.components = components;
    },
    COMPONENT_CREATED(state, component: Component) {
      state.components.push(component);
    },
    SCHEMA_UPDATED(state, component: Component) {
      const index = state.components.findIndex((x) => x.id === component.id);
      state.components[index] = { ...state.components[index], ...component };
    },
  },
  actions: {
    async loadComponents(context) {
      const { mutate } = useModules(context);
      const { allComponents } = useClient(context);
      const response = await allComponents();
      const components = response.data?.components?.edges?.map((x) => x.node);
      if (components) {
        mutate("comp", "COMPONENTS_LOADED").commit(components);
      }
    },
    async createComponent(context, input: CreateComponentInput) {
      const { mutate } = useModules(context);
      const { createComponent } = useClient(context);
      const result = await createComponent({ input });
      const component = result.data?.createComponent?.component;
      if (component) {
        mutate("comp", "COMPONENT_CREATED").commit(component);
      }
      return result;
    },
    async updateSchema(context, input: UpdateComponentSchemaInput) {
      const { mutate } = useModules(context);
      const { updateComponentSchema } = useClient(context);
      const result = await updateComponentSchema({ input });
      const component = result.data?.updateComponentSchema?.component;
      if (component) {
        mutate("comp", "SCHEMA_UPDATED").commit(component);
      }
    },
    async updateSchemaAndValues(
      context,
      variables: UpdateComponentSchemaAndValuesMutationVariables
    ) {
      const { mutate } = useModules(context);
      const { updateComponentSchemaAndValues } = useClient(context);
      const result = await updateComponentSchemaAndValues(variables);
      const component = result.data?.updateComponentSchema?.component;
      if (component) {
        mutate("comp", "SCHEMA_UPDATED").commit(component);
      }
    },
  },
  getters: {},
});

export default componentStore;
