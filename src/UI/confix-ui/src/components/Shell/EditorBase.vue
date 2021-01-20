<template>
  <v-card class="mt-2" elevation="1" rounded="0">
    <v-toolbar height="36" color="amber lighten-4" light>
      <v-toolbar-title
        ><v-icon color="black" class="mr-2">{{ icon }}</v-icon
        >{{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title", "color", "icon", "actions", "views"],
};
</script>

<style>
</style>