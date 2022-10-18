import { useCallback } from "react";
import {
  useLazyLoadQuery,
  usePaginationFragment,
  useFragment,
} from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { config } from "../config";
import { InfiniteScrollList } from "../shared/InfiniteScrollList";
import { VariablesListQuery } from "./__generated__/VariablesListQuery.graphql";
import { VariablesList_VariableEdge$key } from "./__generated__/VariablesList_VariableEdge.graphql";
import { VariablesList_Variables$key } from "./__generated__/VariablesList_Variables.graphql";
import styled from "@emotion/styled";
import { List } from "antd";
import { Colors } from "../shared/colors";

const VariablesQuery = graphql`
  query VariablesListQuery($cursor: String, $count: Int, $search: String) {
    ...VariablesList_Variables
  }
`;
const VariablesConnectionFragment = graphql`
  fragment VariablesList_Variables on Query
  @refetchable(queryName: "VariablesListPaginationQuery") {
    searchVariables(after: $cursor, first: $count, search: $search)
      @connection(key: "Query_searchVariables") {
      edges {
        node {
          id
          name
          ...VariablesList_VariableEdge
        }
      }
    }
  }
`;

const variableFragment = graphql`
  fragment VariablesList_VariableEdge on Variable {
    id
    name
  }
`;

export const VariablesList: React.FC<{
  selectedVariableId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedVariableId }) => {
  const queryData = useLazyLoadQuery<VariablesListQuery>(VariablesQuery, {
    count: config.pagination.pageSize,
    search,
  });
  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<VariablesListQuery, VariablesList_Variables$key>(
    VariablesConnectionFragment,
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
  edge: VariablesList_VariableEdge$key;
}> = ({ onItemSelect, edge, selected }) => {
  const { id, name } = useFragment<VariablesList_VariableEdge$key>(
    variableFragment,
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
