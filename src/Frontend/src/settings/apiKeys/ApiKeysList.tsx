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
import { ApiKeysListQuery } from "./__generated__/ApiKeysListQuery.graphql";
import { ApiKeysList_ApiKeys$key } from "./__generated__/ApiKeysList_ApiKeys.graphql";
import { ApiKeysList_ApiKeyEdge$key } from "./__generated__/ApiKeysList_ApiKeyEdge.graphql";
import { RemoveApiKeyDialog } from "./controls/dialogs/RemoveApiKeyDialog";

const groupsQuery = graphql`
  query ApiKeysListQuery($cursor: String, $count: Int) {
    ...ApiKeysList_ApiKeys
  }
`;
const groupsConnectionFragment = graphql`
  fragment ApiKeysList_ApiKeys on Query
  @refetchable(queryName: "ApiKeysListPaginationQuery") {
    apiKeys(after: $cursor, first: $count) @connection(key: "Query__apiKeys") {
      edges {
        node {
          id
          name
          ...ApiKeysList_ApiKeyEdge
        }
      }
    }
  }
`;

const groupFragment = graphql`
  fragment ApiKeysList_ApiKeyEdge on ApiKey {
    id
    name
  }
`;

export const ApiKeysList: React.FC<{
  selectedApiKeyId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedApiKeyId }) => {
  const queryData = useLazyLoadQuery<ApiKeysListQuery>(groupsQuery, {
    count: config.pagination.pageSize,
  });
  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<ApiKeysListQuery, ApiKeysList_ApiKeys$key>(
    groupsConnectionFragment,
    queryData
  );
  const data = connection?.apiKeys?.edges?.map((x) => x.node) ?? [];
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
        <ApiKeyListItem
          selected={item.id === selectedApiKeyId}
          onItemSelect={handleOnItemSelected}
          edge={item}
          key={item.id}
        />
      )}
    />
  );
};

const ApiKeyListItem: React.FC<{
  selected: boolean;
  onItemSelect: (envId: string) => void;
  edge: ApiKeysList_ApiKeyEdge$key;
}> = ({ onItemSelect, edge, selected }) => {
  const { id, name } = useFragment<ApiKeysList_ApiKeyEdge$key>(
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
      <RemoveApiKeyDialog
        open={isRemoveEnvVisible}
        keyId={id}
        onClose={handleOnClose}
        keyName={name}
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
