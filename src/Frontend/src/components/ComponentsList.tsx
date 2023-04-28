import {useLazyLoadQuery, usePaginationFragment} from 'react-relay';

import {ComponentsList$key} from '@generated/ComponentsList.graphql';
import {ComponentsListQuery} from '@generated/ComponentsListQuery.graphql';
import {InfiniteScrollList} from '../shared/InfiniteScrollList';
import {config} from '../config';
import {graphql} from 'babel-plugin-relay/macro';
import {useCallback} from 'react';

export const ComponentsList: React.FC<{
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({search, onItemSelect}) => {
  const query = useLazyLoadQuery<ComponentsListQuery>(
    graphql`
      query ComponentsListQuery($cursor: String, $count: Int, $search: String) {
        ...ComponentsList
      }
    `,
    {
      count: config.pagination.pageSize,
      search,
    },
  );

  const {data, hasNext, loadNext, isLoadingNext} = usePaginationFragment<
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
    query,
  );

  const handleOnItemSelected = useCallback(
    (t: {id: string}) => onItemSelect(t.id),
    [onItemSelect],
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
