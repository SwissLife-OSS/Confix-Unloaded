import apollo from "../apollo";
import QUERY_GET_ALL_VARIABLES from "../graphql/Variable/GetAll.gql";
import QUERY_GET_BY_ID from "../graphql/Variable/GetById.gql";
import MUTATION_ADD_VARIABLE from "../graphql/Variable/Add.gql";
import MUTATION_SAVE_VALUE from "../graphql/Variable/SaveValue.gql";

export const getAllVariables = async () => {
    return await apollo.query({
        query: QUERY_GET_ALL_VARIABLES,
        variables: {}
    });
};

export const getById = async (id) => {
    return await apollo.query({
        query: QUERY_GET_BY_ID,
        variables: {
            id
        }
    });
};

export const addVariable = async (input) => {
    return await apollo.mutate({
        mutation: MUTATION_ADD_VARIABLE,
        variables: {
            input
        }
    });
};

export const saveValue = async (input) => {
    return await apollo.mutate({
        mutation: MUTATION_SAVE_VALUE,
        variables: {
            input
        }
    });
};
