module.exports = {
  schema: "./schema.graphql",
  schemaExtensions: [],
  src: "./src",
  eagerEsModules: true,
  noFutureProofEnums: true,
  language: "typescript",
  artifactDirectory: "src/__generated__",
  persistConfig: {
    file: "../Backend/src/Authoring.GraphQL/PersistedQueries/persisted_queries.json",
  },
};
