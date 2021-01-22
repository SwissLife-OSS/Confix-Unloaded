<template>
  <v-card class="mt-2" elevation="1" rounded="0">
    <v-toolbar height="36" :color="color" light>
      <v-toolbar-title
        ><v-icon color="black" class="mr-2">{{ icon }}</v-icon
        >{{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="views">
        <v-icon
          v-for="view in views"
          :key="view.id"
          v-text="view.icon"
          class="mx-1"
          @click="setView(view)"
        ></v-icon>
      </div>
      <slot name="Toolbar"></slot>
      <div v-if="actions">
        <div v-if="views" class="action-divider"></div>
        <v-btn
          v-for="action in actions"
          :key="action.id"
          icon
          outlined
          small
          @click="onActionClick(action)"
        >
          <v-icon v-text="action.icon" class="mx-1" color="black"></v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-card-text>
      <div v-for="view in views" :key="view.id">
        <slot
          v-if="view.id === activeView"
          :name="view.id"
          v-bind="view"
        ></slot>
      </div>
      <slot v-if="views === undefined"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title", "color", "icon", "actions", "views"],
  created() {
    if (this.views && this.views.length > 0) {
      this.activeView = this.views[0].id;
    }
  },
  data() {
    return {
      activeView: null,
    };
  },
  methods: {
    setView: function (view) {
      this.activeView = view.id;
      this.$emit("ViewChanged", view.id);
    },
    onActionClick: function (action) {
      this.$emit("Action", action.id);
    },
  },
};
</script>

<style scoped>
.action-divider {
  display: inline;
  border-left: 2px solid rgba(0, 0, 0, 0.616);
  height: 100%;
  margin-left: 18px;
  margin-right: 14px;
}
</style>