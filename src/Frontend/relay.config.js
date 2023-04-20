module.exports = {
  schema: "./schema.graphql",
  schemaExtensions: [],
  src: "./src",
  eagerEsModules: false,
  noFutureProofEnums: true,
  language: "typescript",
  artifactDirectory: "src/__generated__",
  persistConfig: {
    file: "./persisted_queries.json",
    algorithm: "SHA256",
  },
};
