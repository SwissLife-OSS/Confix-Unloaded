import { GraphQLClient } from "graphql-request";
import { ActionContext } from "vuex";
import { configuration } from "../configuration";
import { getSdk } from "../graphql-operations";
import { Any } from "../helpers/Any";
import { useModules } from "../helpers/bind";

const graphqlClient = new GraphQLClient(configuration.endpoint.url);
export const useClient = <S, R>(
  context: ActionContext<S, R>
): ReturnType<typeof getSdk> => {
  return getSdk(graphqlClient, async (action, operationName) => {
    try {
      return await action();
    } catch {
      await useModules(context)
        .action("shell", "addMessage")
        .rootDispatch({
          text: `An API error has accoured in operation ${operationName}.`,
          type: "ERROR",
        });
      return { errors: [{ message: "An API error has accoured." }] } as Any;
    }
  });
};
