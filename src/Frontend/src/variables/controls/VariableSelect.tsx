import { Select, SelectProps, Spin } from "antd";
import { fetchQuery, useRelayEnvironment } from "react-relay";
import { useCallback, useEffect, useState } from "react";

import { VariableSelectQuery } from "@generated/VariableSelectQuery.graphql";
import { graphql } from "babel-plugin-relay/macro";
import { useDebounce } from "../../shared/debounce";

const searchVariables = graphql`
  query VariableSelectQuery($search: String) {
    searchVariables(search: $search) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export type VariableOption = { label: string; value: string };

export const VariablesSelect: React.FC<
  {
    onChange: (selected: VariableOption) => void;
  } & SelectProps<any>
> = ({ onChange, ...props }) => {
  const [value, setValue] = useState<VariableOption[]>([]);
  const [options, setOptions] = useState<VariableOption[]>([]);
  const [isLoading, setIsLoading] = useState(options.length === 0);
  const env = useRelayEnvironment();

  const fetchData = useCallback(
    async (search: string) => {
      setIsLoading(true);
      const data = await fetchQuery<VariableSelectQuery>(env, searchVariables, {
        search,
      }).toPromise();
      setOptions(
        data?.searchVariables?.edges?.map((x) => ({
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
    (ids: VariableOption[], t: any) => {
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
    <Select<VariableOption[]>
      allowClear
      style={{ width: "100%" }}
      value={value}
      placeholder="Please select"
      filterOption={false}
      onChange={handleChange}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      onSearch={debouncedSearch}
      showArrow
      labelInValue
      options={options}
      {...props}
    />
  );
};
