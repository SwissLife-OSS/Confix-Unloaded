import { ClockCircleOutlined, DownOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Menu,
  Table,
  Tag,
  Timeline,
} from "antd";
import { graphql } from "babel-plugin-relay/macro";
import React, { useCallback, useContext, useState } from "react";
import { useFragment } from "react-relay";
import { generatePath, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { generateComparePartComponentVersionPath } from "../applications/CompareApplicationPartComponentVersions";
import { formatDate } from "./formatDate";
import { ChangeLog_AddComponentToApplicationPartChange$key } from "./__generated__/ChangeLog_AddComponentToApplicationPartChange.graphql";
import { ChangeLog_AddPartToApplicationChange$key } from "./__generated__/ChangeLog_AddPartToApplicationChange.graphql";
import { ChangeLog_ApplicationPartComponentValuesChange$key } from "./__generated__/ChangeLog_ApplicationPartComponentValuesChange.graphql";
import {
  ChangeLog_fragment,
  ChangeLog_fragment$key,
} from "./__generated__/ChangeLog_fragment.graphql";
import { ChangeLog_RemoveComponentFromApplicationPartChange$key } from "./__generated__/ChangeLog_RemoveComponentFromApplicationPartChange.graphql";
import { ChangeLog_RemovePartFromApplicationChange$key } from "./__generated__/ChangeLog_RemovePartFromApplicationChange.graphql";
import { ChangeLog_RenameApplicationChange$key } from "./__generated__/ChangeLog_RenameApplicationChange.graphql";
import { ChangeLog_RenameApplicationPartChange$key } from "./__generated__/ChangeLog_RenameApplicationPartChange.graphql";

const changeLogFragment = graphql`
  fragment ChangeLog_fragment on ChangeLog @relay(plural: true) {
    id
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
    }
    modifiedAt
    modifiedBy {
      email
    }
  }
`;
const columns = [
  {
    title: "Modifed By",
    dataIndex: "modifiedBy",
    key: "name",
    render: (_: unknown, value: ChangeLog_fragment[0]) => (
      <>{value.modifiedBy.email}</>
    ),
  },
  {
    title: "Modified At",
    dataIndex: "modifiedAt",
    key: "modifiedAt",
    render: (_: unknown, value: ChangeLog_fragment[0]) => (
      <>{formatDate(value.modifiedAt)}</>
    ),
  },
  {
    title: "Kind",
    dataIndex: "kind",
    key: "kind",
    render: (_: unknown, value: ChangeLog_fragment[0]) => (
      <>{value.change.kind}</>
    ),
  },
  {
    title: "Value",
    key: "value",
    render: (_: unknown, value: ChangeLog_fragment[0]) => {
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

export const ChangeLog: React.FC<{ data: ChangeLog_fragment$key }> = ({
  data,
}) => {
  const [selectedForCompare, setSelectedForCompare] =
    useState<SelectedForCompare>();
  const changeLogs = useFragment<ChangeLog_fragment$key>(
    changeLogFragment,
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

const changeLogRenameApplicationChange = graphql`
  fragment ChangeLog_RenameApplicationChange on RenameApplicationChange {
    name
  }
`;

const ChangeLogRenameApplicationChange: React.FC<{
  data: ChangeLog_RenameApplicationChange$key;
}> = ({ data }) => {
  const changelog = useFragment<ChangeLog_RenameApplicationChange$key>(
    changeLogRenameApplicationChange,
    data
  );
  return <>Changed name to {changelog.name}</>;
};

const changeLogRenameApplicationPartChange = graphql`
  fragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {
    name
  }
`;

const ChangeLogRenameApplicationPartChange: React.FC<{
  data: ChangeLog_RenameApplicationPartChange$key;
}> = ({ data }) => {
  const changelog = useFragment<ChangeLog_RenameApplicationPartChange$key>(
    changeLogRenameApplicationPartChange,
    data
  );
  return <>Changed name to {changelog.name}</>;
};

const changeLogAddComponentToApplicationPartChange = graphql`
  fragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {
    addedComponent {
      definition {
        name
      }
    }
  }
`;

const ChangeLogAddComponentToApplicationPartChange: React.FC<{
  data: ChangeLog_AddComponentToApplicationPartChange$key;
}> = ({ data }) => {
  const changelog =
    useFragment<ChangeLog_AddComponentToApplicationPartChange$key>(
      changeLogAddComponentToApplicationPartChange,
      data
    );
  return (
    <>
      Added components{" "}
      {changelog.addedComponent.definition.name ?? "Definition Removed"}
    </>
  );
};

const changeLogAddPartToApplicationChange = graphql`
  fragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {
    addedPart {
      name
    }
  }
`;

const ChangeLogAddPartToApplicationChange: React.FC<{
  data: ChangeLog_AddPartToApplicationChange$key;
}> = ({ data }) => {
  const changelog = useFragment<ChangeLog_AddPartToApplicationChange$key>(
    changeLogAddPartToApplicationChange,
    data
  );
  return <>Added part {changelog.addedPart.name}</>;
};

const changeLogRemoveComponentFromApplicationPartChange = graphql`
  fragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {
    removedComponent {
      definition {
        name
      }
    }
  }
`;

const ChangeLogRemoveComponentFromApplicationPartChange: React.FC<{
  data: ChangeLog_RemoveComponentFromApplicationPartChange$key;
}> = ({ data }) => {
  const changelog =
    useFragment<ChangeLog_RemoveComponentFromApplicationPartChange$key>(
      changeLogRemoveComponentFromApplicationPartChange,
      data
    );
  return (
    <>
      Removed components{" "}
      {changelog.removedComponent?.definition?.name ?? "Definiton not found"}
    </>
  );
};

const changeLogRemovePartFromApplicationChange = graphql`
  fragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {
    removedPart {
      name
    }
  }
`;

const ChangeLogRemovePartFromApplicationChange: React.FC<{
  data: ChangeLog_RemovePartFromApplicationChange$key;
}> = ({ data }) => {
  const changelog = useFragment<ChangeLog_RemovePartFromApplicationChange$key>(
    changeLogRemovePartFromApplicationChange,
    data
  );
  return <>Removed part {changelog.removedPart.name}</>;
};

const changeLogApplicationPartComponentValuesChange = graphql`
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
`;

const ChangeLogApplicationPartComponentValuesChange: React.FC<{
  data: ChangeLog_ApplicationPartComponentValuesChange$key;
  changeId: string;
}> = ({ data, changeId }) => {
  const { part, application, partComponent, partComponentVersion } =
    useFragment<ChangeLog_ApplicationPartComponentValuesChange$key>(
      changeLogApplicationPartComponentValuesChange,
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
          overlay={
            <Menu>
              <Menu.Item key={"showDif"}>
                <Link to={compareToPrevious}>Show diff to previous</Link>
              </Menu.Item>
              <Menu.Item
                onClick={selectForCompare}
                disabled={isSelectionThisVersion}
                key={"selectForCompare"}
              >
                Select for compare
              </Menu.Item>
              {isComparable && (
                <Menu.Item
                  onClick={compareWithSelected}
                  key={"compareWithSelected"}
                >
                  Compare with selected
                </Menu.Item>
              )}
              {!isCurrent && (
                <Menu.Item key={"compareToCurrent"}>
                  <Link to={compareToCurrent}>Show diff to current</Link>
                </Menu.Item>
              )}
            </Menu>
          }
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
