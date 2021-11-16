import { Select, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useRelayEnvironment, fetchQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { ComponentsSelectQuery } from "./__generated__/ComponentsSelectQuery.graphql";
import { useDebounce } from "../../shared/debounce";

const searchComponents = graphql`
  query ComponentsSelectQuery($where: ComponentFilterInput) {
    components(where: $where) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export type ComponentOption = { label: string; value: string };

export const ComponentsSelect: React.FC<{
  onChange: (selected: ComponentOption[]) => void;
}> = ({ onChange }) => {
  const [value, setValue] = useState<ComponentOption[]>([]);
  const [options, setOptions] = useState<ComponentOption[]>([]);
  const [isLoading, setIsLoading] = useState(options.length === 0);
  const env = useRelayEnvironment();

  const fetchData = useCallback(
    async (search: string) => {
      setIsLoading(true);
      const data = await fetchQuery<ComponentsSelectQuery>(
        env,
        searchComponents,
        {
          where: !search
            ? null
            : {
                name: {
                  contains: search,
                },
              },
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
    [env]
  );

  const debouncedSearch = useDebounce(
    (search: string) => fetchData(search),
    300
  );
  const handleChange = useCallback(
    (values: ComponentOption[]) => {
      onChange(values);
      setValue(values);
    },
    [onChange, setValue]
  );
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
      onChange={handleChange}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      onSearch={debouncedSearch}
      options={options}
    />
  );
};
