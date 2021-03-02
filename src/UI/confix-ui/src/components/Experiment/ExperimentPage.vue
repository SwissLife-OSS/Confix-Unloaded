<template>
  <v-container fluid>
    <v-card>
      <v-toolbar height="28" elevation="0" color="indigo lighten-3"
        >Configuration</v-toolbar
      >
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <ValueEditor
              v-for="item in schema.items"
              :key="item.name"
              :multiline="true"
              :item="item"
              value="ssas"
            ></ValueEditor>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ValueEditor from "./ValueEditor";
export default {
  components: { ValueEditor },
  props: ["label"],
  data() {
    return {
      schema: {
        items: [
          {
            name: "authority",
            type: "string",
          },
          {
            name: "Type",
            type: "enum",
            values: ["API", "UI", "Worker"],
          },
          {
            name: "OpenIdConnect",
            type: "object",
            items: [
              {
                name: "clientId",
                type: "string",
                value: "default id",
              },
              {
                name: "secret",
                type: "string",
              },
              {
                name: "JwtValidation",
                type: "object",
                items: [
                  {
                    name: "UseCache",
                    type: "bool",
                  },
                  {
                    name: "ValidIssuer",
                    type: "string",
                  },
                ],
              },
            ],
          },
          {
            name: "HttpClients",
            type: "array",
            items: [
              {
                name: "Name",
                type: "string",
              },
              {
                name: "Url",
                type: "string",
              },
              {
                name: "AuthenticationType",
                type: "enum",
                values: ["Token", "Basic", "Certificate", "None"],
              },
              {
                name: "Poly",
                type: "object",
                items: [
                  {
                    name: "Enable",
                    type: "bool",
                  },
                  {
                    name: "Policy",
                    type: "enum",
                    values: ["Retry", "WaitForEver", "Explode"],
                  },
                  {
                    name: "Rules",
                    type: "array",
                    items: [
                      {
                        name: "Name",
                        type: "string",
                      },
                      {
                        name: "Retry Timeout",
                        type: "number",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>