import { useCallback } from "react";
import {
  useLazyLoadQuery,
  usePaginationFragment,
  useFragment,
} from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import styled from "@emotion/styled";
import { List, Button } from "antd";
import { config } from "../../config";
import { DeleteIcon } from "../../icons/icons";
import { Colors } from "../../shared/colors";
import { InfiniteScrollList } from "../../shared/InfiniteScrollList";
import { useGoTo } from "../../shared/useGoTo";
import { useToggle } from "../../shared/useToggle";
import { GroupsListQuery } from "./__generated__/GroupsListQuery.graphql";
import { GroupsList_Groups$key } from "./__generated__/GroupsList_Groups.graphql";
import { GroupsList_GroupEdge$key } from "./__generated__/GroupsList_GroupEdge.graphql";
import { RemoveGroupDialog } from "./controls/dialogs/RemoveGroupDialog";

const groupsQuery = graphql`
  query GroupsListQuery($cursor: String, $count: Int, $search: String) {
    ...GroupsList_Groups
  }
`;
const groupsConnectionFragment = graphql`
  fragment GroupsList_Groups on Query
  @refetchable(queryName: "GroupsListPaginationQuery") {
    searchGroups(after: $cursor, first: $count, search: $search)
      @connection(key: "Query_searchGroups") {
      edges {
        node {
          id
          name
          ...GroupsList_GroupEdge
        }
      }
    }
  }
`;

const groupFragment = graphql`
  fragment GroupsList_GroupEdge on Group {
    id
    name
  }
`;

export const GroupsList: React.FC<{
  selectedGroupId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedGroupId }) => {
  const queryData = useLazyLoadQuery<GroupsListQuery>(groupsQuery, {
    count: config.pagination.pageSize,
    search,
  });
  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<GroupsListQuery, GroupsList_Groups$key>(
    groupsConnectionFragment,
    queryData
  );
  const data = connection?.searchGroups?.edges?.map((x) => x.node) ?? [];
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
        <GroupListItem
          selected={item.id === selectedGroupId}
          onItemSelect={handleOnItemSelected}
          edge={item}
          key={item.id}
        />
      )}
    />
  );
};

const GroupListItem: React.FC<{
  selected: boolean;
  onItemSelect: (envId: string) => void;
  edge: GroupsList_GroupEdge$key;
}> = ({ onItemSelect, edge, selected }) => {
  const { id, name } = useFragment<GroupsList_GroupEdge$key>(
    groupFragment,
    edge
  );
  const handleClick = useCallback(() => onItemSelect(id), [onItemSelect, id]);
  const [isRemoveEnvVisible, , enableRemoveEnv, disableRemoveEnv] = useToggle();
  const goToOverview = useGoTo("/");
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
      <RemoveGroupDialog
        open={isRemoveEnvVisible}
        groupId={id}
        onClose={handleOnClose}
        groupName={name}
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
