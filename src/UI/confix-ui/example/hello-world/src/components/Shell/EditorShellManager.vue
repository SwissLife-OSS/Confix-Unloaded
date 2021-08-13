<template>
  <div v-if="activeTabItem">
    <div v-if="activeTabItem.ready">
      <app-component-config-editor
        v-if="activeTabItem.type === 'APP_COMPONENT_CONFIG'"
        :part="activeTabItem.item.part"
        :component="activeTabItem.item.component"
      ></app-component-config-editor>
      <variable-editor
        v-if="activeTabItem.type === 'VARIABLE'"
        :variable="activeTabItem.data"
      ></variable-editor>
      <component-editor
        v-if="activeTabItem.type === 'COMPONENT'"
        :component="activeTabItem.item.component"
        :key="activeTabItem.item.component.id"
      ></component-editor>

      <application-part-editor
        v-if="activeTabItem.type === 'APP_PART'"
        :part="activeTabItem.item.part"
        :application="activeTabItem.item.application"
      >
      </application-part-editor>

      <new-component-editor
        v-if="activeTabItem.type === 'NEW_COMPONENT'"
      ></new-component-editor>

      <new-variable-editor
        v-if="activeTabItem.type === 'VARIABLE_ADD'"
      ></new-variable-editor>

      <new-application-editor v-if="activeTabItem.type === 'APP_ADD'">
      </new-application-editor>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapStateOfNamespace } from "../../helpers/mapFunctions";
import { Tab } from "../../state/Tab";
import AppComponentConfigEditor from "../Editors/AppComponentConfigEditor.vue";
import ApplicationPartEditor from "../Editors/ApplicationPartEditor.vue";
import ComponentEditor from "../Editors/ComponentEditor.vue";
import NewApplicationEditor from "../Editors/NewApplicationEditor.vue";
import NewComponentEditor from "../Editors/NewComponentEditor.vue";
import NewVariableEditor from "../Editors/NewVariableEditor.vue";
import VariableEditor from "../Editors/VariableEditor.vue";

export default defineComponent({
  components: {
    AppComponentConfigEditor,
    VariableEditor,
    ComponentEditor,
    ApplicationPartEditor,
    NewComponentEditor,
    NewVariableEditor,
    NewApplicationEditor,
  },

  data() {
    return {};
  },

  computed: {
    ...mapStateOfNamespace("shell", "tabs"),
    ...mapStateOfNamespace("shell", "selectedTabId"),
    activeTabItem: function (): Tab | null {
      if (this.selectedTabId) {
        const active = this.tabs.find((x) => x.id === this.selectedTabId);
        return active ?? null;
      }

      return null;
    },
  },
  methods: {},
});
</script>

<style></style>
