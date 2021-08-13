import { ActionContext } from "vuex";
import { Any } from "../helpers/Any";
import { useModules } from "../helpers/bind";
import { defineModule } from "../helpers/defineModule";
import { maybeNull, value } from "../helpers/state";
import { StatusMessage } from "../state/StatusMessage";
import {
  AppAddTab,
  AppComponentConfigTab,
  AppPartTab,
  ComponentTab,
  NewComponentTab,
  StoredTab,
} from "../state/Tab";

type Tabs =
  | AppPartTab
  | AppAddTab
  | AppComponentConfigTab
  | ComponentTab
  | NewComponentTab;

export const tabsTypeMap = {
  APP_COMPONENT_CONFIG: {
    color: "#7986cb",
  },
  VARIABLE: {
    color: "#FFCA28", //amber lighten-1
  },
  VARIABLE_ADD: {
    color: "#FFCA28", //amber lighten-1
  },
  COMPONENT: {
    color: "#26A69A", // teal lighten-1
  },
  NEW_COMPONENT: {
    color: "#4DB6AC", // teal lighten-2
  },
  APP_PART: {
    color: "#9FA8DA", //indigo lighten-3
  },
  APP_ADD: {
    color: "#7986cb", //indigo lighten-3
  },
};

const shellStore = defineModule({
  namespaced: true,
  state: () => ({
    tabs: value<Array<StoredTab>>([]),
    selectedTabId: maybeNull<string>(),
    statusMessage: maybeNull<StatusMessage>(),
  }),
  mutations: {
    TAB_OPENED(state, item: StoredTab) {
      const existingIndex = state.tabs.findIndex((x) => x.id === item.id);
      if (existingIndex > -1) {
        state.selectedTabId = state.tabs[existingIndex].id;
      } else {
        state.selectedTabId = item.id;
        state.tabs.push(item);
      }
    },
    TAB_SELECTED(state, id: string) {
      state.selectedTabId = id;
    },
    TAB_CLOSED(state, id: string) {
      const index = state.tabs.findIndex((x) => x.id === id);
      state.tabs.splice(index, 1);
      if (id === state.selectedTabId) {
        if (index > 0) {
          state.selectedTabId = state.tabs[index - 1].id;
        } else if (state.tabs.length > index) {
          state.selectedTabId = state.tabs[index].id;
        }
      }
    },
    MESSAGE_ADDED(state, message: StatusMessage) {
      state.statusMessage = message;

      window.setTimeout(() => {
        state.statusMessage = null;
      }, 5000);
    },
    VAR_VALUE_SAVED(state, value) {
      //TODO What?
      // const tabIndex = state.tabs.findIndex((x) => x.id === value.variableId);
      // if (tabIndex > -1) {
      //   const variable = state.tabs[tabIndex].data;
      //   var valueIndex = variable.values.findIndex(
      //     (x) =>
      //       x.environmentId === value.environmentId &&
      //       x.applicationId === value.applicationId &&
      //       x.partId === value.partId
      //   );
      //   if (valueIndex > -1) {
      //     variable.values[valueIndex] = value;
      //   } else {
      //     variable.values.push(value);
      //   }
      // }
    },
    VAR_VALUE_DELETED(state, result) {
      //TODO WHat?
      // console.log(result);
      // const tabIndex = state.tabs.findIndex((x) => x.id === result.variable.id);
      // if (tabIndex > -1) {
      //   const variable = state.tabs[tabIndex].data;
      //   const valueIndex = variable.values.findIndex(
      //     (x) => x.id === result.deletedId
      //   );
      //   console.log("valueIndex", valueIndex);
      //   if (valueIndex > -1) {
      //     variable.values = [...variable.values.splice(valueIndex, 1)];
      //   }
      // }
    },
  },
  actions: {
    openTab: function (context: ActionContext<Any, Any>, tab: Tabs) {
      const { mutate, action } = useModules(context);

      mutate("shell", "TAB_OPENED").commit({
        ...tab,
        color: tabsTypeMap[tab.type].color,
        ready: true,
        active: false,
      });
    },
    selectTab: function (context, id: string) {
      const { mutate } = useModules(context);
      mutate("shell", "TAB_SELECTED").commit(id);
    },
    closeTab: function (context, id: string) {
      const { mutate } = useModules(context);
      mutate("shell", "TAB_CLOSED").commit(id);
    },
    closeActiveTab: function (context) {
      const {
        mutate,
        state: { selectedTabId },
      } = useModules(context);

      if (selectedTabId) {
        mutate("shell", "TAB_CLOSED").commit(selectedTabId);
      }
    },
    addMessage: function (context, message: StatusMessage) {
      const { mutate } = useModules(context);
      mutate("shell", "MESSAGE_ADDED").commit(message);
    },
    async loadVariable({ commit, dispatch }, tab) {
      //TODO Variabels are not ready
      // const result = await excuteGraphQL(() => getById(tab.id), dispatch);
      // if (result.success) {
      //   commit("TAB_DATA_LOADED", {
      //     tabId: tab.id,
      //     data: result.data.variable,
      //   });
      // }
    },
  },
  getters: {},
});

export default shellStore;
