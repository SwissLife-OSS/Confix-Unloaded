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
import { RolesListQuery } from "./__generated__/RolesListQuery.graphql";
import { RolesList_Roles$key } from "./__generated__/RolesList_Roles.graphql";
import { RolesList_RoleEdge$key } from "./__generated__/RolesList_RoleEdge.graphql";
import { RemoveRoleDialog } from "./controls/dialogs/RemoveRoleDialog";

const rolesQuery = graphql`
  query RolesListQuery($cursor: String, $count: Int, $search: String) {
    ...RolesList_Roles
  }
`;
const rolesConnectionFragment = graphql`
  fragment RolesList_Roles on Query
  @refetchable(queryName: "RolesListPaginationQuery") {
    searchRoles(after: $cursor, first: $count, search: $search)
      @connection(key: "Query_searchRoles") {
      edges {
        node {
          id
          name
          ...RolesList_RoleEdge
        }
      }
    }
  }
`;

const roleFragment = graphql`
  fragment RolesList_RoleEdge on Role {
    id
    name
  }
`;

export const RolesList: React.FC<{
  selectedRoleId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedRoleId }) => {
  const queryData = useLazyLoadQuery<RolesListQuery>(rolesQuery, {
    count: config.pagination.pageSize,
    search,
  });
  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<RolesListQuery, RolesList_Roles$key>(
    rolesConnectionFragment,
    queryData
  );
  const data = connection?.searchRoles?.edges?.map((x) => x.node) ?? [];
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
        <RoleListItem
          selected={item.id === selectedRoleId}
          onItemSelect={handleOnItemSelected}
          edge={item}
          key={item.id}
        />
      )}
    />
  );
};

const RoleListItem: React.FC<{
  selected: boolean;
  onItemSelect: (envId: string) => void;
  edge: RolesList_RoleEdge$key;
}> = ({ onItemSelect, edge, selected }) => {
  const { id, name } = useFragment<RolesList_RoleEdge$key>(roleFragment, edge);
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
      <RemoveRoleDialog
        open={isRemoveEnvVisible}
        roleId={id}
        onClose={handleOnClose}
        roleName={name}
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
