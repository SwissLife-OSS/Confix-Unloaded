import * as React from "react";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { useRouteMatch } from "react-router";
import { EditApplication_GetById_Query } from "./__generated__/EditApplication_GetById_Query.graphql";
import { Button, Card, Col, Empty, List, Row } from "antd";
import styled from "@emotion/styled";
import {
  EditableBreadcrumbHeader,
  HeaderButton,
} from "../shared/EditablePageHeader";
import { AddIcon, DeleteIcon, EditIcon, PublishIcon } from "../icons/icons";
import { EditApplication_part$key } from "./__generated__/EditApplication_part.graphql";
import { ApplicationPartSectionHeader } from "./components/ApplicationPartSectionHeader";
import { EditApplication_Application_Fragment$key } from "./__generated__/EditApplication_Application_Fragment.graphql";
import { useToggle } from "../shared/useToggle";
import { RemovePartFromApplicationDialog } from "./dialogs/RemovePartFromApplicationDialog";
import { AddComponentsToApplicationPartDialog } from "./dialogs/AddComponentsToApplicationPartDialog";
import { RenameApplicationDialog } from "./dialogs/RenameApplicationDialog";
import { useGoTo } from "../shared/useGoTo";
import { Routes } from "../routes";

const applicationByIdQuery = graphql`
  query EditApplication_GetById_Query($id: ID!) {
    applicationById(id: $id) {
      ...EditApplication_Application_Fragment
    }
  }
`;

const applicationByIdFragment = graphql`
  fragment EditApplication_Application_Fragment on Application {
    id
    name
    namespace
    parts {
      ...EditApplication_part
    }
    ...ApplicationPartSectionHeaderFragment
  }
`;

export const EditApplication = () => {
  const route = useRouteMatch<{ id: string }>();
  const data = useLazyLoadQuery<EditApplication_GetById_Query>(
    applicationByIdQuery,
    { id: route.params.id }
  );
  const application = useFragment<EditApplication_Application_Fragment$key>(
    applicationByIdFragment,
    data.applicationById
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
          {application.parts.length === 0 ? (
            <Empty description="No Application Parts"></Empty>
          ) : (
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
          )}
        </Col>
      </Row>
    </DetailView>
  );
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
