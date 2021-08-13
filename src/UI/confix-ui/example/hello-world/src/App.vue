<template>
  <v-app>
    <v-system-bar window dark color="grey darken-2" app>
      <span class="white--text">ConfiX | {{ $route.name }}</span>
      <v-spacer></v-spacer>
      <div class="mr-4 status-message" v-if="statusMessage">
        <v-icon
          :color="statusMessage.color"
          v-text="statusMessage.icon"
        ></v-icon>
        <span class="white--text">{{ statusMessage.text }}</span>
      </div>
      <v-icon color="green">mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-bell-outline</v-icon>
      <v-icon>mdi-account</v-icon>
    </v-system-bar>
    <v-navigation-drawer width="62" class="nav" app>
      <div
        class="nav-item"
        v-for="(nav, i) in navBarItems"
        :key="i"
        @click="onNavigate(nav)"
      >
        <v-icon class="icon" large light :color="nav.color">{{
          nav.icon
        }}</v-icon>
      </div>
    </v-navigation-drawer>

    <v-main>
      <v-row dense>
        <v-col md="4">
          <router-view></router-view>
        </v-col>
        <v-col md="8">
          <tab-list></tab-list>
          <br />
          <editor-shell-manager></editor-shell-manager>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import EditorShellManager from "./components/Shell/EditorShellManager";
import TabList from "./components/Shell/TabList.vue";
import { useModules } from "./helpers/bind";
import { extractStore } from "./helpers/extractStore";
import { mapStateOfNamespace } from "./helpers/mapFunctions";
import { array } from "./helpers/state";
import { StatusMessage } from "./state/StatusMessage";

interface NavItem {
  text: string;
  icon: string;
  route: string;
  active: boolean;
  color: string;
}
export default defineComponent({
  name: "App",
  components: { TabList, EditorShellManager },
  created() {
    const { action } = useModules(extractStore(this));
    action("comp", "loadComponents").dispatch();
    action("apps", "loadApplications").dispatch();
    // TODO Variables
    //action("vars", "loadVariables").dispatch();
  },

  data: () => ({
    navItems: array<NavItem>([
      {
        text: "Applications",
        icon: "mdi-package-variant",
        route: "Applications",
        active: false,
        color: "#b3b3b3",
      },
      {
        text: "Components",
        icon: "mdi-toy-brick-outline",
        route: "Components",
        active: false,
        color: "#b3b3b3",
      },
      {
        text: "Variables",
        icon: "mdi-variable",
        route: "Variables",
        active: false,
        color: "#b3b3b3",
      },
      {
        text: "Environments",
        icon: "mdi-server",
        route: "Environments",

        color: "#b3b3b3",
        active: false,
      },
      {
        text: "Vault",
        icon: "mdi-shield-star-outline",
        route: "Vault",
        active: false,
        color: "#b3b3b3",
      },
      {
        text: "Explorer",
        icon: "mdi-file-tree-outline",
        route: "Explorer",
        active: false,
        color: "#b3b3b3",
      },
      {
        text: "Settings",
        icon: "mdi-cog-outline",
        route: "Settings",
        active: false,
        color: "#b3b3b3",
      },
    ]),
  }),
  computed: {
    ...mapStateOfNamespace("shell", "statusMessage"),
    navBarItems: function (): NavItem[] {
      const { name } = useRoute();
      return this.navItems.map((x) => {
        x.active = x.route === name;
        x.color = x.active ? "#fff" : "#b3b3b3";
        return x;
      });
    },
    prepareStatusMessage: function (): StatusMessage | null {
      if (this.statusMessage) {
        const isError = this.statusMessage.type === "ERROR";

        return {
          ...this.statusMessage,
          color: isError ? "red" : "green",
          icon: isError ? "mdi-nuke" : "mdi-check-circle",
        };
      } else {
        return null;
      }
    },
  },
  methods: {
    onNavigate: function (nav: NavItem) {
      const router = useRouter();
      if (!nav.active) {
        router.push({ name: nav.route });
      }
    },
  },
});
</script>

<style scoped>
.nav {
  background-color: rgba(0, 0, 0, 0.753) !important;
}

.nav-item {
  height: 60px;
  width: 60px;
  transition: 0.4s;
}

.icon {
  margin-left: 12px;
  margin-top: 12px;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.79);
  border-radius: 40px;
}

.status-message {
  overflow: hidden;
}
</style>
