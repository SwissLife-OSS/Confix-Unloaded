import apollo from "../apollo";
import QUERY_COMPONENT_GET_ALL from "../graphql/Component/GetAll.gql";
import MUTATION_COMPONENT_CREATE from "../graphql/Component/Create.gql";
import MUTATION_SCHEMA_UPDATE from "../graphql/Component/UpdateSchema.gql";
import MUTATION_SCHEMA_AND_VALUES_UPDATE from "../graphql/Component/UpdateSchemaAndValues.gql";

export const getAllComponents = async () => {
  return await apollo.query({
    query: QUERY_COMPONENT_GET_ALL,
    variables: {}
  });
};

export const createComponent = async input => {
  return await apollo.mutate({
    mutation: MUTATION_COMPONENT_CREATE,
    variables: {
      input
    }
  });
};

export const updateSchema = async input => {
  return await apollo.mutate({
    mutation: MUTATION_SCHEMA_UPDATE,
    variables: {
      input
    }
  });
};

export const updateSchemaAndValues = async (schema, values) => {
  return await apollo.mutate({
    mutation: MUTATION_SCHEMA_AND_VALUES_UPDATE,
    variables: {
      schema,
      values
    }
  });
};
