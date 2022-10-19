import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { useEnvironmentsQuery } from "./__generated__/useEnvironmentsQuery.graphql";
import { useEnvironments_searchEnvironments$key } from "./__generated__/useEnvironments_searchEnvironments.graphql";

const environmentsQuery = graphql`
  query useEnvironmentsQuery($cursor: String, $count: Int) {
    ...useEnvironments_searchEnvironments
  }
`;
const environmentsConnectionFragment = graphql`
  fragment useEnvironments_searchEnvironments on Query
  @refetchable(queryName: "useEnvironmentsPaginationQuery") {
    searchEnvironments(after: $cursor, first: $count)
      @connection(key: "useEnvironments_searchEnvironments") {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const useEnvironments = (): { id: string; name: string }[] => {
  const data = useLazyLoadQuery<useEnvironmentsQuery>(environmentsQuery, {});
  const { data: connection } = usePaginationFragment<
    useEnvironmentsQuery,
    useEnvironments_searchEnvironments$key
  >(environmentsConnectionFragment, data);

  return connection?.searchEnvironments?.edges?.map((x) => x.node) ?? [];
};
