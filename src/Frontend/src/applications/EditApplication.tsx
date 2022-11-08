import * as React from "react";
import {
  useFragment,
  useLazyLoadQuery,
  useRefetchableFragment,
} from "react-relay";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { EditApplication_GetById_Query } from "./__generated__/EditApplication_GetById_Query.graphql";
import { Button, Card, Col, Empty, List, Row, Tabs, Typography } from "antd";
import styled from "@emotion/styled";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { AddIcon, DeleteIcon, EditIcon } from "../icons/icons";
import { EditApplication_part$key } from "./__generated__/EditApplication_part.graphql";
import { ApplicationPartSectionHeader } from "./components/ApplicationPartSectionHeader";
import {
  EditApplication_Application_Fragment$data,
  EditApplication_Application_Fragment$key,
} from "./__generated__/EditApplication_Application_Fragment.graphql";
import { useToggle } from "../shared/useToggle";
import { RemovePartFromApplicationDialog } from "./dialogs/RemovePartFromApplicationDialog";
import { AddComponentsToApplicationPartDialog } from "./dialogs/AddComponentsToApplicationPartDialog";
import { RenameApplicationDialog } from "./dialogs/RenameApplicationDialog";
import { useCallback, useEffect, useState } from "react";
import { VariablesSelect } from "../variables/controls/VariableSelect";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { VariableEditor } from "../variables/controls/VariableEditor";
import { EditApplicationRefetchApplicationQuery } from "./__generated__/EditApplicationRefetchApplicationQuery.graphql";
import { VariableValueList } from "../variables/controls/VariableValueList";
import { useSilentRefresh } from "../shared/useDefaultRefetch";
import { generatePath, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { EditApplication_VariableValues_Fragment$key } from "./__generated__/EditApplication_VariableValues_Fragment.graphql";
import { EditApplication_ChangeLog_Fragment$key } from "./__generated__/EditApplication_ChangeLog_Fragment.graphql";
import { ChangeLog } from "../shared/ChangeLog";
import { useTabSwitcher } from "../shared/useTabSwitcher";

const applicationByIdQuery = graphql`
  query EditApplication_GetById_Query($id: ID!) {
    applicationById(id: $id) {
      ...EditApplication_Application_Fragment
    }
  }
`;

const applicationByIdFragment = graphql`
  fragment EditApplication_Application_Fragment on Application
  @refetchable(queryName: "EditApplicationRefetchApplicationQuery") {
    id
    name
    namespace
    parts {
      ...EditApplication_part
    }
    ...EditApplication_VariableValues_Fragment @defer
    ...EditApplication_ChangeLog_Fragment @defer
    ...ApplicationPartSectionHeaderFragment
  }
`;

const applicationVariableValuesFragment = graphql`
  fragment EditApplication_VariableValues_Fragment on Application {
    variableValues {
      ...VariableValueList_values
    }
  }
`;

const applicationChangeLogFragment = graphql`
  fragment EditApplication_ChangeLog_Fragment on Application {
    changeLog {
      ...ChangeLog_fragment
    }
  }
`;

export const EditApplication = () => {
  const route = useParams();
  const variables = { id: route.applicationId ?? "" };
  const { tab, navigateToTab } = useTabSwitcher();
  const data = useLazyLoadQuery<EditApplication_GetById_Query>(
    applicationByIdQuery,
    variables
  );
  const [application, refetch] = useRefetchableFragment<
    EditApplicationRefetchApplicationQuery,
    EditApplication_Application_Fragment$key
  >(applicationByIdFragment, data.applicationById);

  const { refresh } = useSilentRefresh(
    applicationByIdQuery,
    refetch,
    variables
  );

  if (!application?.id) {
    return (
      <DetailView style={{ padding: 1 }}>Could not find application</DetailView>
    );
  }

  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <Header
            name={application.name}
            namespace={application.namespace ?? ""}
            id={application.id}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <ApplicationPartSectionHeader applicationKey={application} />
        </Col>
        <Col xs={24}>
          <Tabs
            defaultActiveKey={tab}
            key={tab}
            onChange={navigateToTab}
            items={[
              {
                key: "edit",
                label: "Parts",
                children: <ApplicationParts application={application} />,
              },
              {
                key: "variables",
                label: "Variables",
                children: (
                  <DefaultSuspense>
                    <Variables data={application} refetch={refresh} />
                  </DefaultSuspense>
                ),
              },
              {
                key: "changelog",
                label: "Change Log",
                children: (
                  <DefaultSuspense>
                    <ApplicationChangeLog data={application} />
                  </DefaultSuspense>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </DetailView>
  );
};

export type VariableOption = { label: string; value: string };

const Variables: React.FC<{
  data: EditApplication_Application_Fragment$data;
  refetch: () => void;
}> = ({ data, refetch }) => {
  const { variableValues } =
    useFragment<EditApplication_VariableValues_Fragment$key>(
      applicationVariableValuesFragment,
      data
    );
  const { state } = useLocation();
  const [selected, setSelected] = useState<VariableOption>(
    state?.variableOption
  );
  useEffect(
    () => state?.variableOption && setSelected(state?.variableOption),
    [state?.variableOption]
  );
  const handleVariableValueEditClick = useCallback(
    (id: string, name: string) => {
      setSelected({ label: name, value: id });
    },
    []
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Typography.Title level={4}>Configure Variables</Typography.Title>
        </Col>
        <Col xs={24}>
          <VariablesSelect onChange={setSelected} value={selected} />
        </Col>
        {!!selected && (
          <Col xs={24}>
            <DefaultSuspense>
              <VariableEditor
                applicationId={data.id}
                variableId={selected.value}
                refresh={refetch}
              />
            </DefaultSuspense>
          </Col>
        )}
        <Col xs={24}>
          <Typography.Title level={4}>Variable Overview</Typography.Title>
        </Col>
        <Col xs={24}>
          <DefaultSuspense>
            <VariableValueList
              onEdit={handleVariableValueEditClick}
              data={variableValues}
            />
          </DefaultSuspense>
        </Col>
      </Row>
    </>
  );
};

const ApplicationParts: React.FC<{
  application: EditApplication_Application_Fragment$data;
}> = ({ application }) => {
  if (application.parts.length === 0) {
    return <Empty description="No Application Parts"></Empty>;
  } else {
    return (
      <Row gutter={[16, 16]}>
        {(application.parts.map((x) => ({ ...x })) ?? []).map((item) => (
          <Col span={8}>
            <ApplicationPartsDisplay
              part={item}
              applicationId={application.id}
            />
          </Col>
        ))}
      </Row>
    );
  }
};

const applicationPartFragment = graphql`
  fragment EditApplication_part on ApplicationPart {
    id
    name
    components {
      definition {
        id
        name
        state
      }
    }
  }
`;

const ApplicationPartsDisplay: React.FC<{
  applicationId: string;
  part: EditApplication_part$key;
}> = ({ applicationId, part }) => {
  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const [isAddComponentVisible, , enableAddComponent, disableAddComponent] =
    useToggle();
  const { components, name, id } = useFragment(applicationPartFragment, part);
  const linkToPart = generatePath(`../:applicationId/parts/:partId/edit`, {
    applicationId,
    partId: id,
  });
  return (
    <>
      <Card
        title={name}
        actions={[
          <Link to={linkToPart}>
            <EditIcon />
          </Link>,
          <AddIcon onClick={enableAddComponent} />,
        ]}
        extra={
          <Button icon={<DeleteIcon />} danger onClick={enableRemoveDialog} />
        }
      >
        <CardBody>
          <List
            dataSource={components.map((x) => ({ ...x }))}
            renderItem={(item) => (
              <ComponentListItem
                name={item.definition?.name ?? ""}
                id={item.definition?.id ?? ""}
              />
            )}
          />
        </CardBody>
      </Card>
      <RemovePartFromApplicationDialog
        applicationPartName={name}
        applicationPartId={id}
        open={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
      <AddComponentsToApplicationPartDialog
        applicationPartName={name}
        applicationPartId={id}
        open={isAddComponentVisible}
        onClose={disableAddComponent}
      />
    </>
  );
};

const ComponentListItem: React.FC<{ id: string; name: string }> = ({
  id,
  name,
}) => {
  return (
    <List.Item>
      <List.Item.Meta title={name} />
    </List.Item>
  );
};

const CardBody = styled("div")`
  height: 200px;
  overflow-y: auto;
`;

const Header: React.FC<{ name: string; namespace: string; id: string }> = ({
  name,
  namespace,
  id,
}) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader
      onEdit={enable}
      title={name}
      breadcrumbs={[{ text: namespace }]}
    >
      <RenameApplicationDialog
        name={name}
        id={id}
        onClose={disable}
        open={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};

const ApplicationChangeLog: React.FC<{
  data: EditApplication_Application_Fragment$data;
}> = ({ data }) => {
  const { changeLog } = useFragment<EditApplication_ChangeLog_Fragment$key>(
    applicationChangeLogFragment,
    data
  );

  return <ChangeLog data={changeLog} />;
};
