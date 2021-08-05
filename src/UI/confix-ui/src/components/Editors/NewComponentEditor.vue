<template>
  <v-card class="mt-2" elevation="1" rounded="0" height="600">
    <v-toolbar height="36" color="teal darken-4" dark>
      <v-toolbar-title>New Component</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        shaped
        small
        color="teal darken-2"
        class="ml-6"
        @click="onClickSave"
      >
        Save
        <v-icon right>mdi-content-save-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Name" v-model="newComponent.name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-tabs v-model="tab">
          <v-tab>Values</v-tab>
          <v-tab>Schema</v-tab>
        </v-tabs>
      </v-row>
      <v-row>
        <v-tabs-items v-model="tab" :style="{ width: '100%' }">
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
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import MonacoEditor from "../Common/MonacoEditor.vue";
export default {
  components: {
    MonacoEditor
  },
  mounted() {
    this.schema = "";
    this.values = "{}";
  },
  data() {
    return {
      tab: 0,
      schema: "",
      values: "{}",
      newComponent: {
        name: null,
        schema: "",
        values: "{}"
      }
    };
  },
  computed: {},
  methods: {
    ...mapActions("comp", ["createComponent"]),
    ...mapActions("shell", ["closeActiveTab"]),
    onClickSave: async function() {
      await this.createComponent({
        name: this.newComponent.name,
        schema: this.schema,
        values: JSON.parse(this.values)
      });
      // TODO Error handling
      this.closeActiveTab();
    }
  }
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 400px;
}
</style>
