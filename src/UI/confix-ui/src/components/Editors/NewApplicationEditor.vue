<template>
  <editor-base
    title="New Application"
    color="indigo lighten-4"
    icon="mdi-package-variant"
    :actions="actions"
    :ready="true"
    @Action="onAction"
  >
    <template>
      <v-row>
        <v-col>
          <v-text-field label="Name" v-model="newApp.name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <v-text-field
            label="Namespace"
            v-model="newApp.namespace"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-combobox
            v-model="newApp.parts"
            :items="[]"
            hide-selected
            label="Parts"
            chips
            multiple
            clearable
            deletable-chips
          ></v-combobox>
        </v-col>
      </v-row>
    </template>
  </editor-base>
</template>

<script>
import { mapActions } from "vuex";
import EditorBase from "../Shell/EditorBase.vue";
export default {
  components: { EditorBase },
  data() {
    return {
      newApp: {
        name: null,
        namespace: null,
        parts: [],
      },
      actions: [{ id: "SAVE", icon: "mdi-check" }],
    };
  },
  methods: {
    ...mapActions("apps", ["addApplication"]),
    ...mapActions("shell", ["closeActiveTab"]),
    onAction: function (name) {
      if (name === "SAVE") {
        this.addApplication({
          name: this.newApp.name,
          parts: this.newApp.parts,
          namespace: this.newApp.namespace,
        });
        this.closeActiveTab();
      }
    },
  },
};
</script>
<style>
</style>