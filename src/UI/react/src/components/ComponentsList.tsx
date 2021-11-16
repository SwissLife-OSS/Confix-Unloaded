import { useCallback } from "react";
import {
  useLazyLoadQuery,
  usePaginationFragment,
  useFragment,
} from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Settings } from "../settings";
import { InfiniteScrollList } from "../shared/InfiniteScrollList";
import { ComponentsListQuery } from "./__generated__/ComponentsListQuery.graphql";
import { ComponentsList_componentEdge$key } from "./__generated__/ComponentsList_componentEdge.graphql";
import { ComponentsList_components$key } from "./__generated__/ComponentsList_components.graphql";

const componentsQuery = graphql`
  query ComponentsListQuery($cursor: String, $count: Int) {
    ...ComponentsList_components
  }
`;
const componentsConnectionFragment = graphql`
  fragment ComponentsList_components on Query
  @refetchable(queryName: "ComponentsListPaginationQuery") {
    components(after: $cursor, first: $count)
      @connection(key: "Query_components") {
      edges {
        node {
          ...ComponentsList_componentEdge
        }
      }
    }
  }
`;

const componentFragment = graphql`
  fragment ComponentsList_componentEdge on Component @relay(plural: true) {
    id
    name
  }
`;

export const ComponentsList: React.FC<{
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect }) => {
  const queryData = useLazyLoadQuery<ComponentsListQuery>(componentsQuery, {
    count: Settings.pagination.pageSize,
  });
  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<ComponentsListQuery, ComponentsList_components$key>(
    componentsConnectionFragment,
    queryData
  );
  const data = useFragment<ComponentsList_componentEdge$key>(
    componentFragment,
    connection?.components?.edges?.map((x) => x.node) ?? null
  );
  const handleOnItemSelected = useCallback(
    (t: { id: string }) => onItemSelect(t.id),
    [onItemSelect]
  );
  return (
    <InfiniteScrollList
      items={data?.map((x) => x) ?? []}
      label="name"
      id="id"
      isLoading={isLoadingNext || !data}
      hasNext={hasNext}
      loadMore={loadNext}
      onItemSelect={handleOnItemSelected}
    />
  );
};
