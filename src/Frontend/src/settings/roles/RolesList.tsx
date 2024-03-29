import {Button, List} from 'antd';
import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';

import {Colors} from '../../shared/colors';
import {DeleteIcon} from '../../icons/icons';
import {InfiniteScrollList} from '../../shared/InfiniteScrollList';
import {RemoveRoleDialog} from './controls/dialogs/RemoveRoleDialog';
import {RolesList$key} from '@generated/RolesList.graphql';
import {RolesListPaginationQuery} from '@generated/RolesListPaginationQuery.graphql';
import {RolesListQuery} from '@generated/RolesListQuery.graphql';
import {RolesList_RoleListItem$key} from '@generated/RolesList_RoleListItem.graphql';
import {config} from '../../config';
import {graphql} from 'babel-plugin-relay/macro';
import styled from '@emotion/styled';
import {useCallback} from 'react';
import {useGoTo} from '../../shared/useGoTo';
import {useToggle} from '../../shared/useToggle';

export const RolesList: React.FC<{
  selectedRoleId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({search, onItemSelect, selectedRoleId}) => {
  const queryData = useLazyLoadQuery<RolesListQuery>(
    graphql`
      query RolesListQuery($cursor: String, $count: Int, $search: String) {
        ...RolesList
      }
    `,
    {
      count: config.pagination.pageSize,
      search,
    },
  );

  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<RolesListPaginationQuery, RolesList$key>(
    graphql`
      fragment RolesList on Query
      @refetchable(queryName: "RolesListPaginationQuery") {
        searchRoles(after: $cursor, first: $count, search: $search)
          @connection(key: "Query_searchRoles") {
          edges {
            node {
              id
              name
              ...RolesList_RoleListItem
            }
          }
        }
      }
    `,
    queryData,
  );

  const data = connection?.searchRoles?.edges?.map((x) => x.node) ?? [];
  const handleOnItemSelected = useCallback(
    (id: string) => onItemSelect(id),
    [onItemSelect],
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
  edge: RolesList_RoleListItem$key;
}> = ({onItemSelect, edge, selected}) => {
  const {id, name} = useFragment(
    graphql`
      fragment RolesList_RoleListItem on Role {
        id
        name
      }
    `,
    edge,
  );

  const [isRemoveEnvVisible, , enableRemoveEnv, disableRemoveEnv] = useToggle();

  const goToOverview = useGoTo('settings/roles');

  const handleClick = useCallback(() => onItemSelect(id), [onItemSelect, id]);
  const handleOnClose = useCallback(
    (removed: boolean) => {
      disableRemoveEnv();
      if (removed) {
        goToOverview();
      }
    },
    [goToOverview, disableRemoveEnv],
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

const ListItem = styled(List.Item)<{selected: boolean}>`
  cursor: pointer;
  background-color: ${(props) => (props.selected ? Colors.gray[5] : 'inherit')};
  :hover {
    background-color: ${Colors.gray[2]};
  }
`;

const ListButton = styled(Button)`
  margin-left: 5px;
  flex: 0;
`;
