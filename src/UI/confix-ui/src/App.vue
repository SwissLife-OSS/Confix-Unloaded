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
        <v-col md="6">
          <router-view></router-view>
        </v-col>
        <v-col md="6">
          <tab-list></tab-list>
          <br />
          <editor-shell-manager></editor-shell-manager>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import EditorShellManager from "./components/Shell/EditorShellManager";
import TabList from "./components/Shell/TabList.vue";
export default {
  name: "App",

  components: { TabList, EditorShellManager },
  created() {
    this.$store.dispatch("comp/loadComponents");
    this.$store.dispatch("apps/loadApplications");
    this.$store.dispatch("vars/loadVariables");
  },

  data: () => ({
    navItems: [
      {
        text: "Applications",
        icon: "mdi-package-variant",
        route: "Applications",
      },
      {
        text: "Components",
        icon: "mdi-toy-brick-outline",
        route: "Components",
      },
      { text: "Variables", icon: "mdi-variable", route: "Variables" },
      { text: "Environments", icon: "mdi-server", route: "Environments" },
      { text: "Vault", icon: "mdi-shield-star-outline", route: "Vault" },
      { text: "Explorer", icon: "mdi-file-tree-outline", route: "Explorer" },
      { text: "Settings", icon: "mdi-cog-outline", route: "Settings" },
    ],
  }),
  computed: {
    navBarItems: function () {
      return this.navItems.map((x) => {
        x.active = x.route === this.$route.name;
        x.color = x.active ? "#fff" : "#b3b3b3";

        return x;
      });
    },
    statusMessage: function () {
      if (this.$store.state.shell.statusMessage) {
        const isError = this.$store.state.shell.statusMessage.type === "ERROR";

        return Object.assign(this.$store.state.shell.statusMessage, {
          color: isError ? "red" : "green",
          icon: isError ? "mdi-nuke" : "mdi-check-circle",
        });
      } else {
        return null;
      }
    },
  },
  methods: {
    onNavigate: function (nav) {
      if (!nav.active) this.$router.push({ name: nav.route });
    },
  },
};
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
