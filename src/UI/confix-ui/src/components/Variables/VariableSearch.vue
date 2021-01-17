<template>
  <div>
    <v-text-field
      clearable
      placeholder="Search"
      prepend-icon="mdi-magnify"
    ></v-text-field>

    <v-list rounded dense class="mt-0">
      <v-list-item-group v-model="selectedVar" color="primary">
        <v-list-item
          v-for="variable in variables"
          :key="variable.id"
          selectable
          @click="onSelectVariable(variable)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="variable.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-if="variable.isSecret">
            <v-icon color="yellow lighten-2">mdi-lock-outline</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  created() {
    this.loadVariables();
  },
  data() {
    return {
      selectedVar: null,
    };
  },
  computed: {
    ...mapState("vars", ["vars"]),
    variables: function () {
      return this.vars;
    },
  },
  methods: {
    ...mapActions("shell", ["openTab"]),
    ...mapActions("vars", ["loadVariables"]),

    onSelectVariable: function (variable) {
      this.openTab({
        type: "VARIABLE",
        title: variable.name,
        id: variable.id,
        item: {
          variable,
        },
      });
    },
  },
};
</script>

<style>
</style>