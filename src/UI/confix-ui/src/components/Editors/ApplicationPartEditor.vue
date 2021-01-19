<template>
  <v-card class="mt-2" elevation="1" rounded="0" height="300">
    <v-toolbar height="36" color="indigo darken-4" dark>
      <v-toolbar-title>
        Edit application part : {{ application.name }} | {{ part.name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        shaped
        small
        color="indigo darken-2"
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
          <v-text-field label="Part name" v-model="part.name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-combobox
            v-model="part.components"
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
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["part", "application"],

  computed: {
    ...mapState("comp", ["components"]),
  },
  methods: {
    ...mapActions("apps", ["updatePart"]),
    onClickSave() {
      this.updatePart({
        applicationId: this.application.id,
        partId: this.part.id,
        name: this.part.name,
        components: this.components.map((x) => x.id),
      });
    },
  },
};
</script>

<style>
</style>
