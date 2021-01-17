<template>
  <v-dialog width="500" v-model="isOpen">
    <v-card elevation="1" rounded="0">
      <v-toolbar color="indigo darken-4" height="36" dark>
        <v-toolbar-title>Add components to </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="isOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-combobox
          v-model="newApp.parts"
          :items="components"
          hide-selected
          label="Components"
          chips
          item-value="id"
          item-text="name"
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
import { mapActions, mapState } from "vuex";
export default {
  props: {
    show: {
      type: Boolean,
    },
    part: {
      type: Object,
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
    ...mapState("apps", ["components"]),
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
    ...mapActions("apps", ["addComponents"]),
    onClickSave: function () {},
  },
};
</script>

<style>
</style>