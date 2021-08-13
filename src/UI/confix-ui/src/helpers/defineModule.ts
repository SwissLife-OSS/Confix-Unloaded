import { ActionTree, GetterTree, MutationTree } from "vuex";
import { Any } from "./Any";
import { TypedModule } from "./TypedModule";

export function defineModule<
  State extends Record<string, unknown> | undefined,
  RootState extends State | undefined,
  Getters extends GetterTree<State, RootState> | undefined,
  Mutations extends MutationTree<State> | undefined,
  Actions extends ActionTree<State, RootState | undefined>
>(definition: {
  namespaced: boolean;
  state: State | (() => State);
  getters: Getters;
  mutations: Mutations;
  actions: Actions;
}): TypedModule<State, RootState, Getters, Mutations, Actions> {
  return definition as Any;
}
