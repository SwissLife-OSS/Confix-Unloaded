import apollo from "../apollo";
import QUERY_APPLICATION_GET_ALL from "../graphql/Application/GetAll.gql";
import MUTATION_APPLICATION_CREATE from "../graphql/Application/Create.gql";
import MUTATION_PART_UPDATE from "../graphql/Application/UpdatePart.gql";

export const getAllApplications = async () => {
    return await apollo.query({
        query: QUERY_APPLICATION_GET_ALL,
        variables: {}
    });
};

export const createApplication = async (input) => {
    return await apollo.mutate({
        mutation: MUTATION_APPLICATION_CREATE,
        variables: {
            input
        }
    });
};

export const updatePart = async (input) => {
    return await apollo.mutate({
        mutation: MUTATION_PART_UPDATE,
        variables: {
            input
        }
    });
};

