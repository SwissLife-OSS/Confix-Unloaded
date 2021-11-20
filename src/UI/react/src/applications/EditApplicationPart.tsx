import * as React from "react";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { useRouteMatch } from "react-router";
import { EditApplicationPart_GetById_Query } from "./__generated__/EditApplicationPart_GetById_Query.graphql";
import { Button, Card, Col, Descriptions, Empty, Row } from "antd";
import styled from "@emotion/styled";
import {
  EditableBreadcrumbHeader,
  HeaderButton,
} from "../shared/EditablePageHeader";
import { DeleteIcon, EditIcon, PublishIcon } from "../icons/icons";
import { useToggle } from "../shared/useToggle";
import { ApplicationPartComponentSectionHeader } from "./components/ApplicationPartComponentSectionHeader";
import { EditApplicationPartComponent_component$key } from "./__generated__/EditApplicationPartComponent_component.graphql";
import { EditApplicationPart_fragment$key } from "./__generated__/EditApplicationPart_fragment.graphql";
import { RenameApplicationPartDialog } from "./dialogs/RenameApplicationPartDialog";
import { RemoveComponentFromApplicationPartDialog } from "./dialogs/RemoveComponentFromApplicationPartDialog";
import { useGoTo } from "../shared/useGoTo";
import { Routes } from "../routes";

const applicationByIdQuery = graphql`
  query EditApplicationPart_GetById_Query($id: ID!) {
    applicationPartById(id: $id) {
      id
      ...EditApplicationPart_fragment
    }
  }
`;

const applicationPartfragment = graphql`
  fragment EditApplicationPart_fragment on ApplicationPart {
    id
    name
    application {
      id
      namespace
      name
    }
    components {
      id
      definition {
        id
      }
      ...EditApplicationPartComponent_component
    }
  }
`;

export const EditApplicationPart = () => {
  const {
    params: { applicationId, id: applicationPartId },
  } = useRouteMatch<{ applicationId: string; id: string }>();
  const data = useLazyLoadQuery<EditApplicationPart_GetById_Query>(
    applicationByIdQuery,
    { id: applicationPartId }
  );
  const applicationPartById = useFragment<EditApplicationPart_fragment$key>(
    applicationPartfragment,
    data.applicationPartById
  );

  if (!applicationPartById) {
    return (
      <DetailView style={{ padding: 1 }}>
        Coult not find application part
      </DetailView>
    );
  }
  const {
    id,
    components,
    name: applicationPartName,
    application,
  } = applicationPartById;

  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <Header
            applicationName={application?.name ?? ""}
            applicationPartName={applicationPartName}
            namespace={application?.namespace ?? ""}
            id={id}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <ApplicationPartComponentSectionHeader
            applicationPartId={id}
            applicationPartName={applicationPartName}
          />
        </Col>
        <Col xs={24}>
          {components.length === 0 ? (
            <Empty description="No Application Parts"></Empty>
          ) : (
            <Row gutter={[16, 16]}>
              {(components.map((x) => ({ ...x })) ?? []).map((item) => (
                <Col span={8} key={item.definition.id}>
                  <ApplicationPartComponentsDisplay
                    applicationId={applicationId}
                    part={item}
                    componentPartId={item.id}
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

const applicationPartComponentFragment = graphql`
  fragment EditApplicationPartComponent_component on ApplicationPartComponent {
    id
    definition {
      id
      name
      state
    }
  }
`;

const ApplicationPartComponentsDisplay: React.FC<{
  applicationId: string;
  componentPartId: string;
  part: EditApplicationPartComponent_component$key;
}> = ({ part, applicationId, componentPartId }) => {
  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const {
    id,
    definition: { name, state },
  } = useFragment(applicationPartComponentFragment, part);
  const goToComponent = useGoTo(() =>
    Routes.applicationPartComponents.edit(applicationId, componentPartId)
  );
  return (
    <>
      <Card
        title={name}
        actions={[<EditIcon onClick={goToComponent} />]}
        extra={
          <Button icon={<DeleteIcon />} danger onClick={enableRemoveDialog} />
        }
      >
        <CardBody>
          <Descriptions>
            <Descriptions.Item label="name">{name}</Descriptions.Item>
            <Descriptions.Item label="state">{state}</Descriptions.Item>
          </Descriptions>
        </CardBody>
      </Card>
      <RemoveComponentFromApplicationPartDialog
        partComponentId={id}
        componentName={name}
        visible={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
    </>
  );
};

const CardBody = styled("div")`
  height: 200px;
  overflow-y: scroll;
`;

const Header: React.FC<{
  applicationPartName: string;
  applicationName: string;
  namespace: string;
  id: string;
}> = ({ applicationPartName, applicationName, namespace, id }) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader
      onEdit={enable}
      title={applicationPartName}
      breadcrumbs={[{ text: namespace }, { text: applicationName }]}
    >
      <HeaderButton type="primary" icon={<PublishIcon />}>
        Publish
      </HeaderButton>
      <RenameApplicationPartDialog
        applicationPartName={applicationName}
        applicationPartId={id}
        onClose={disable}
        visible={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};
