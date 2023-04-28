import {FetchPolicy} from 'react-relay';
import {CacheConfig, RenderPolicy} from 'relay-runtime';

export type QueryOptions = {
  fetchKey?: string | number | undefined;
  fetchPolicy?: FetchPolicy | undefined;
  networkCacheConfig?: CacheConfig | undefined;
  UNSTABLE_renderPolicy?: RenderPolicy | undefined;
};
