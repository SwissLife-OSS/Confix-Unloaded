import { Select, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useRelayEnvironment, fetchQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { EnvironmentsSelectQuery } from "./__generated__/EnvironmentsSelectQuery.graphql";
import { useDebounce } from "../../shared/debounce";

const searchEnvironments = graphql`
  query EnvironmentsSelectQuery($search: String!) {
    searchEnvironments(search: $search) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export type EnvironmentOption = { label: string; value: string };

export const EnvironmentsSelect: React.FC<{
  onChange: (selected: EnvironmentOption) => void;
  value: string;
}> = ({ onChange, value: val }) => {
  const [value, setValue] = useState<EnvironmentOption[]>([]);
  const [options, setOptions] = useState<EnvironmentOption[]>([]);
  const [isLoading, setIsLoading] = useState(options.length === 0);
  const env = useRelayEnvironment();

  const fetchData = useCallback(
    async (search: string) => {
      setIsLoading(true);
      const data = await fetchQuery<EnvironmentsSelectQuery>(
        env,
        searchEnvironments,
        { search }
      ).toPromise();
      setOptions(
        data?.searchEnvironments?.edges?.map((x) => ({
          value: x.node.id,
          label: x.node.name,
        })) ?? []
      );
      setIsLoading(false);
    },
    [env]
  );

  const debouncedSearch = useDebounce((search: string) => {
    fetchData(search);
  }, 500);

  const handleChange = useCallback(
    (ids: EnvironmentOption[], t: any) => {
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
    <Select<EnvironmentOption[]>
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
