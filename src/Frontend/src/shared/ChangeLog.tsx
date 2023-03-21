import { DownOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Dropdown, Menu, Table, Tag } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { graphql } from "babel-plugin-relay/macro";
import React, { useCallback, useContext, useState } from "react";
import { useFragment } from "react-relay";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { generateComparePartComponentVersionPath } from "../applications/CompareApplicationPartComponentVersions";
import { formatDate } from "./formatDate";
import { ChangeLog_AddComponentToApplicationPartChange$key } from "./__generated__/ChangeLog_AddComponentToApplicationPartChange.graphql";
import { ChangeLog_AddPartToApplicationChange$key } from "./__generated__/ChangeLog_AddPartToApplicationChange.graphql";
import { ChangeLog_ApplicationPartComponentValuesChange$key } from "./__generated__/ChangeLog_ApplicationPartComponentValuesChange.graphql";
import { ChangeLog_ComponentSchemaChange$key } from "./__generated__/ChangeLog_ComponentSchemaChange.graphql";
import { ChangeLog_ComponentValuesChange$key } from "./__generated__/ChangeLog_ComponentValuesChange.graphql";
import { ChangeLog_CreateComponentChange$key } from "./__generated__/ChangeLog_CreateComponentChange.graphql";
import { ChangeLog_CreateVariableChange$key } from "./__generated__/ChangeLog_CreateVariableChange.graphql";
import { ChangeLog_DeleteVariableValueChange$key } from "./__generated__/ChangeLog_DeleteVariableValueChange.graphql";
import {
  ChangeLog$data,
  ChangeLog$key,
} from "./__generated__/ChangeLog.graphql";
import { ChangeLog_PublishedApplicationPartChange$key } from "./__generated__/ChangeLog_PublishedApplicationPartChange.graphql";
import { ChangeLog_RemoveComponentChange$key } from "./__generated__/ChangeLog_RemoveComponentChange.graphql";
import { ChangeLog_RemoveComponentFromApplicationPartChange$key } from "./__generated__/ChangeLog_RemoveComponentFromApplicationPartChange.graphql";
import { ChangeLog_RemovePartFromApplicationChange$key } from "./__generated__/ChangeLog_RemovePartFromApplicationChange.graphql";
import { ChangeLog_RenameApplicationChange$key } from "./__generated__/ChangeLog_RenameApplicationChange.graphql";
import { ChangeLog_RenameApplicationPartChange$key } from "./__generated__/ChangeLog_RenameApplicationPartChange.graphql";
import { ChangeLog_RenameComponentChange$key } from "./__generated__/ChangeLog_RenameComponentChange.graphql";
import { ChangeLog_RenameVariableChange$key } from "./__generated__/ChangeLog_RenameVariableChange.graphql";
import { ChangeLog_VariableValueChange$key } from "./__generated__/ChangeLog_VariableValueChange.graphql";

const columns = [
  {
    title: "Version",
    dataIndex: "version",
    key: "version",
    render: (_: unknown, value: ChangeLog$data[0]) => (
      <>
        {value.change.versionOfApp ??
          value.change.versionOfComponent ??
          value.change.versionOfPart ??
          value.change.versionOfPartComponent ??
          value.change.versionOfVariable}
      </>
    ),
  },
  {
    title: "Modifed By",
    dataIndex: "modifiedBy",
    key: "name",
    render: (_: unknown, value: ChangeLog$data[0]) => (
      <>{value.modifiedBy.email}</>
    ),
  },
  {
    title: "Modified At",
    dataIndex: "modifiedAt",
    key: "modifiedAt",
    render: (_: unknown, value: ChangeLog$data[0]) => (
      <>{formatDate(value.modifiedAt)}</>
    ),
  },
  {
    title: "Kind",
    dataIndex: "kind",
    key: "kind",
    render: (_: unknown, value: ChangeLog$data[0]) => <>{value.change.kind}</>,
  },
  {
    title: "Value",
    key: "value",
    render: (_: unknown, value: ChangeLog$data[0]) => {
      switch (value.change.__typename) {
        case "RenameApplicationChange": {
          return <ChangeLogRenameApplicationChange data={value.change} />;
        }
        case "RenameApplicationPartChange": {
          return <ChangeLogRenameApplicationPartChange data={value.change} />;
        }
        case "AddComponentToApplicationPartChange": {
          return (
            <ChangeLogAddComponentToApplicationPartChange data={value.change} />
          );
        }
        case "AddPartToApplicationChange": {
          return <ChangeLogAddPartToApplicationChange data={value.change} />;
        }
        case "RemoveComponentFromApplicationPartChange ": {
          return (
            <ChangeLogRemoveComponentFromApplicationPartChange
              data={value.change}
            />
          );
        }
        case "RemovePartFromApplicationChange": {
          return <ChangeLogRenameApplicationPartChange data={value.change} />;
        }
        case "ChangeLogRemovePartFromApplicationChange": {
          return (
            <ChangeLogRemovePartFromApplicationChange data={value.change} />
          );
        }
        case "ApplicationPartComponentValuesChange": {
          return (
            <ChangeLogApplicationPartComponentValuesChange
              changeId={value.id}
              data={value.change}
            />
          );
        }
        case "ComponentSchemaChange": {
          return <ChangeLogComponentSchemaChange data={value.change} />;
        }
        case "ComponentValuesChange": {
          return <ChangeLogComponentValuesChange data={value.change} />;
        }
        case "CreateComponentChange": {
          return <ChangeLogCreateComponentChange data={value.change} />;
        }
        case "RemoveComponentChange": {
          return <ChangeLogRemoveComponentChange data={value.change} />;
        }
        case "RenameComponentChange": {
          return <ChangeLogRenameComponentChange data={value.change} />;
        }
        case "CreateVariableChange": {
          return <ChangeLogCreateVariableChange data={value.change} />;
        }
        case "DeleteVariableValueChange": {
          return <ChangeLogDeleteVariableValueChange data={value.change} />;
        }
        case "RenameVariableChange": {
          return <ChangeLogRenameVariableChange data={value.change} />;
        }
        case "VariableValueChange": {
          return <ChangeLogVariableValueChange data={value.change} />;
        }
        case "PublishedApplicationPartChange": {
          return (
            <ChangeLogPublishedApplicationPartChange data={value.change} />
          );
        }
      }
      return <>{value.change.__typename}</>;
    },
  },
];

type ComparableTypes = "application_part_component";
interface SelectedForCompare {
  id: string;
  version: number;
  type: ComparableTypes;
}

const ChangeLogContext = React.createContext<{
  selectedForCompare?: SelectedForCompare;
  setSelectedForCompare: (selectedForCompare?: SelectedForCompare) => void;
}>({
  setSelectedForCompare: () => {},
});

export const ChangeLog: React.FC<{ data: ChangeLog$key }> = ({ data }) => {
  const [selectedForCompare, setSelectedForCompare] =
    useState<SelectedForCompare>();
  const changeLogs = useFragment<ChangeLog$key>(
    graphql`
      fragment ChangeLog on ChangeLog @relay(plural: true) {
        id
        modifiedAt
        modifiedBy {
          email
        }
        change {
          kind
          __typename
          ...ChangeLog_RenameApplicationChange
          ...ChangeLog_RenameApplicationPartChange
          ...ChangeLog_AddComponentToApplicationPartChange
          ...ChangeLog_AddPartToApplicationChange
          ...ChangeLog_RemoveComponentFromApplicationPartChange
          ...ChangeLog_RemovePartFromApplicationChange
          ...ChangeLog_ApplicationPartComponentValuesChange

          ...ChangeLog_ComponentSchemaChange
          ...ChangeLog_ComponentValuesChange
          ...ChangeLog_CreateComponentChange
          ...ChangeLog_RemoveComponentChange
          ...ChangeLog_RenameComponentChange

          ...ChangeLog_CreateVariableChange
          ...ChangeLog_DeleteVariableValueChange
          ...ChangeLog_RenameVariableChange
          ...ChangeLog_VariableValueChange
          ...ChangeLog_PublishedApplicationPartChange
          ... on ApplicationChange {
            versionOfApp: applicationVersion
          }
          ... on ApplicationPartChange {
            versionOfPart: partVersion
          }
          ... on ApplicationPartComponentChange {
            versionOfPartComponent: partComponentVersion
          }
          ... on ComponentChange {
            versionOfComponent: componentVersion
          }
          ... on VariableChange {
            versionOfVariable: variableVersion
          }
        }
      }
    `,
    data
  );

  return (
    <ChangeLogContext.Provider
      value={{ selectedForCompare, setSelectedForCompare }}
    >
      <Table columns={columns} dataSource={changeLogs} />
    </ChangeLogContext.Provider>
  );
};

const ChangeLogRenameApplicationChange: React.FC<{
  data: ChangeLog_RenameApplicationChange$key;
}> = ({ data }) => {
  const changelog = useFragment<ChangeLog_RenameApplicationChange$key>(
    graphql`
      fragment ChangeLog_RenameApplicationChange on RenameApplicationChange {
        name
      }
    `,
    data
  );
  return <>Changed name to {changelog.name}</>;
};

const ChangeLogRenameApplicationPartChange: React.FC<{
  data: ChangeLog_RenameApplicationPartChange$key;
}> = ({ data }) => {
  const changelog = useFragment<ChangeLog_RenameApplicationPartChange$key>(
    graphql`
      fragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {
        name
      }
    `,
    data
  );
  return <>Changed name to {changelog.name}</>;
};

const ChangeLogAddComponentToApplicationPartChange: React.FC<{
  data: ChangeLog_AddComponentToApplicationPartChange$key;
}> = ({ data }) => {
  const changelog =
    useFragment<ChangeLog_AddComponentToApplicationPartChange$key>(
      graphql`
        fragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {
          addedComponent {
            definition {
              name
            }
          }
        }
      `,
      data
    );
  return (
    <>
      Added components{" "}
      {changelog.addedComponent?.definition?.name ?? "Definition Removed"}
    </>
  );
};

const ChangeLogAddPartToApplicationChange: React.FC<{
  data: ChangeLog_AddPartToApplicationChange$key;
}> = ({ data }) => {
  const changelog = useFragment<ChangeLog_AddPartToApplicationChange$key>(
    graphql`
      fragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {
        addedPart {
          name
        }
      }
    `,
    data
  );
  return <>Added part {changelog.addedPart.name}</>;
};

const ChangeLogRemoveComponentFromApplicationPartChange: React.FC<{
  data: ChangeLog_RemoveComponentFromApplicationPartChange$key;
}> = ({ data }) => {
  const changelog =
    useFragment<ChangeLog_RemoveComponentFromApplicationPartChange$key>(
      graphql`
        fragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {
          removedComponent {
            definition {
              name
            }
          }
        }
      `,
      data
    );
  return (
    <>
      Removed components{" "}
      {changelog.removedComponent?.definition?.name ?? "Definiton not found"}
    </>
  );
};

const ChangeLogRemovePartFromApplicationChange: React.FC<{
  data: ChangeLog_RemovePartFromApplicationChange$key;
}> = ({ data }) => {
  const changelog = useFragment<ChangeLog_RemovePartFromApplicationChange$key>(
    graphql`
      fragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {
        removedPart {
          name
        }
      }
    `,
    data
  );
  return <>Removed part {changelog.removedPart.name}</>;
};

const ChangeLogApplicationPartComponentValuesChange: React.FC<{
  data: ChangeLog_ApplicationPartComponentValuesChange$key;
  changeId: string;
}> = ({ data, changeId }) => {
  const { part, application, partComponent, partComponentVersion } =
    useFragment<ChangeLog_ApplicationPartComponentValuesChange$key>(
      graphql`
        fragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {
          part {
            id
          }
          application {
            id
          }
          partComponent {
            id
            version
          }
          partComponentVersion
        }
      `,
      data
    );
  const { setSelectedForCompare, selectedForCompare } =
    useContext(ChangeLogContext);
  const selectForCompare = useCallback(() => {
    setSelectedForCompare({
      type: "application_part_component",
      version: partComponentVersion,
      id: partComponent?.id ?? "",
    });
  }, [partComponent?.id, partComponentVersion, setSelectedForCompare]);
  const clearSelectForCompare = useCallback(() => {
    setSelectedForCompare(undefined);
  }, [setSelectedForCompare]);

  const navigate = useNavigate();
  const compareWithSelected = useCallback(() => {
    var path = generateComparePartComponentVersionPath(
      application?.id ?? "",
      partComponent?.id ?? "",
      partComponentVersion,
      selectedForCompare?.version ?? 0
    );
    navigate(path);
  }, [
    application?.id,
    navigate,
    partComponent?.id,
    partComponentVersion,
    selectedForCompare?.version,
  ]);

  // TODO in case of deleted part or component we could just display the values
  if (!part || !application || !partComponent || !partComponentVersion) {
    return <></>;
  }

  const compareToCurrent = generateComparePartComponentVersionPath(
    application.id,
    partComponent.id,
    String(partComponent.version),
    String(partComponentVersion)
  );

  const compareToPrevious = generateComparePartComponentVersionPath(
    application.id,
    partComponent.id,
    partComponentVersion,
    partComponentVersion - 1
  );

  const isCurrent = partComponentVersion === partComponent.version;
  const isSelectForCompareActive = !!selectedForCompare;
  const isSelectionOfThisPart =
    isSelectForCompareActive &&
    partComponent.id === selectedForCompare.id &&
    selectedForCompare.type === "application_part_component";
  const isSelectionThisVersion =
    isSelectionOfThisPart &&
    partComponentVersion === selectedForCompare.version;
  const isComparable = isSelectionOfThisPart && !isSelectionThisVersion;

  const menuItems: ItemType[] = [
    {
      key: "showDif",
      label: <Link to={compareToPrevious}>Show diff to previous</Link>,
    },
    {
      onClick: selectForCompare,
      disabled: isSelectionThisVersion,
      key: "selectForCompare",
      label: "Select for compare",
    },
  ];

  if (isComparable) {
    menuItems.push({
      key: "compareWithSelected",
      onClick: compareWithSelected,
      label: "Compare with selected",
    });
  }

  if (!isCurrent) {
    menuItems.push({
      key: "compareToCurrent",
      label: <Link to={compareToCurrent}>Show diff to current</Link>,
    });
  }

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div>
        <Dropdown
          disabled={isSelectForCompareActive && !isSelectionOfThisPart}
          overlay={<Menu items={menuItems}></Menu>}
        >
          <Button disabled={isSelectForCompareActive && !isSelectionOfThisPart}>
            Actions <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div>
        {isCurrent && <Tag color="green">Current</Tag>}
        {isSelectionThisVersion && (
          <Tag color="blue" closable onClose={clearSelectForCompare}>
            Selected
          </Tag>
        )}
      </div>
    </div>
  );
};

const ChangeLogComponentSchemaChange: React.FC<{
  data: ChangeLog_ComponentSchemaChange$key;
}> = ({ data }) => {
  useFragment(
    graphql`
      fragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {
        kind
      }
    `,
    data
  );
  return <>Changed schema</>;
};

const ChangeLogComponentValuesChange: React.FC<{
  data: ChangeLog_ComponentValuesChange$key;
}> = ({ data }) => {
  useFragment(
    graphql`
      fragment ChangeLog_ComponentValuesChange on ComponentValuesChange {
        kind
      }
    `,
    data
  );

  return <>Values changed</>;
};

const ChangeLogCreateComponentChange: React.FC<{
  data: ChangeLog_CreateComponentChange$key;
}> = ({ data }) => {
  const { component } = useFragment<ChangeLog_CreateComponentChange$key>(
    graphql`
      fragment ChangeLog_CreateComponentChange on CreateComponentChange {
        component {
          name
        }
      }
    `,
    data
  );
  return <>Created {component?.name}</>;
};

const ChangeLogRemoveComponentChange: React.FC<{
  data: ChangeLog_RemoveComponentChange$key;
}> = ({ data }) => {
  const { component } = useFragment<ChangeLog_RemoveComponentChange$key>(
    graphql`
      fragment ChangeLog_RemoveComponentChange on RemoveComponentChange {
        component {
          name
        }
      }
    `,

    data
  );
  return <>Removed {component?.name}</>;
};

const ChangeLogRenameComponentChange: React.FC<{
  data: ChangeLog_RenameComponentChange$key;
}> = ({ data }) => {
  const { component } = useFragment<ChangeLog_RenameComponentChange$key>(
    graphql`
      fragment ChangeLog_RenameComponentChange on RenameComponentChange {
        component {
          name
        }
      }
    `,
    data
  );
  return <>Renamed {component?.name}</>;
};

const ChangeLogCreateVariableChange: React.FC<{
  data: ChangeLog_CreateVariableChange$key;
}> = ({ data }) => {
  const { variable } = useFragment<ChangeLog_CreateVariableChange$key>(
    graphql`
      fragment ChangeLog_CreateVariableChange on CreateVariableChange {
        variable {
          name
        }
      }
    `,

    data
  );
  return <>Created value for {variable?.name}</>;
};

const ChangeLogDeleteVariableValueChange: React.FC<{
  data: ChangeLog_DeleteVariableValueChange$key;
}> = ({ data }) => {
  const { variable } = useFragment<ChangeLog_DeleteVariableValueChange$key>(
    graphql`
      fragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {
        variable {
          name
        }
      }
    `,

    data
  );
  return <>Deleted value {variable?.name}</>;
};

const ChangeLogVariableValueChange: React.FC<{
  data: ChangeLog_VariableValueChange$key;
}> = ({ data }) => {
  const { variable } = useFragment<ChangeLog_VariableValueChange$key>(
    graphql`
      fragment ChangeLog_VariableValueChange on VariableValueChange {
        variable {
          name
        }
      }
    `,

    data
  );
  return <>Variable value of {variable?.name ?? "removed"} changed</>;
};

const ChangeLogRenameVariableChange: React.FC<{
  data: ChangeLog_RenameVariableChange$key;
}> = ({ data }) => {
  const { variable } = useFragment<ChangeLog_RenameVariableChange$key>(
    graphql`
      fragment ChangeLog_RenameVariableChange on RenameVariableChange {
        variable {
          name
        }
      }
    `,
    data
  );
  return <>Variable renamed to {variable?.name}</>;
};

const ChangeLogPublishedApplicationPartChange: React.FC<{
  data: ChangeLog_PublishedApplicationPartChange$key;
}> = ({ data }) => {
  const { partVersion, part } =
    useFragment<ChangeLog_PublishedApplicationPartChange$key>(
      graphql`
        fragment ChangeLog_PublishedApplicationPartChange on PublishedApplicationPartChange {
          partVersion
          part {
            name
          }
        }
      `,
      data
    );
  return (
    <>
      Application part {part?.name ?? "DELETED"} published in Version{" "}
      {partVersion}
    </>
  );
};
