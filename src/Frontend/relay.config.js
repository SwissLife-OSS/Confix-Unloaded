module.exports = {
  schema: "./schema.graphql",
  schemaExtensions: [],
  src: "./src",
  eagerEsModules: true,
  noFutureProofEnums: false,
  language: "typescript",
  artifactDirectory: "src/__generated__",
  persistConfig: {
    file: "./persisted_queries.json",
    algorithm: "SHA256",
  },
};
