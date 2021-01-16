<template>
  <v-row>
    <v-col md="3">
      <v-autocomplete
        v-show="selectedApp === null"
        v-model="selectedApp"
        hide-no-data
        hide-selected
        clearable
        item-text="name"
        :items="apps"
        item-value="id"
        label="Application"
        placeholder="Search Aplication"
        prepend-icon="mdi-magnify"
        return-object
      ></v-autocomplete>

      <v-card v-if="selectedApp" class="ma-2">
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
                  <v-btn icon @click.stop="onClickAddComponent(part)">
                    <v-icon small color="grey lighten-1"
                      >mdi-shape-square-plus</v-icon
                    >
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
        </v-card-text>
      </v-card>
    </v-col>

    <v-col md="9">
      <tab-list></tab-list>
      <br />
      <editor-shell></editor-shell>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditorShell from "../Shell/EditorShell.vue";
import TabList from "../Shell/TabList.vue";

export default {
  components: { TabList, EditorShell },
  created() {
    this.loadApps();
  },
  data() {
    return {
      selectedApp: null,
      selectedComponent: null,
    };
  },
  watch: {
    selectedApp: function (newValue) {
      console.log(newValue);
    },
  },
  computed: {
    ...mapState("apps", ["apps"]),
    ...mapState("shell", ["selectedTabId"]),
  },
  methods: {
    ...mapActions("apps", ["loadApps"]),
    ...mapActions("shell", ["openTab"]),
    onClickAddComponent: function (part) {
      console.log(part);
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