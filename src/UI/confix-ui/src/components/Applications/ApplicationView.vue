<template>
  <div>
    <div v-if="selectedApp === null">
      <v-text-field
        clearable
        v-model="searchText"
        placeholder="Search"
        prepend-icon="mdi-magnify"
        append-outer-icon="mdi-plus"
        @click:append-outer="onClickAddApplication"
      ></v-text-field>

      <v-list two-line rounded dense class="mt-0">
        <v-list-item-group color="primary" select-object>
          <v-list-item
            v-for="app in applications"
            :key="app.id"
            selectable
            @click="onSelectApp(app)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="app.name"></v-list-item-title>
              <v-list-item-subtitle
                v-text="app.parts.map((x) => x.name).join(' | ')"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>

    <v-card v-if="selectedApp" elevation="1" rounded="0">
      <v-toolbar color="indigo darken-4" height="36" dark>
        <v-toolbar-title>{{ selectedApp.name }}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="onClickCloseApp">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-code-json</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-cloud-upload-outline</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text>
        Parts
        <v-list nav dense>
          <v-list-group
            :value="true"
            v-for="part in selectedApp.parts"
            :key="part.id"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  <strong>{{ part.name }}</strong></v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click.stop="onClickEditPart(part)">
                  <v-icon small color="grey lighten-1">mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>

            <v-list-item dense>
              <v-list-item-title>Configuration </v-list-item-title>
            </v-list-item>

            <v-list-item
              dense
              v-for="(component, i) in part.components"
              :key="i"
              selectable
              @click="onSelectComponent(part, component)"
            >
              <v-list-item-title v-text="component.name"></v-list-item-title>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon small color="grey lighten-1"
                    >mdi-delete-variant</v-icon
                  >
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>

        Components
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  created() {
    this.loadApplications();
  },
  data() {
    return {
      selectedApp: null,
      selectedComponent: null,
      searchText: "",
    };
  },

  computed: {
    ...mapState("apps", ["apps"]),
    ...mapState("shell", ["selectedTabId"]),
    applications: function () {
      if (this.searchText) {
        const regex = new RegExp(`.*${this.searchText}.*`, "i");

        return this.apps.filter((x) => regex.test(x.name));
      }
      return this.apps;
    },
  },
  methods: {
    ...mapActions("apps", ["loadApps", "loadApplications"]),
    ...mapActions("shell", ["openTab"]),
    onClickEditPart: function (part) {
      this.openTab({
        type: "APP_PART",
        title: `Edit ${part.name}`,
        id: `${this.selectedApp.id}_${part.id}`,
        item: {
          application: this.selectedApp,
          part: part,
        },
      });
    },
    onClickAddApplication: function () {
      this.openTab({
        type: "APP_ADD",
        title: `New Application`,
        id: "APP_ADD",
        item: null,
      });
    },
    onSelectApp: function (app) {
      console.log(app);
      this.selectedApp = app;
    },
    onClickCloseApp: function () {
      this.selectedApp = null;
      this.selectedComponent = null;
    },
    onSelectComponent: function (part, component) {
      this.openTab({
        type: "APP_COMPONENT_CONFIG",
        title: `${part.name}/${component.name}`,
        id: `${this.selectedApp.id}_${part.name}_${component.name}`,
        item: {
          component: component,
          part: part,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>