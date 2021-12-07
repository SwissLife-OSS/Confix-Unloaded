import { useFragment, useLazyLoadQuery } from "react-relay";
import { Col, Row } from "antd";
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

const EnvironmentByIdQuery = graphql`
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
  }
`;

export const EditEnvironment = () => {
  const { environmentId = "" } = useParams();
  const Environment = useLazyLoadQuery<EditEnvironmentQuery>(
    EnvironmentByIdQuery,
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
  const Environment = useFragment<EditEnvironment_Environment$key>(
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
          <Header name={Environment.name} id={Environment.id} />
        </Col>
      </Row>
      <Row>What should we put here?</Row>
    </DetailView>
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
        visible={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};
