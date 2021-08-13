<template>
  <div class="tabs">
    <div
      class="tab-item"
      :class="{ active: tab.active }"
      v-for="tab in tabs"
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
import { defineComponent } from "@vue/runtime-core";
import {
  mapActionOfNamespace,
  mapStateOfNamespace,
} from "../../helpers/mapFunctions";
import { tabsTypeMap } from "../../resources";
import { Tab } from "../../state/Tab";

export default defineComponent({
  data() {
    return {
      hoveredTabId: null,
    };
  },
  computed: {
    ...mapStateOfNamespace("shell", "selectedTabId"),
    ...mapStateOfNamespace("shell", "tabs"),
    tabs: function (): Tab[] {
      return this.tabs.map((x) => ({
        ...x,
        active: this.selectedTabId === x.id,
        color: tabsTypeMap[x.type].color,
      }));
    },
  },
  methods: {
    ...mapActionOfNamespace("shell", "openTab"),
    ...mapActionOfNamespace("shell", "selectTab"),
    ...mapActionOfNamespace("shell", "closeTab"),
    onSelectTab(tab: Tab) {
      if (!tab.active) {
        this.selectTab(tab.id);
      }
    },
    onCloseTab(tab: Tab) {
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
