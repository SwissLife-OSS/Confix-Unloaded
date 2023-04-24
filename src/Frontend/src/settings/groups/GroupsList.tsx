import { Button, List } from "antd";
import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from "react-relay";

import { Colors } from "../../shared/colors";
import { DeleteIcon } from "../../icons/icons";
import { GroupsList$key } from "@generated/GroupsList.graphql";
import { GroupsListQuery } from "@generated/GroupsListQuery.graphql";
import { GroupsList_ListItem$key } from "@generated/GroupsList_ListItem.graphql";
import { InfiniteScrollList } from "../../shared/InfiniteScrollList";
import { RemoveGroupDialog } from "./controls/dialogs/RemoveGroupDialog";
import { config } from "../../config";
import { graphql } from "babel-plugin-relay/macro";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { useGoTo } from "../../shared/useGoTo";
import { useToggle } from "../../shared/useToggle";

export const GroupsList: React.FC<{
  selectedGroupId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedGroupId }) => {
  const queryData = useLazyLoadQuery<GroupsListQuery>(
    graphql`
      query GroupsListQuery($cursor: String, $count: Int, $search: String) {
        ...GroupsList
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
  } = usePaginationFragment<GroupsListQuery, GroupsList$key>(
    graphql`
      fragment GroupsList on Query
      @refetchable(queryName: "GroupsListPaginationQuery") {
        searchGroups(after: $cursor, first: $count, search: $search)
          @connection(key: "Query_searchGroups") {
          edges {
            node {
              id
              name
              ...GroupsList_ListItem
            }
          }
        }
      }
    `,

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
  edge: GroupsList_ListItem$key;
}> = ({ onItemSelect, edge, selected }) => {
  const { id, name } = useFragment<GroupsList_ListItem$key>(
    graphql`
      fragment GroupsList_ListItem on Group {
        id
        name
      }
    `,

    edge
  );

  const [isRemoveEnvVisible, , enableRemoveEnv, disableRemoveEnv] = useToggle();

  const goToOverview = useGoTo("settings/groups");

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
