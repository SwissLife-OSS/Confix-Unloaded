<template>
  <v-card class="mt-2" elevation="1" rounded="0">
    <v-toolbar height="36" color="teal darken-3" dark>
      <v-toolbar-title>{{ component.name }} </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <MonacoEditor class="editor" v-model="code" language="graphql" />
    </v-card-text>
  </v-card>
</template>

<script>
import MonacoEditor from "vue-monaco";
export default {
  components: {
    MonacoEditor,
  },
  props: ["component"],

  data() {
    return {
      code: `type ${this.component.name}\n\
{\n\
    ClientId: String!\n\
    Secret: String!\n\
}`,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 400px;
}
</style>