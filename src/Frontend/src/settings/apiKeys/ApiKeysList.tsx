import {Button, List} from 'antd';
import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';

import {ApiKeysList$key} from '@generated/ApiKeysList.graphql';
import {ApiKeysListQuery} from '@generated/ApiKeysListQuery.graphql';
import {ApiKeysList_ApiKeyListItem$key} from '@generated/ApiKeysList_ApiKeyListItem.graphql';
import {Colors} from '../../shared/colors';
import {DeleteIcon} from '../../icons/icons';
import {InfiniteScrollList} from '../../shared/InfiniteScrollList';
import {RemoveApiKeyDialog} from './controls/dialogs/RemoveApiKeyDialog';
import {config} from '../../config';
import {graphql} from 'babel-plugin-relay/macro';
import styled from '@emotion/styled';
import {useCallback} from 'react';
import {useGoTo} from '../../shared/useGoTo';
import {useToggle} from '../../shared/useToggle';

export const ApiKeysList: React.FC<{
  selectedApiKeyId?: string;
  onItemSelect: (item: string) => void;
}> = ({onItemSelect, selectedApiKeyId}) => {
  const query = useLazyLoadQuery<ApiKeysListQuery>(
    graphql`
      query ApiKeysListQuery($cursor: String, $count: Int) {
        ...ApiKeysList
      }
    `,
    {
      count: config.pagination.pageSize,
    },
  );

  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<ApiKeysListQuery, ApiKeysList$key>(
    graphql`
      fragment ApiKeysList on Query
      @refetchable(queryName: "ApiKeysListPaginationQuery") {
        apiKeys(after: $cursor, first: $count)
          @connection(key: "Query__apiKeys") {
          edges {
            node {
              id
              name
              ...ApiKeysList_ApiKeyListItem
            }
          }
        }
      }
    `,
    query,
  );

  const data = connection?.apiKeys?.edges?.map((x) => x.node) ?? [];

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
        <ApiKeyListItem
          selected={item.id === selectedApiKeyId}
          onItemSelect={handleOnItemSelected}
          fragmentRef={item}
          key={item.id}
        />
      )}
    />
  );
};

const ApiKeyListItem: React.FC<{
  selected: boolean;
  onItemSelect: (envId: string) => void;
  fragmentRef: ApiKeysList_ApiKeyListItem$key;
}> = ({onItemSelect, fragmentRef, selected}) => {
  const {id, name} = useFragment<ApiKeysList_ApiKeyListItem$key>(
    graphql`
      fragment ApiKeysList_ApiKeyListItem on ApiKey {
        id
        name
      }
    `,
    fragmentRef,
  );

  const [isRemoveEnvVisible, , enableRemoveEnv, disableRemoveEnv] = useToggle();

  const goToOverview = useGoTo('settings/apikeys');

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
      <RemoveApiKeyDialog
        open={isRemoveEnvVisible}
        keyId={id}
        onClose={handleOnClose}
        keyName={name}
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
