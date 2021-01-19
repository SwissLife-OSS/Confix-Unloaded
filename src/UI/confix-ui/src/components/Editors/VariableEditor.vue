<template>
  <v-card class="mt-2" elevation="1" rounded="0">
    <v-toolbar height="36" color="amber darken-4" dark>
      <v-toolbar-title>{{ variable.name }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon right>mdi-pencil</v-icon>
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
            :disabled="application == null"
            return-object
          ></v-select
        ></v-col>
      </v-row>

      <v-row v-for="env in environmentsWithGlobal" :key="env.id">
        <v-col md="12">
          <v-text-field
            v-model="env.value"
            clearable
            clear-icon="mdi-delete-variant"
            :prefix="env.name"
            append-icon="mdi-check"
            @click:append="onSave(env)"
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
    };
  },
  computed: {
    //...mapState("app", ["environments"]),
    environmentsWithGlobal: function () {
      const all = [...this.$store.state.apps.environments];
      all.unshift({
        id: null,
        name: "Global",
      });

      return all;
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
    onSave: function (env) {
      this.saveValue({
        variableId: this.variable.id,
        valueId: null,
        value: env.value,
        applicationId: this.application ? this.application.id : null,
        partId: this.part ? this.part.id : null,
        environmentId: env.id,
      });
    },
  },
};
</script>

<style>
</style>