<template>
  <v-dialog width="500" v-model="isOpen">
    <v-card elevation="1" rounded="0">
      <v-toolbar color="indigo darken-4" height="36" dark>
        <v-toolbar-title>Add new application</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="isOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-text-field label="Name" v-model="newApp.name"></v-text-field>

        <v-combobox
          v-model="newApp.parts"
          :items="[]"
          hide-selected
          label="Parts"
          chips
          multiple
          clearable
          deletable-chips
        ></v-combobox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text color="primary" @click="onClickSave"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    show: {
      type: Boolean,
    },
  },
  data() {
    return {
      newApp: {
        name: null,
      },
    };
  },
  computed: {
    isOpen: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("close", val);
      },
    },
  },
  methods: {
    ...mapActions("apps", ["addApplication"]),
    onClickSave: function () {
      this.addApplication({
        name: this.newApp.name,
        parts: this.newApp.parts,
      });
      this.$emit("close", false);
    },
  },
};
</script>

<style>
</style>