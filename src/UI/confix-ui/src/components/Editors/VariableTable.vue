<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    :hide-default-footer="true"
    fixed-header
    height="400"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="onDelete(item)"> mdi-delete-variant </v-icon>
    </template></v-data-table
  >
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["variable"],
  data() {
    return {
      headers: [
        {
          text: "Environment",
          align: "start",
          sortable: false,
          value: "environment",
        },
        {
          text: "Application",
          align: "start",
          sortable: false,
          value: "application",
        },
        {
          text: "Part",
          align: "start",
          sortable: false,
          value: "part",
        },
        {
          text: "Value",
          align: "start",
          sortable: false,
          value: "value",
        },
        {
          text: "Actions",
          align: "end",
          sortable: false,
          value: "actions",
        },
      ],
    };
  },
  computed: {
    items: function () {
      return this.variable.values.map((v) => {
        return {
          id: v.id,
          environment: this.environmentName(v.key.environmentId),
          application: v.application ? v.application.name : "Global",
          part: v.part ? v.part.name : "Global",
          value: v.value,
        };
      });
    },
  },
  methods: {
    ...mapActions("vars", ["deleteValue"]),
    environmentName: function (id) {
      console.log(id);
      if (id) {
        var env = this.$store.state.apps.environments.find((x) => x.id === id);
        if (env) {
          return env.name;
        } else {
          return "NA";
        }
      }
      return "Global";
    },
    onDelete: function (variable) {
      this.deleteValue(variable.id);
      console.log(variable);
    },
  },
};
</script>

<style>
</style>