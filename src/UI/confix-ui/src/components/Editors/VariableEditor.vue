<template>
  <v-card class="mt-2" elevation="1" rounded="0">
    <v-toolbar height="36" color="amber darken-4" dark>
      <v-toolbar-title>{{ variable.name }} </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-row v-for="env in environmentsWithGlobal" :key="env.id">
        <v-col md="12">
          <v-text-field
            v-model="env.value"
            :label="env.name"
            clearable
            clear-icon="mdi-delete-variant"
            append-icon="mdi-content-save"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["variable"],
  computed: {
    //...mapState("app", ["environments"]),
    environmentsWithGlobal: function () {
      const all = [...this.$store.state.apps.environments];
      all.unshift({
        id: "0",
        name: "Global",
      });

      return all;
    },
  },
};
</script>

<style>
</style>