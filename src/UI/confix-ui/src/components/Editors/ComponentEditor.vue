<template>
  <v-card class="mt-2" elevation="1" rounded="0" height="600">
    <v-toolbar height="36" color="teal darken-3" dark>
      <v-toolbar-title>{{ component.name }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn shaped small color="teal darken-1" class="ml-6" @click="onSave">
        Save
        <v-icon right>mdi-content-save-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Values</v-tab>
        <v-tab>Schema</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <monaco-editor
            :style="{ height: '480px' }"
            class="editor"
            v-model="values"
            language="json"
          />
        </v-tab-item>
        <v-tab-item>
          <monaco-editor
            :style="{ height: '480px' }"
            class="editor"
            v-model="schema"
            language="graphql"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import MonacoEditor from "../Common/MonacoEditor.vue";
export default {
  components: {
    MonacoEditor,
  },
  mounted() {
    this.schema = this.component.schema ?? "";
    this.values = this.component.valuesAsJson ?? "{}";
  },
  props: ["component"],
  data() {
    return {
      tab: 0,
      schema: "",
      values: "{}",
    };
  },
  computed: {},
  methods: {
    ...mapActions("comp", ["updateSchema"]),
    onSave: function () {
      this.updateSchema({
        id: this.component.id,
        schema: this.code,
      });
    },
  },
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 400px;
}
</style>