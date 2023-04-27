import {Select, Spin} from 'antd';
import {fetchQuery, useRelayEnvironment} from 'react-relay';
import {useCallback, useEffect, useState} from 'react';

import {RolesSelectQuery} from '@generated/RolesSelectQuery.graphql';
import {graphql} from 'babel-plugin-relay/macro';
import {useDebounce} from '../../../shared/debounce';

export type RoleOption = {label: string; value: string};

export const RolesSelect: React.FC<{
  value?: RoleOption[];
  onChange: (selected: RoleOption[]) => void;
}> = ({onChange, value}) => {
  const [stateValue, setValue] = useState<RoleOption[]>([]);
  const [options, setOptions] = useState<RoleOption[]>([]);
  const [isLoading, setIsLoading] = useState(options.length === 0);
  const env = useRelayEnvironment();

  const fetchData = useCallback(
    async (search: string) => {
      setIsLoading(true);
      const data = await fetchQuery<RolesSelectQuery>(
        env,
        graphql`
          query RolesSelectQuery($search: String!) {
            searchRoles(search: $search) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        `,
        {
          search,
        },
      ).toPromise();
      setOptions(
        data?.searchRoles?.edges?.map((x) => ({
          value: x.node.id,
          label: x.node.name,
        })) ?? [],
      );
      setIsLoading(false);
    },
    [env],
  );

  const debouncedSearch = useDebounce(
    (search: string) => fetchData(search),
    500,
  );

  const handleChange = useCallback(
    (ids: RoleOption[], t: any) => {
      onChange(t);
      setValue(ids);
      fetchData('');
    },
    [onChange, setValue, fetchData],
  );

  // initial data fetch
  useEffect(() => void fetchData(''), [fetchData]);

  return (
    <Select<RoleOption[]>
      mode="multiple"
      allowClear
      style={{width: '100%'}}
      value={value ?? stateValue}
      placeholder="Please select"
      filterOption={false}
      onChange={handleChange}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      onSearch={debouncedSearch}
      showArrow
      options={options}
    />
  );
};
