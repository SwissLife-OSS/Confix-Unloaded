<template>
  <editor-base
    color="amber lighten-3"
    title="New Variable"
    icon="mdi-variable"
    :actions="actions"
    @Action="onAction"
  >
    <v-row>
      <v-col>
        <v-text-field
          label="Name"
          :value="newVariable.name"
          @input="newVariable.name = $event.toUpperCase()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="2">
        <v-switch label="Secret" v-model="newVariable.isSecret"></v-switch>
      </v-col>
      <v-col md="10">
        <v-text-field
          label="Namespace"
          v-model="newVariable.namespace"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          label="Default Value"
          v-model="newVariable.defaultValue"
        ></v-text-field>
      </v-col>
    </v-row>
  </editor-base>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import EditorBase from "../Shell/EditorBase.vue";

// TODO IMPLEMENT!
type Actions = "SAVE";

export default defineComponent({
  components: { EditorBase },
  data() {
    return {
      newVariable: {
        name: null,
        namespace: null,
        defaultValue: null,
        isSecret: true,
      },
      actions: [{ id: "SAVE", icon: "mdi-check" }],
    };
  },
  computed: {},
  methods: {
    ...mapActions("vars", ["createVariable"]),
    ...mapActions("shell", ["closeActiveTab"]),
    onAction: function (action: Actions) {
      if (action === "SAVE") {
        this.saveNewVariable();
      }
    },
    saveNewVariable: function () {
      this.createVariable({
        name: this.newVariable.name,
        namespace: this.newVariable.namespace,
        isSecret: this.newVariable.isSecret,
        defaultValue: this.newVariable.defaultValue,
      });

      this.closeActiveTab();
    },
  },
});
</script>

<style scoped></style>
