<template>
  <editor-base
    :title="`${part.name} ${component.name}`"
    :actions="actions"
    color="indigo lighten-4"
  >
    <pre>
    {


    }
    </pre>
    <template #Toolbar>
      <v-btn-toggle v-model="environment" dense rounded tile group>
        <v-btn
          v-for="env in environments"
          :key="env.ud"
          small
          :value="env.id"
          rounded
        >
          {{ env.name }}
        </v-btn>
      </v-btn-toggle>
    </template>
  </editor-base>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapStateOfNamespace } from "../../helpers/mapFunctions";
import { prop } from "../../helpers/state";
import { Application } from "../../state/Application";
import EditorBase from "../Shell/EditorBase.vue";

export default defineComponent({
  components: { EditorBase },
  props: {
    part: {
      type: prop<Application["parts"][0]>(),
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      environment: "A",
      actions: [{ id: "SAVE", icon: "mdi-check" }],
    };
  },
  computed: {
    ...mapStateOfNamespace("apps", "environments"),
  },
  methods: {},
});
</script>

<style></style>
