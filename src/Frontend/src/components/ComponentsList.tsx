import { useCallback } from "react";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { config } from "../config";
import { InfiniteScrollList } from "../shared/InfiniteScrollList";
import { ComponentsListQuery } from "./__generated__/ComponentsListQuery.graphql";
import { ComponentsList$key } from "./__generated__/ComponentsList.graphql";

export const ComponentsList: React.FC<{
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect }) => {
  const query = useLazyLoadQuery<ComponentsListQuery>(
    graphql`
      query ComponentsListQuery($cursor: String, $count: Int, $search: String) {
        ...ComponentsList
      }
    `,
    {
      count: config.pagination.pageSize,
      search,
    }
  );

  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    ComponentsListQuery,
    ComponentsList$key
  >(
    graphql`
      fragment ComponentsList on Query
      @refetchable(queryName: "ComponentsListPaginationQuery") {
        components(after: $cursor, first: $count, search: $search)
          @connection(key: "Query_components") {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    query
  );

  const handleOnItemSelected = useCallback(
    (t: { id: string }) => onItemSelect(t.id),
    [onItemSelect]
  );

  return (
    <InfiniteScrollList
      items={data?.components?.edges?.map((x) => x.node) ?? []}
      label="name"
      id="id"
      isLoading={isLoadingNext || !data}
      hasNext={hasNext}
      loadMore={loadNext}
      onItemSelect={handleOnItemSelected}
    />
  );
};
