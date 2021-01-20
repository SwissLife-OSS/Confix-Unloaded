import { getById } from "../services/variableService";
import { excuteGraphQL } from "./graphqlClient";

const shellStore = {
    namespaced: true,
    state: () => ({
        tabs: [],
        selectedTabId: null,
        statusMessage: null
    }),
    mutations: {
        TAB_OPENED(state, item) {
            const existingIndex = state.tabs.findIndex(x => x.id === item.id);
            if (existingIndex > -1) {
                state.selectedTabId = state.tabs[existingIndex].id;
            }
            else {
                state.selectedTabId = item.id;
                state.tabs.push(item);
            }
        },
        TAB_SELECTED(state, id) {
            state.selectedTabId = id;
        },
        TAB_CLOSED(state, id) {
            const index = state.tabs.findIndex(x => x.id === id);
            state.tabs.splice(index, 1)

            if (id === state.selectedTabId) {
                if (index > 0) {
                    state.selectedTabId = state.tabs[index - 1].id;
                }
                else if (state.tabs.length > index) {
                    state.selectedTabId = state.tabs[index].id;
                }
            }
        },
        TAB_DATA_LOADED(state, data) {
            const index = state.tabs.findIndex(x => x.id === data.tabId);
            if (index > -1) {
                state.tabs[index].data = data.data;
                state.tabs[index].ready = true;
            }
        },
        MESSAGE_ADDED(state, message) {
            state.statusMessage = message;

            window.setTimeout(() => {
                state.statusMessage = null;
            }, 5000)
        },
        VAR_VALUE_SAVED(state, value) {
            const tabIndex = state.tabs.findIndex(x => x.id === value.variableId);
            if (tabIndex > -1) {
                console.log("tabIndex", tabIndex)

                const variable = state.tabs[tabIndex].data;

                var valueIndex = variable.values.findIndex(x =>
                    x.environmentId === value.environmentId &&
                    x.applicationId === value.applicationId &&
                    x.partId === value.partId
                );
                if (valueIndex > -1) {
                    variable.values[valueIndex] = value;
                }
                else {
                    variable.values.push(value)
                }
            }
        }
    },
    actions: {
        openTab: function ({ commit, dispatch }, tab) {

            tab.ready = (tab.type !== "VARIABLE");

            if (tab.type === "VARIABLE") {
                dispatch("loadVariable", tab)
            }
            commit('TAB_OPENED', tab)
        },
        selectTab: function ({ commit }, id) {
            commit('TAB_SELECTED', id)
        },
        closeTab: function ({ commit }, id) {
            commit('TAB_CLOSED', id)
        },
        closeActiveTab: function ({ commit, state }) {
            commit('TAB_CLOSED', state.selectedTabId)
        },
        addMessage: function ({ commit }, message) {
            commit("MESSAGE_ADDED", message)
        },
        async loadVariable({ commit, dispatch }, tab) {

            const result = await excuteGraphQL(() => getById(tab.id), dispatch);
            if (result.success) {
                commit("TAB_DATA_LOADED", {
                    tabId: tab.id,
                    data: result.data.variable
                });
            }
        }
    },
    getters: {

    }
};

export default shellStore;
