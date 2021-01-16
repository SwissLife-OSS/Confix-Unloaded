<template>
  <div v-if="activeTabItem">
    <v-card class="mt-2" v-if="activeTabItem.type === 'APP_COMPONENT_CONFIG'">
      <v-toolbar height="36" color="indigo darken-4" dark>
        <v-toolbar-title
          >{{ activeTabItem.item.part.name }} |
          {{ activeTabItem.item.component.name }}
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn-toggle v-model="environment" dense rounded tile group>
          <v-btn small value="DEV" rounded> DEV </v-btn>
          <v-btn small value="STAGE" rounded> STAGE </v-btn>
          <v-btn small value="PROD" rounded> PROD </v-btn>
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
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {},
  data() {
    return {
      environment: "A",
    };
  },

  computed: {
    ...mapState("shell", ["selectedTabId"]),
    activeTabItem: function () {
      if (this.$store.state.shell.selectedTabId) {
        const active = this.$store.state.shell.tabs.filter(
          (x) => x.id === this.$store.state.shell.selectedTabId
        )[0];
        return active;
      }

      return null;
    },
  },
  methods: {},
};
</script>

<style>
</style>