import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from "react-relay";

import { Colors } from "../shared/colors";
import { InfiniteScrollList } from "../shared/InfiniteScrollList";
import { List } from "antd";
import { VariablesList$key } from "@generated/VariablesList.graphql";
import { VariablesListQuery } from "@generated/VariablesListQuery.graphql";
import { VariablesList_ListItem$key } from "@generated/VariablesList_ListItem.graphql";
import { config } from "../config";
import { graphql } from "babel-plugin-relay/macro";
import styled from "@emotion/styled";
import { useCallback } from "react";

export const VariablesList: React.FC<{
  selectedVariableId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedVariableId }) => {
  const queryData = useLazyLoadQuery<VariablesListQuery>(
    graphql`
      query VariablesListQuery($cursor: String, $count: Int, $search: String) {
        ...VariablesList
      }
    `,
    {
      count: config.pagination.pageSize,
      search,
    }
  );
  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<VariablesListQuery, VariablesList$key>(
    graphql`
      fragment VariablesList on Query
      @refetchable(queryName: "VariablesListPaginationQuery") {
        searchVariables(after: $cursor, first: $count, search: $search)
          @connection(key: "Query_searchVariables") {
          edges {
            node {
              id
              name
              ...VariablesList_ListItem
            }
          }
        }
      }
    `,
    queryData
  );
  const data = connection?.searchVariables?.edges?.map((x) => x.node) ?? [];
  const handleOnItemSelected = useCallback(
    (id: string) => onItemSelect(id),
    [onItemSelect]
  );
  return (
    <InfiniteScrollList
      items={data}
      isLoading={isLoadingNext || !data}
      hasNext={hasNext}
      loadMore={loadNext}
      renderItem={(item) => (
        <VariableListItem
          selected={item.id === selectedVariableId}
          onItemSelect={handleOnItemSelected}
          edge={item}
          key={item.id}
        />
      )}
    />
  );
};

const VariableListItem: React.FC<{
  selected: boolean;
  onItemSelect: (envId: string) => void;
  edge: VariablesList_ListItem$key;
}> = ({ onItemSelect, edge, selected }) => {
  const { id, name } = useFragment<VariablesList_ListItem$key>(
    graphql`
      fragment VariablesList_ListItem on Variable {
        id
        name
      }
    `,

    edge
  );
  const handleClick = useCallback(() => onItemSelect(id), [onItemSelect, id]);

  return (
    <ListItem selected={selected} onClick={handleClick}>
      <List.Item.Meta title={name} />
    </ListItem>
  );
};

const ListItem = styled(List.Item)<{ selected: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.selected ? Colors.gray[5] : "inherit")};
  :hover {
    background-color: ${Colors.gray[2]};
  }
`;
