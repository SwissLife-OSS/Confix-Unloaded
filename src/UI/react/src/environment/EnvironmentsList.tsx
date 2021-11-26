import { useCallback } from "react";
import {
  useLazyLoadQuery,
  usePaginationFragment,
  useFragment,
} from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Settings } from "../settings";
import { InfiniteScrollList } from "../shared/InfiniteScrollList";
import { EnvironmentsListQuery } from "./__generated__/EnvironmentsListQuery.graphql";
import { EnvironmentsList_EnvironmentEdge$key } from "./__generated__/EnvironmentsList_EnvironmentEdge.graphql";
import { EnvironmentsList_Environments$key } from "./__generated__/EnvironmentsList_Environments.graphql";
import styled from "@emotion/styled";
import { Button, List } from "antd";
import { DeleteIcon } from "../icons/icons";
import { Colors } from "../shared/colors";
import { useToggle } from "../shared/useToggle";
import { RemoveEnvironmentDialog } from "./controls/dialogs/RemoveEnvironmentDialog";
import { useGoTo } from "../shared/useGoTo";
import { Routes } from "../routes";

const EnvironmentsQuery = graphql`
  query EnvironmentsListQuery($cursor: String, $count: Int, $search: String) {
    ...EnvironmentsList_Environments
  }
`;
const EnvironmentsConnectionFragment = graphql`
  fragment EnvironmentsList_Environments on Query
  @refetchable(queryName: "EnvironmentsListPaginationQuery") {
    searchEnvironments(after: $cursor, first: $count, search: $search)
      @connection(key: "Query_searchEnvironments") {
      edges {
        node {
          id
          name
          ...EnvironmentsList_EnvironmentEdge
        }
      }
    }
  }
`;

const environmentFragment = graphql`
  fragment EnvironmentsList_EnvironmentEdge on Environment {
    id
    name
  }
`;

export const EnvironmentsList: React.FC<{
  selectedEnvironmentId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedEnvironmentId }) => {
  const queryData = useLazyLoadQuery<EnvironmentsListQuery>(EnvironmentsQuery, {
    count: Settings.pagination.pageSize,
    search,
  });
  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<
    EnvironmentsListQuery,
    EnvironmentsList_Environments$key
  >(EnvironmentsConnectionFragment, queryData);
  const data = connection?.searchEnvironments?.edges?.map((x) => x.node) ?? [];
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
  edge: EnvironmentsList_EnvironmentEdge$key;
}> = ({ onItemSelect, edge, selected }) => {
  const { id, name } = useFragment<EnvironmentsList_EnvironmentEdge$key>(
    environmentFragment,
    edge
  );
  const handleClick = useCallback(() => onItemSelect(id), [onItemSelect, id]);
  const [isRemoveEnvVisible, , enableRemoveEnv, disableRemoveEnv] = useToggle();
  const goToOverview = useGoTo(Routes.environments.overview);
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
        visible={isRemoveEnvVisible}
        environmentId={id}
        onClose={handleOnClose}
        environmentName={name}
      />
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

const ListButton = styled(Button)`
  margin-left: 5px;
  flex: 0;
`;
