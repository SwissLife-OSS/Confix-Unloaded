import * as React from "react";
import {
  useFragment,
  useLazyLoadQuery,
  useRefetchableFragment,
} from "react-relay";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { useRouteMatch } from "react-router";
import { EditApplication_GetById_Query } from "./__generated__/EditApplication_GetById_Query.graphql";
import { Button, Card, Col, Empty, List, Row, Tabs, Typography } from "antd";
import styled from "@emotion/styled";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { AddIcon, DeleteIcon, EditIcon } from "../icons/icons";
import { EditApplication_part$key } from "./__generated__/EditApplication_part.graphql";
import { ApplicationPartSectionHeader } from "./components/ApplicationPartSectionHeader";
import {
  EditApplication_Application_Fragment,
  EditApplication_Application_Fragment$key,
} from "./__generated__/EditApplication_Application_Fragment.graphql";
import { useToggle } from "../shared/useToggle";
import { RemovePartFromApplicationDialog } from "./dialogs/RemovePartFromApplicationDialog";
import { AddComponentsToApplicationPartDialog } from "./dialogs/AddComponentsToApplicationPartDialog";
import { RenameApplicationDialog } from "./dialogs/RenameApplicationDialog";
import { useGoTo } from "../shared/useGoTo";
import { Routes } from "../routes";
import { useCallback, useState } from "react";
import { VariablesSelect } from "../variables/controls/VariableSelect";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { VariableEditor } from "../variables/controls/VariableEditor";
import { EditApplicationRefetchApplicationQuery } from "./__generated__/EditApplicationRefetchApplicationQuery.graphql";
import { VariableValueList } from "../variables/controls/VariableValueList";
import { useSilentRefresh } from "../shared/useDefaultRefetch";

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
    variableValues {
      ...VariableValueList_values
    }
    ...ApplicationPartSectionHeaderFragment
  }
`;

export const EditApplication = () => {
  const route = useRouteMatch<{ applicationId: string }>();
  const variables = { id: route.params.applicationId };
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
      <DetailView style={{ padding: 1 }}>Coult not find application</DetailView>
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
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Parts" key="1">
              <ApplicationParts application={application} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Variables" key="2">
              <Variables data={application} refetch={refresh} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </DetailView>
  );
};

export type VariableOption = { label: string; value: string };

const Variables: React.FC<{
  data: EditApplication_Application_Fragment;
  refetch: () => void;
}> = ({ data, refetch }) => {
  const [selected, setSelected] = useState<VariableOption>();
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
              data={data.variableValues}
            />
          </DefaultSuspense>
        </Col>
      </Row>
    </>
  );
};

const ApplicationParts: React.FC<{
  application: EditApplication_Application_Fragment;
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
  const goToPart = useGoTo(() =>
    Routes.applicationParts.edit(applicationId, id)
  );
  return (
    <>
      <Card
        title={name}
        actions={[
          <EditIcon onClick={goToPart} />,
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
                name={item.definition.name}
                id={item.definition.id}
              />
            )}
          />
        </CardBody>
      </Card>
      <RemovePartFromApplicationDialog
        applicationPartName={name}
        applicationPartId={id}
        visible={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
      <AddComponentsToApplicationPartDialog
        applicationPartName={name}
        applicationPartId={id}
        visible={isAddComponentVisible}
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
  overflow-y: scroll;
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
        visible={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};
