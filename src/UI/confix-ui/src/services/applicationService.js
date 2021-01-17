import apollo from "../apollo";
import QUERY_GET_ALL_APPLICATION from "../graphql/Application/GetAll.gql";
import MUTATION_ADD_APPLICATION from "../graphql/Application/Add.gql";

export const getAllApplications = async () => {
    return await apollo.query({
        query: QUERY_GET_ALL_APPLICATION,
        variables: {}
    });
};

export const addApplication = async (input) => {
    return await apollo.mutate({
        mutation: MUTATION_ADD_APPLICATION,
        variables: {
            input
        }
    });
};

