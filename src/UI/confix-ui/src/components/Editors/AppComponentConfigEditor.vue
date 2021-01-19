<template>
  <v-card class="mt-2" elevation="1" rounded="0">
    <v-toolbar height="36" color="indigo darken-4" dark>
      <v-toolbar-title
        >{{ part.name }} |
        {{ component.name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn-toggle v-model="environment" dense rounded tile group>
        <v-btn
          v-for="env in environments"
          :key="env.ud"
          small
          :value="env.id"
          rounded
        >
          {{ env.name }}
        </v-btn>
      </v-btn-toggle>
      <v-btn shaped small color="indigo darken-2" class="ml-6">
        Save
        <v-icon right>mdi-content-save-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <pre>
            {
            


            }
            </pre
      >
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["part", "component"],
  created() {},
  data() {
    return {
      environment: "A",
    };
  },

  computed: {
    ...mapState("apps", ["environments"]),
  },
  methods: {},
};
</script>

<style>
</style>