<template>
  <v-card class="mt-2" elevation="1" rounded="0">
    <v-toolbar height="36" color="amber lighten-4" light>
      <v-toolbar-title
        ><v-icon color="black" class="mr-2">mdi-variable</v-icon
        >{{ variable.name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="mx-2" @click="setView('FORM')" disabled
        >mdi-form-textbox</v-icon
      >
      <v-icon class="mx-2" @click="setView('LIST')"
        >mdi-format-list-bulleted-square</v-icon
      >
      <v-icon class="mr-0" @click="setView('EDIT')">mdi-pencil</v-icon>
    </v-toolbar>
    <v-card-text>
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

      <v-row v-for="vv in variableValues" :key="vv.environmentId">
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
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["variable"],
  data() {
    return {
      application: null,
      part: null,
      view: "FORM",
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
        const vv = this.variable.values.find(
          (x) =>
            x.environmentId === env.environmentId &&
            x.applicationId === this.selectedApplicationId &&
            x.partId === this.selectedPartId
        );
        console.log(env.environmentId, this.selectedPartId, vv);
        if (vv != null) {
          env.value = vv.value;
          env.id = vv.id;
        } else {
          env.value = null;
          env.id = null;
        }
      }

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
    setView: function (name) {
      this.view = name;
    },
  },
};
</script>

<style>
</style>