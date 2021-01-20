import apollo from "../apollo";
import QUERY_GET_ALL_COMPONENT from "../graphql/Component/GetAll.gql";
import MUTATION_ADD_COMPONENT from "../graphql/Component/Add.gql";
import MUTATION_UPDATE_SCHEMA from "../graphql/Component/UpdateSchema.gql";

export const getAllComponents = async () => {
    return await apollo.query({
        query: QUERY_GET_ALL_COMPONENT,
        variables: {}
    });
};

export const addComponent = async (input) => {
    return await apollo.mutate({
        mutation: MUTATION_ADD_COMPONENT,
        variables: {
            input
        }
    });
};

export const updateSchema = async (input) => {
    return await apollo.mutate({
        mutation: MUTATION_UPDATE_SCHEMA,
        variables: {
            input
        }
    });
};
