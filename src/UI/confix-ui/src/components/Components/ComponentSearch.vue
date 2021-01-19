<template>
  <div>
    <v-text-field
      clearable
      placeholder="Search"
      prepend-icon="mdi-magnify"
      append-outer-icon="mdi-plus"
      @click:append-outer="onClickAddComponent"
    ></v-text-field>

    <v-list rounded dense class="mt-0">
      <v-list-item-group v-model="selectedVar" color="primary">
        <v-list-item
          v-for="component in components"
          :key="component.id"
          selectable
          @click="onSelectComponent(component)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="component.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  created() {
    this.loadComponents();
  },
  data() {
    return {
      selectedVar: null,
    };
  },
  computed: {
    ...mapState("comp", ["components"]),
  },
  methods: {
    ...mapActions("shell", ["openTab"]),
    ...mapActions("comp", ["loadComponents"]),

    onSelectComponent: function (component) {
      this.openTab({
        type: "COMPONENT",
        title: component.name,
        id: component.id,
        item: {
          component,
        },
      });
    },
    onClickAddComponent: function () {
      this.openTab({
        type: "NEW_COMPONENT",
        title: "New Component",
        id: "NC",
      });
    },
  },
};
</script>

<style>
</style>