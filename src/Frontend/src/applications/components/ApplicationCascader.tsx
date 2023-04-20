import * as React from "react";

import { useCallback, useMemo } from "react";
import { useFragment, useRefetchableFragment } from "react-relay";

import { ApplicationCascader$key } from "@generated/ApplicationCascader.graphql";
import { ApplicationCascader_ApplicationPagination_Query } from "@generated/ApplicationCascader_ApplicationPagination_Query.graphql";
import { ApplicationCascader_Applications$key } from "@generated/ApplicationCascader_Applications.graphql";
import { ApplicationCascader_Namespaces$key } from "@generated/ApplicationCascader_Namespaces.graphql";
import { Cascader } from "antd";
import { DefaultOptionType } from "antd/lib/cascader";
import { MultipleCascaderProps } from "rc-cascader/lib/Cascader";
import { graphql } from "babel-plugin-relay/macro";

type Result = [string] | [string, string] | [string, string, string];

export const ApplicationCascader: React.FC<{
  onChange: (option: Result[]) => void;
  value: Result[];
  fragmentRef: ApplicationCascader$key;
}> = ({ onChange, value, fragmentRef }) => {
  const data = useFragment(
    graphql`
      fragment ApplicationCascader on Query
      @argumentDefinitions(search: { type: "String" }) {
        ...ApplicationCascader_Namespaces
        ...ApplicationCascader_Applications @arguments(search: $search)
      }
    `,
    fragmentRef
  );
  const [{ applications }] = useRefetchableFragment<
    ApplicationCascader_ApplicationPagination_Query,
    ApplicationCascader_Applications$key
  >(
    graphql`
      fragment ApplicationCascader_Applications on Query
      @refetchable(queryName: "ApplicationCascader_ApplicationPagination_Query")
      @argumentDefinitions(search: { type: "String" }) {
        applications(first: 50, search: $search) {
          edges {
            node {
              namespace
              id
              name
              parts {
                id
                name
              }
            }
          }
        }
      }
    `,
    data
  );

  const { me } = useFragment<ApplicationCascader_Namespaces$key>(
    graphql`
      fragment ApplicationCascader_Namespaces on Query {
        me {
          namespaces
        }
      }
    `,
    data
  );

  const options = useMemo<DefaultOptionType[]>(() => {
    const applicationsByNamespace = applications?.edges?.reduce<
      Record<string, DefaultOptionType[]>
    >((acc, edge) => {
      const app = edge.node;
      const namespace = app.namespace;
      const namespaceApps = acc[namespace] ?? [];
      namespaceApps.push({
        value: app.id,
        label: "App: " + app.name,
        children: app.parts.map((part) => ({
          value: part.id,
          label: "Part: " + part.name,
        })),
      });
      acc[namespace] = namespaceApps;
      return acc;
    }, {});

    const namespaces = new Set<string>([
      ...Object.keys(applicationsByNamespace ?? {}),
      ...(me?.namespaces ?? []),
    ]);

    return Array.from(namespaces).map((namespace) => ({
      value: namespace,
      label: "Namespace: " + namespace,
      children: applicationsByNamespace?.[namespace],
    }));
  }, [applications, me]);

  const handleCascaderChange = useCallback<
    NonNullable<MultipleCascaderProps<typeof options[0]>["onChange"]>
  >(
    (value, selectedOptions) => {
      onChange(
        selectedOptions
          .map((option) => {
            return option.map((option) => option.value?.toString() ?? "");
          })
          .filter((option) => !!option) as Result[]
      );
    },
    [onChange]
  );

  return (
    <Cascader
      style={{ width: "100%" }}
      options={options}
      multiple
      onChange={handleCascaderChange}
      maxTagCount="responsive"
      defaultValue={value}
    />
  );
};
