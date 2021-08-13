import { ActionTree, GetterTree, MutationTree } from "vuex";

export interface TypedModule<
  State extends Record<string, unknown> | undefined,
  RootState extends State | undefined,
  Getters extends GetterTree<State, RootState> | undefined,
  Mutations extends MutationTree<State> | undefined,
  Actions extends ActionTree<State, RootState | undefined>
> {
  namespaced: boolean;
  state: State;
  getters: Getters;
  mutations: Mutations;
  actions: Actions;
}
