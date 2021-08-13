<template>
  <editor-base
    :title="variable.name"
    color="amber lighten-4"
    icon="mdi-variable"
    :views="views"
    :actions="actions"
    :ready="false"
    @ViewChanged="viewChanged"
  >
    <template #FORM>
      <v-row>
        <v-col md="6"
          ><v-select
            label="Application"
            :items="applications"
            prepend-icon="mdi-package-variant"
            v-model="application"
            item-text="name"
            item-value="id"
            return-object
          ></v-select
        ></v-col>
        <v-col md="6"
          ><v-select
            label="Parts"
            prepend-icon="mdi-toy-brick-outline"
            :items="parts"
            v-model="part"
            item-text="name"
            item-value="id"
            return-object
          ></v-select
        ></v-col>
      </v-row>

      <v-row v-for="vv in variableValues" :key="getKey(vv)">
        <v-col md="1">
          <h4 class="mt-6">{{ vv.environment }}</h4>
        </v-col>
        <v-col md="11">
          <v-text-field
            v-model="vv.value"
            clearable
            clear-icon="mdi-delete-variant"
            append-icon="mdi-check"
            @click:append="onSave(vv)"
          ></v-text-field>
        </v-col>
      </v-row>
    </template>

    <template #LIST>
      <variable-table :variable="variable"></variable-table>
    </template>
    <template #EDIT> Edit </template>
  </editor-base>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";
import EditorBase from "../Shell/EditorBase.vue";
import VariableTable from "./VariableTable.vue";
export default Vue.extend({
  components: { EditorBase, VariableTable },
  props: ["variable"],
  data() {
    return {
      application: null,
      part: null,
      views: [
        { id: "FORM", icon: "mdi-format-list-bulleted" },
        { id: "LIST", icon: "mdi-table" },
        { id: "EDIT", icon: "mdi-pencil" },
      ],
      actionViewid: "FORM",
    };
  },
  computed: {
    //...mapState("app", ["environments"]),
    selectedApplicationId: function () {
      return this.application ? this.application.id : null;
    },
    selectedPartId: function () {
      return this.part ? this.part.id : null;
    },
    actions: function () {
      if (this.actionViewid === "EDIT") {
        return [{ id: "SAVE", icon: "mdi-check" }];
      }

      return null;
    },
    variableValues: function () {
      const values = this.$store.state.apps.environments.map((x) => {
        return {
          environmentId: x.id,
          environment: x.name,
        };
      });
      values.unshift({
        environmentId: null,
        environment: "Global",
      });

      for (let i = 0; i < values.length; i++) {
        const env = values[i];
        env.value = "";
        env.id = null;
        const vv = this.variable.values.find(
          (x) =>
            x.key.environmentId === env.environmentId &&
            x.key.applicationId === this.selectedApplicationId &&
            x.key.partId === this.selectedPartId
        );
        if (vv != null) {
          env.value = vv.value;
          env.id = vv.id;
        }
      }

      console.log(values);
      return values;
    },
    applications: function () {
      const all = [...this.$store.state.apps.apps];
      all.unshift({
        id: null,
        name: "All",
      });

      return all;
    },
    parts: function () {
      const parts = [
        {
          id: null,
          name: "All",
        },
      ];

      if (this.application && this.application.parts) {
        return [...parts, ...this.application.parts];
      }

      return parts;
    },
  },
  methods: {
    ...mapActions("vars", ["saveValue"]),
    getKey: function (value) {
      return `${this.variableId}_${value.environmentId}_${
        this.selectedApplicationId ?? "G"
      }_${this.selectedPartId ?? "G"}`;
    },
    onSave: function (value) {
      this.saveValue({
        variableId: this.variable.id,
        valueId: value.id,
        value: value.value,
        applicationId: this.selectedApplicationId,
        partId: this.selectedPartId,
        environmentId: value.environmentId,
      });
    },

    viewChanged: function (id) {
      this.actionViewid = id;
      console.log(id);
    },
  },
});
</script>

<style></style>
