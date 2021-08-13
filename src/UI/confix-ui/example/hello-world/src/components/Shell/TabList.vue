<template>
  <div class="tabs">
    <div
      class="tab-item"
      :class="{ active: tab.active }"
      v-for="tab in storedTabs"
      :key="tab.id"
      @mouseover="hoveredTabId = tab.id"
      @mouseleave="hoveredTabId = null"
      @click="onSelectTab(tab)"
      :title="tab.title"
      :style="{ 'background-color': tab.color }"
    >
      {{ tab.title }}
      <v-icon
        size="20"
        v-if="hoveredTabId === tab.id"
        class="tab-close"
        @click="onCloseTab(tab)"
        >mdi-close</v-icon
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  mapActionOfNamespace,
  mapStateOfNamespace,
} from "../../helpers/mapFunctions";
import { StoredTab, Tab } from "../../state/Tab";

export default Vue.extend({
  data() {
    return {
      hoveredTabId: null,
    };
  },
  computed: {
    ...mapStateOfNamespace("shell", "selectedTabId"),
    ...mapStateOfNamespace("shell", "tabs"),
    storedTabs: function (): StoredTab[] {
      return this.tabs.map((x) => ({
        ...x,
        active: this.selectedTabId === x.id,
      }));
    },
  },
  methods: {
    ...mapActionOfNamespace("shell", "openTab"),
    ...mapActionOfNamespace("shell", "selectTab"),
    ...mapActionOfNamespace("shell", "closeTab"),
    onSelectTab(tab: StoredTab) {
      if (!tab.active) {
        this.selectTab(tab.id);
      }
    },
    onCloseTab(tab: StoredTab) {
      this.closeTab(tab.id);
    },
  },
});
</script>

<style scoped>
.tab {
  display: flex;
  flex-direction: row;
}

.tab-item {
  position: relative;
  width: 140px;
  height: 30px;
  float: left;
  margin-left: 1px;
  font-size: 14px;
  flex: 1;
  padding: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.tab-item.active {
  border-bottom: red solid 2px;
}

.tab-close {
  position: absolute;
  right: 2px;
  top: 3px;
  transition: 0.4s;
}
</style>
