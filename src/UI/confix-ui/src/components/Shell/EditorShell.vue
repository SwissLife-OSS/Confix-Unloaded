<template>
  <div v-if="activeTabItem">
    <app-component-config-editor
      v-if="activeTabItem.type === 'APP_COMPONENT_CONFIG'"
      :part="activeTabItem.item.part"
      :component="activeTabItem.item.component"
    ></app-component-config-editor>
    <variable-editor
      v-if="activeTabItem.type === 'VARIABLE'"
      :variable="activeTabItem.item.variable"
    ></variable-editor>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppComponentConfigEditor from "../Editors/AppComponentConfigEditor.vue";
import VariableEditor from "../Editors/VariableEditor.vue";

export default {
  created() {},
  components: { AppComponentConfigEditor, VariableEditor },

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