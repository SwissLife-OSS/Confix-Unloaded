import { Select, Spin } from "antd";
import { fetchQuery, useRelayEnvironment } from "react-relay";
import { useCallback, useEffect, useState } from "react";

import { ComponentsSelectQuery } from "@generated/ComponentsSelectQuery.graphql";
import { graphql } from "babel-plugin-relay/macro";
import { useDebounce } from "../../shared/debounce";

export type ComponentOption = { label: string; value: string };

export const ComponentsSelect: React.FC<{
  filter?: {
    applicationId?: string;
    applicationPartId?: string;
    namespace?: string;
  };
  onChange: (selected: ComponentOption[]) => void;
}> = ({ onChange, filter }) => {
  const [value, setValue] = useState<ComponentOption[]>([]);
  const [options, setOptions] = useState<ComponentOption[]>([]);
  const [isLoading, setIsLoading] = useState(options.length === 0);
  const env = useRelayEnvironment();

  const fetchData = useCallback(
    async (search: string) => {
      setIsLoading(true);
      const data = await fetchQuery<ComponentsSelectQuery>(
        env,
        graphql`
          query ComponentsSelectQuery(
            $search: String
            $applicationId: ID
            $applicationPartId: ID
            $namespace: String
          ) {
            components(
              search: $search
              applicationId: $applicationId
              applicationPartId: $applicationPartId
              namespace: $namespace
            ) {
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
          applicationId: filter?.applicationId,
          applicationPartId: filter?.applicationPartId,
          namespace: filter?.namespace,
        }
      ).toPromise();
      setOptions(
        data?.components?.edges?.map((x) => ({
          value: x.node.id,
          label: x.node.name,
        })) ?? []
      );
      setIsLoading(false);
    },
    [env, filter?.applicationId, filter?.applicationPartId, filter?.namespace]
  );

  const debouncedSearch = useDebounce((search: string) => {
    fetchData(search);
  }, 500);

  const handleChange = useCallback(
    (ids: ComponentOption[], t: any) => {
      onChange(t);
      setValue(ids);
      fetchData("");
    },
    [onChange, setValue, fetchData]
  );

  // initial data fetch
  useEffect(() => {
    fetchData("");
  }, [fetchData]);

  return (
    <Select<ComponentOption[]>
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      value={value}
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
