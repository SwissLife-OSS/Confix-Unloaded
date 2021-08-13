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

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { mapActionOfNamespace } from "../../helpers/mapFunctions";
import { maybeNull } from "../../helpers/state";
import EditorBase from "../Shell/EditorBase.vue";

type Actions = "SAVE";

export default Vue.extend({
  components: { EditorBase },
  data() {
    return {
      newApp: {
        name: maybeNull<string>(),
        namespace: maybeNull<string>(),
        parts: maybeNull<string[]>(),
      },
      actions: [{ id: "SAVE", icon: "mdi-check" }],
    };
  },
  methods: {
    ...mapActionOfNamespace("apps", "addApplication"),
    ...mapActionOfNamespace("shell", "closeActiveTab"),
    onAction: function (name: Actions) {
      if (name === "SAVE" && this.newApp.name && this.newApp.parts) {
        this.addApplication({
          name: this.newApp.name,
          parts: this.newApp.parts,
          namespace: this.newApp.namespace,
        });
        this.closeActiveTab();
      }
    },
  },
});
</script>
<style></style>
