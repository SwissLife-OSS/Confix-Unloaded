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

<script>
import { mapState } from "vuex";
import EditorBase from "../Shell/EditorBase.vue";

export default {
  components: { EditorBase },
  props: ["part", "component"],
  created() {},
  data() {
    return {
      environment: "A",
      actions: [{ id: "SAVE", icon: "mdi-check" }],
    };
  },
  computed: {
    ...mapState("apps", ["environments"]),
  },
  methods: {},
};
</script>

<style>
</style>