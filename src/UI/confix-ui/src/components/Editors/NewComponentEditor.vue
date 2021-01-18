<template>
  <v-card class="mt-2" elevation="1" rounded="0" height="600">
    <v-toolbar height="36" color="teal darken-4" dark>
      <v-toolbar-title>New Component</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        shaped
        small
        color="teal darken-2"
        class="ml-6"
        @click="onClickSave"
      >
        Save
        <v-icon right>mdi-content-save-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Name" v-model="newComponent.name"></v-text-field>
        </v-col> </v-row
    ></v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},

  data() {
    return {
      newComponent: {
        name: null,
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions("comp", ["addComponent"]),
    ...mapActions("shell", ["closeActiveTab"]),
    onClickSave: function () {
      this.addComponent({
        name: this.newComponent.name,
      });
      this.closeActiveTab();
    },
  },
};
</script>

<style scoped>
</style>