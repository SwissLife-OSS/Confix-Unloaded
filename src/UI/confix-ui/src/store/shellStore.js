
const shellStore = {
    namespaced: true,
    state: () => ({
        tabs: [],
        selectedTabId: null
    }),
    mutations: {
        TAB_OPENED(state, item) {
            const existingIndex = state.tabs.findIndex(x => x.id === item.id);
            console.log(existingIndex)
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
            console.log(index, state.tabs.length)

            state.tabs.splice(index, 1)


            console.log(index, state.tabs.length)

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
            commit('TAB_OPENED', item)
        },
        selectTab: function ({ commit }, id) {
            commit('TAB_SELECTED', id)
        },
        closeTab: function ({ commit }, id) {
            commit('TAB_CLOSED', id)
        }
    },
    getters: {

    }
};

export default shellStore;
