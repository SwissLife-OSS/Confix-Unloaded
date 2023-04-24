import { Button, List } from "antd";
import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from "react-relay";

import { Colors } from "../shared/colors";
import { DeleteIcon } from "../icons/icons";
import { EnvironmentsList$key } from "@generated/EnvironmentsList.graphql";
import { EnvironmentsListQuery } from "@generated/EnvironmentsListQuery.graphql";
import { EnvironmentsList_EnvironmentListItem$key } from "@generated/EnvironmentsList_EnvironmentListItem.graphql";
import { InfiniteScrollList } from "../shared/InfiniteScrollList";
import { RemoveEnvironmentDialog } from "./controls/dialogs/RemoveEnvironmentDialog";
import { config } from "../config";
import { graphql } from "babel-plugin-relay/macro";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { useGoTo } from "../shared/useGoTo";
import { useToggle } from "../shared/useToggle";

export const EnvironmentsList: React.FC<{
  selectedEnvironmentId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedEnvironmentId }) => {
  const queryData = useLazyLoadQuery<EnvironmentsListQuery>(
    graphql`
      query EnvironmentsListQuery(
        $cursor: String
        $count: Int
        $search: String
      ) {
        ...EnvironmentsList
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
  } = usePaginationFragment<EnvironmentsListQuery, EnvironmentsList$key>(
    graphql`
      fragment EnvironmentsList on Query
      @refetchable(queryName: "EnvironmentsListPaginationQuery") {
        searchEnvironments(after: $cursor, first: $count, search: $search)
          @connection(key: "Query_searchEnvironments") {
          edges {
            node {
              id
              name
              ...EnvironmentsList_EnvironmentListItem
            }
          }
        }
      }
    `,
    queryData
  );

  const handleOnItemSelected = useCallback(
    (id: string) => onItemSelect(id),
    [onItemSelect]
  );

  const data = connection?.searchEnvironments?.edges?.map((x) => x.node) ?? [];

  return (
    <InfiniteScrollList
      items={data}
      isLoading={isLoadingNext || !data}
      hasNext={hasNext}
      loadMore={loadNext}
      renderItem={(item) => (
        <EnvironmentListItem
          selected={item.id === selectedEnvironmentId}
          onItemSelect={handleOnItemSelected}
          edge={item}
          key={item.id}
        />
      )}
    />
  );
};

const EnvironmentListItem: React.FC<{
  selected: boolean;
  onItemSelect: (envId: string) => void;
  edge: EnvironmentsList_EnvironmentListItem$key;
}> = ({ onItemSelect, edge, selected }) => {
  const { id, name } = useFragment<EnvironmentsList_EnvironmentListItem$key>(
    graphql`
      fragment EnvironmentsList_EnvironmentListItem on Environment {
        id
        name
      }
    `,
    edge
  );

  const [isRemoveEnvVisible, , enableRemoveEnv, disableRemoveEnv] = useToggle();

  const goToOverview = useGoTo("/environments");
  const handleClick = useCallback(() => onItemSelect(id), [onItemSelect, id]);
  const handleOnClose = useCallback(
    (removed: boolean) => {
      disableRemoveEnv();
      if (removed) {
        goToOverview();
      }
    },
    [goToOverview, disableRemoveEnv]
  );

  return (
    <ListItem selected={selected} onClick={handleClick}>
      <List.Item.Meta title={name} />
      <ListButton type="text" icon={<DeleteIcon />} onClick={enableRemoveEnv} />
      <RemoveEnvironmentDialog
        open={isRemoveEnvVisible}
        environmentId={id}
        onClose={handleOnClose}
        environmentName={name}
      />
    </ListItem>
  );
};

const ListButton = styled(Button)`
  margin-left: 5px;
  flex: 0;
  opacity: 0;
  transition: opacity 100ms;
`;

const ListItem = styled(List.Item)<{ selected: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.selected ? Colors.gray[5] : "inherit")};
  :hover {
    background-color: ${Colors.gray[2]};
  }
  :hover ${ListButton} {
    opacity: 1;
  }
`;
