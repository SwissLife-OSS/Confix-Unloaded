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

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { Any } from "../../helpers/Any";
import { mapStateOfNamespace } from "../../helpers/mapFunctions";
import { Application } from "../../state/Application";

interface INode {
  id: string;
  name: string;
  type: string;
  icon: string;
  children: INode[];
  item?: Any;
  color?: string;
}
const getAppNode = (app: Application): INode => ({
  id: app.id,
  name: app.name,
  type: "A",
  icon: "mdi-package-variant",
  children: app.parts.map(getPartsNode),
});

const getPartsNode = (part: Application["parts"][0]): INode => ({
  id: part.id,
  name: part.name,
  type: "AP",
  icon: "mdi-application",
  children: part.components.map(getAppComponentNode),
});

const getAppComponentNode = (
  component: Application["parts"][0]["components"][0]
): INode => ({
  id: component.id,
  name: component.name,
  type: "PC",
  icon: "mdi-toy-brick-outline",
  color: "#26A69A",
  item: component,
  children: [],
});

export default defineComponent({
  data: () => ({
    initiallyOpen: ["APPS"],
    typeFilter: null,
    searchText: "",
  }),
  computed: {
    ...mapStateOfNamespace("apps", "apps"),
    ...mapStateOfNamespace("comp", "components"),
    nodes: function (): INode[] {
      return [
        {
          id: "APPS",
          name: "Applications",
          type: "A_FOLDER",
          icon: "mdi-folder",
          color: "#7986cb",
          children: this.apps.map(getAppNode),
        },
        {
          id: "C",
          name: "Components",
          type: "C_FOLDER",
          icon: "mdi-folder",
          color: "#26A69A",
          children: this.components.map(getAppComponentNode),
        },
      ];

      // const varNode = {
      //   id: "V",
      //   name: "Variables",
      //   type: "V_FOLDER",
      //   icon: "mdi-folder",
      //   color: "#FFCA28",
      //   children: [],
      // };
      // nodes.push(varNode);
      // varNode.children = this.$store.state.vars.vars.map((x) => {
      //   x.type = "V";
      //   x.icon = "mdi-variable";

      //   return x;
      // });
    },
  },
  methods: {
    ...mapActions("shell", ["openTab"]),
    handleSearch(input: []): void {
      const tree = this.$refs.tree as Any;
      if (input) {
        if (input.length > 2) tree.updateAll(true);
      } else {
        tree.updateAll(false);
      }
    },
    onSelect: function (nodes: INode[]): void {
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
});
</script>

<style></style>
