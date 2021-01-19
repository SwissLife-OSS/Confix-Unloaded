<template>
  <div>
    <v-card class="mt-2" elevation="1" rounded="0" height="600">
      <v-toolbar height="36" color="amber darken-4" dark>
        <v-toolbar-title>New Variable</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          shaped
          small
          color="amber darken-2"
          class="ml-6"
          @click="onClickSave"
        >
          Save
          <v-icon right>mdi-content-save-outline</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              :value="newVariable.name"
              @input="newVariable.name = $event.toUpperCase()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="2">
            <v-switch label="Secret" v-model="newVariable.isSecret"></v-switch>
          </v-col>
          <v-col md="10">
            <v-text-field
              label="Namespace"
              v-model="newVariable.namespace"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Default Value"
              v-model="newVariable.defaultValue"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <GlobalEvents
      @keydown.prevent="keyPressed"
      :filter="(event, handler, eventName) => event.target.tagName !== 'INPUT'"
    ></GlobalEvents>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GlobalEvents from "vue-global-events";

export default {
  components: { GlobalEvents },

  data() {
    return {
      newVariable: {
        name: null,
        namespace: null,
        defaultValue: null,
        isSecret: true,
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions("vars", ["addVariable"]),
    ...mapActions("shell", ["closeActiveTab"]),
    onClickSave: function () {
      this.addVariable({
        name: this.newVariable.name,
        namespace: this.newVariable.namespace,
        isSecret: this.newVariable.isSecret,
        defaultValue: this.newVariable.defaultValue,
      });
      this.closeActiveTab();
    },
    keyPressed: function (key) {
      if (key.key === "s" && key.ctrlKey) {
        this.onClickSave();
      }
    },
  },
};
</script>

<style scoped>
</style>