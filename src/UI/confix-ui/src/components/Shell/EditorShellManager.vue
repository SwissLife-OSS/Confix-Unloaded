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

<script>
import { mapState } from "vuex";
import AppComponentConfigEditor from "../Editors/AppComponentConfigEditor.vue";
import ApplicationPartEditor from "../Editors/ApplicationPartEditor.vue";
import ComponentEditor from "../Editors/ComponentEditor.vue";
import NewApplicationEditor from "../Editors/NewApplicationEditor.vue";
import NewComponentEditor from "../Editors/NewComponentEditor.vue";
import NewVariableEditor from "../Editors/NewVariableEditor.vue";
import VariableEditor from "../Editors/VariableEditor.vue";

export default {
  created() {},
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
    ...mapState("shell", ["selectedTabId"]),
    activeTabItem: function () {
      if (this.$store.state.shell.selectedTabId) {
        const active = this.$store.state.shell.tabs.filter(
          (x) => x.id === this.$store.state.shell.selectedTabId
        )[0];
        return active;
      }

      return null;
    },
  },
  methods: {},
};
</script>

<style>
</style>
