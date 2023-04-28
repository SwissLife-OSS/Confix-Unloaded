import {useCallback, useRef, useState} from 'react';
import {
  RefetchFnDynamic,
  useLazyLoadQuery,
  useRelayEnvironment,
} from 'react-relay';
import {fetchQuery, GraphQLTaggedNode, OperationType} from 'relay-runtime';

export type KeyType<TData = unknown> = Readonly<{
  ' $data'?: TData | undefined;
  ' $fragmentSpreads': any;
}>;

// from https://relay.dev/docs/guided-tour/refetching/refreshing-fragments/
export const useSilentRefreshQuery = <TQuery extends OperationType>(
  ...args: Parameters<typeof useLazyLoadQuery<TQuery>>
) => {
  const [query, variables] = args;

  const data = useLazyLoadQuery<TQuery>(...args);
  const env = useRelayEnvironment();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshingRef = useRef(isRefreshing);
  refreshingRef.current = isRefreshing;

  const refresh = useCallback(() => {
    if (refreshingRef.current) {
      return;
    }

    setIsRefreshing(true);

    // fetchQuery will fetch the query and write
    // the data to the Relay store. This will ensure
    // that when we re-render, the data is already
    // cached and we don't suspend
    fetchQuery(env, query, variables).subscribe({
      complete: () => {
        setIsRefreshing(false);
      },
      error: () => {
        setIsRefreshing(false);
      },
    });
  }, [env, query, variables]);

  return {data, refresh, isRefreshing};
};
