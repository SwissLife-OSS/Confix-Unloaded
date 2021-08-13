<template>
  <v-row>
    <v-col md="4"><variables-search></variables-search> </v-col>
    <v-col md="8"></v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import VariablesSearch from "./VariablesSearch.vue";
export default Vue.extend({
  components: { VariablesSearch },
});
</script>

<style></style>
