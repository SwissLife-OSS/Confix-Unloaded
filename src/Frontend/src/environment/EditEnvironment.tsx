import { useFragment, useLazyLoadQuery } from "react-relay";
import { Button, Col, Row } from "antd";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { EditEnvironmentQuery } from "./__generated__/EditEnvironmentQuery.graphql";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { useToggle } from "../shared/useToggle";
import { RenameEnvironmentDialog } from "./controls/dialogs/RenameEnvironmentDialog";
import React from "react";
import { EditEnvironment_Environment$key } from "./__generated__/EditEnvironment_Environment.graphql";
import { css } from "@emotion/react";
import { useParams } from "react-router";
import { FieldInputGroup } from "../shared/FormField";
import { SetParentEnvironmentDialog } from "./controls/dialogs/SetParentEnvironmentDialog";

const environmentByIdQuery = graphql`
  query EditEnvironmentQuery($id: ID!) {
    environmentById(id: $id) {
      id
      ...EditEnvironment_Environment
    }
  }
`;
const editEnvironmentFragment = graphql`
  fragment EditEnvironment_Environment on Environment {
    id
    name
    parent {
      id
      name
    }
  }
`;

export const EditEnvironment = () => {
  const { environmentId = "" } = useParams();
  const Environment = useLazyLoadQuery<EditEnvironmentQuery>(
    environmentByIdQuery,
    {
      id: environmentId,
    }
  );
  const id = Environment.environmentById?.id;
  if (!id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find Environment</DetailView>
    );
  }
  return <EditEnvironmentForm data={Environment.environmentById} id={id} />;
};

const EditEnvironmentForm: React.FC<{
  id: string;
  data: NonNullable<EditEnvironmentQuery["response"]["environmentById"]>;
}> = ({ data, id }) => {
  const env = useFragment<EditEnvironment_Environment$key>(
    editEnvironmentFragment,
    data
  );
  return (
    <DetailView
      style={{ padding: 1 }}
      css={css`
        padding: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      <Row>
        <Col xs={24}>
          <Header name={env.name} id={env.id} />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <ParentEnvironement data={data} />
        </Col>
      </Row>
    </DetailView>
  );
};

const ParentEnvironement: React.FC<{
  data: EditEnvironment_Environment$key;
}> = ({ data }) => {
  const environment = useFragment<EditEnvironment_Environment$key>(
    editEnvironmentFragment,
    data
  );
  const [open, , enable, disable] = useToggle();

  return (
    <>
      <FieldInputGroup
        name={"Parent"}
        label={"Parent"}
        value={environment?.parent?.name ?? "-"}
        disabled
      />
      <Button onClick={enable}>Change</Button>
      <SetParentEnvironmentDialog
        open={open}
        onClose={disable}
        name={environment.name}
        id={environment.id}
      />
    </>
  );
};

const Header: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader onEdit={enable} title={name}>
      <RenameEnvironmentDialog
        name={name}
        key={name}
        id={id}
        onClose={disable}
        open={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};
