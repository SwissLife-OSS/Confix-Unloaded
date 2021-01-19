<template>
  <div>
    <v-row>
      <v-col md="7">
        <v-text-field
          class="mb-4"
          v-model="searchText"
          @input="handleSearch"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          flat
          hide-details
          clearable
        ></v-text-field
      ></v-col>
      <v-col md="5">
        <v-btn-toggle v-model="typeFilter" dense multiple class="mt-6">
          <v-btn color="#fff" small>
            <v-icon color="#7986cb">mdi-package-variant</v-icon>
          </v-btn>
          <v-btn color="#fff" small>
            <v-icon color="#26A69A">mdi-toy-brick-outline</v-icon>
          </v-btn>
          <v-btn color="#fff" small>
            <v-icon color="#FFCA28">mdi-variable</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-treeview
      :return-object="true"
      :open-on-click="false"
      :items="nodes"
      :search="searchText"
      activatable
      item-key="id"
      ref="tree"
      :multiple-active="false"
      @update:active="onSelect"
      :open="initiallyOpen"
      dense
    >
      <template v-slot:prepend="{ open, item }">
        <v-icon
          size="20"
          :color="item.color"
          v-if="item.icon && item.icon == 'mdi-folder'"
        >
          {{ open ? "mdi-folder-open" : "mdi-folder" }}
        </v-icon>

        <v-icon size="22" :color="item.color" v-else v-text="item.icon">
        </v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const getAppNode = (app) => {
  const node = {
    id: app.id,
    name: app.name,
    type: "A",
    icon: "mdi-package-variant",
  };

  node.children = app.parts.map(getPartsNode);

  return node;
};

const getPartsNode = (part) => {
  const node = {
    id: part.id,
    name: part.name,
    type: "AP",
    icon: "mdi-application",
  };

  node.children = part.components.map((x) => {
    const apn = getAppComponentNode(x);

    return apn;
  });

  return node;
};

const getAppComponentNode = (ac) => {
  const node = {
    id: ac.id,
    name: ac.name,
    ac: "PC",
    icon: "mdi-toy-brick-outline",
    color: "#26A69A",
    item: ac,
  };

  return node;
};

export default {
  data() {
    return {
      initiallyOpen: ["APPS"],
      typeFilter: null,
      searchText: "",
    };
  },
  computed: {
    nodes: function () {
      const nodes = [];
      const appNode = {
        id: "APPS",
        name: "Applications",
        type: "A_FOLDER",
        icon: "mdi-folder",
        color: "#7986cb",
      };
      nodes.push(appNode);
      appNode.children = this.$store.state.apps.apps.map(getAppNode);

      const compNode = {
        id: "C",
        name: "Components",
        type: "C_FOLDER",
        icon: "mdi-folder",
        color: "#26A69A",
      };
      nodes.push(compNode);
      compNode.children = this.$store.state.comp.components.map((x) => {
        x.type = "C";
        x.icon = "mdi-toy-brick-outline";
        return x;
      });

      const varNode = {
        id: "V",
        name: "Variables",
        type: "V_FOLDER",
        icon: "mdi-folder",
        color: "#FFCA28",
      };
      nodes.push(varNode);
      varNode.children = this.$store.state.vars.vars.map((x) => {
        x.type = "V";
        x.icon = "mdi-variable";

        return x;
      });

      return nodes;
    },
  },
  methods: {
    ...mapActions("shell", ["openTab"]),
    handleSearch(input) {
      if (input) {
        if (input.length > 2) this.$refs.tree.updateAll(true);
      } else {
        this.$refs.tree.updateAll(false);
      }
    },
    onSelect: function (nodes) {
      console.log(nodes);

      if (nodes.length > 0) {
        const node = nodes[0];

        switch (node.type) {
          case "PC":
            break;
          case "V":
            this.openTab({
              type: "VARIABLE",
              title: node.name,
              id: node.id,
              item: {
                variable: node,
              },
            });
            break;
        }
      }
    },
  },
};
</script>

<style>
</style>