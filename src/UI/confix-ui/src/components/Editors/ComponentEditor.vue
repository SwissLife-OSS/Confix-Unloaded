<template>
  <v-card class="mt-2" elevation="1" rounded="0" height="600">
    <v-toolbar height="36" color="teal darken-3" dark>
      <v-toolbar-title>{{ component.name }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn shaped small color="teal darken-1" class="ml-6" @click="onSave">
        Save
        <v-icon right>mdi-content-save-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <MonacoEditor class="editor" v-model="code" language="graphql" />
    </v-card-text>
  </v-card>
</template>

<script>
import MonacoEditor from "vue-monaco";
import { mapActions } from "vuex";
export default {
  components: {
    MonacoEditor,
  },
  mounted() {
    this.code = this.component.schema ?? "";
  },
  props: ["component"],

  data() {
    return {
      code: "",
    };
  },
  computed: {},
  methods: {
    ...mapActions("comp", ["updateSchema"]),
    onSave: function () {
      this.updateSchema({
        id: this.component.id,
        schema: this.code,
      });
    },
  },
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 400px;
}
</style>