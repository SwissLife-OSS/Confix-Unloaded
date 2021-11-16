import * as React from "react";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { ReadOnlyFormField } from "../shared/FormField";
import { graphql } from "babel-plugin-relay/macro";
import { useRouteMatch } from "react-router";
import { EditApplication_GetById_Query } from "./__generated__/EditApplication_GetById_Query.graphql";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  List,
  Row,
  Typography,
} from "antd";
import { EditApplicationHeader } from "./components/EditApplicationHeader";
import styled from "@emotion/styled";
import { HeaderButton } from "../shared/EditablePageHeader";
import { AddIcon, DeleteIcon, EditIcon, PublishIcon } from "../icons/icons";
import { EditApplication_part$key } from "./__generated__/EditApplication_part.graphql";
import { ApplicationPartSectionHeader } from "./components/ApplicationPartSectionHeader";
import {
  EditApplication_Application_Fragment,
  EditApplication_Application_Fragment$key,
} from "./__generated__/EditApplication_Application_Fragment.graphql";
import { useGoTo } from "../shared/useGoTo";
import { Routes } from "../routes";
import { useToggle } from "../shared/useToggle";
import { RemovePartFromApplicationDialog } from "./dialogs/RemovePartFromApplicationDialog";
import { AddComponentsToApplicationPartDialog } from "./dialogs/AddComponentsToApplicationPartDialog";

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
          <EditApplicationHeader id={application.id} name={application.name}>
            <HeaderButton type="primary" icon={<PublishIcon />}>
              Publish
            </HeaderButton>
          </EditApplicationHeader>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <ReadOnlyFormField
            value={application.namespace ?? ""}
            label="Namespace"
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
                  <ApplicationPartsDisplay part={item} />
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

const ApplicationPartsDisplay: React.FC<{ part: EditApplication_part$key }> = ({
  part,
}) => {
  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const [isAddComponentVisible, , enableAddComponent, disableAddComponent] =
    useToggle();
  const { components, name, id } = useFragment(applicationPartFragment, part);
  return (
    <>
      <Card
        title={name}
        actions={[<EditIcon />, <AddIcon onClick={enableAddComponent} />]}
        extra={
          <Button icon={<DeleteIcon />} danger onClick={enableRemoveDialog} />
        }
      >
        <List
          dataSource={components.map((x) => ({ ...x }))}
          renderItem={(item) => (
            <List.Item>
              <Descriptions title={item.definition.name}>
                <Descriptions.Item label="State">
                  {item.definition.state}
                </Descriptions.Item>
              </Descriptions>
            </List.Item>
          )}
        />
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
