
const shellStore = {
    namespaced: true,
    state: () => ({
        tabs: [],
        selectedTabId: null
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
        }
    },
    actions: {

        openTab: function ({ commit }, item) {
            console.log(item.id)
            commit('TAB_OPENED', item)
        },
        selectTab: function ({ commit }, id) {
            commit('TAB_SELECTED', id)
        },
        closeTab: function ({ commit }, id) {
            commit('TAB_CLOSED', id)
        },
        closeActiveTab: function ({ commit, state }) {
            commit('TAB_CLOSED', state.selectedTabId)
        }
    },
    getters: {

    }
};

export default shellStore;
