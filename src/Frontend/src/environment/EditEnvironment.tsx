import { useFragment, useLazyLoadQuery } from "react-relay";
import { Button, Checkbox, Col, Input, Row, Typography } from "antd";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { EditEnvironmentQuery } from "./__generated__/EditEnvironmentQuery.graphql";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { useToggle } from "../shared/useToggle";
import { RenameEnvironmentDialog } from "./controls/dialogs/RenameEnvironmentDialog";
import React, { useCallback } from "react";
import { EditEnvironment_Environment$key } from "./__generated__/EditEnvironment_Environment.graphql";
import { css } from "@emotion/react";
import { useParams } from "react-router";
import { FieldInputGroup } from "../shared/FormField";
import { SetParentEnvironmentDialog } from "./controls/dialogs/SetParentEnvironmentDialog";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { SaveDeveloperAccessButton } from "./controls/buttons/SaveDeveloperAccessButton";

const { Title } = Typography;

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
    allowDeveloperAccess
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
      <Row>
        <Col xs={24}>
          <IsDeveloperAccessAllowedFrom data={data} />
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
      <Typography>Parent environment</Typography>
      <FieldInputGroup
        name={"Parent"}
        label={"Parent"}
        value={environment?.parent?.name ?? "-"}
        disabled
      >
        <Button onClick={enable}>Change</Button>
      </FieldInputGroup>
      <SetParentEnvironmentDialog
        open={open}
        onClose={disable}
        name={environment.name}
        id={environment.id}
      />
    </>
  );
};

const IsDeveloperAccessAllowedFrom: React.FC<{
  data: EditEnvironment_Environment$key;
}> = ({ data }) => {
  const environment = useFragment<EditEnvironment_Environment$key>(
    editEnvironmentFragment,
    data
  );

  const [isDeveloperAccessAllowed, setIsDeveloperAccessAllowed] =
    React.useState(environment.allowDeveloperAccess);

  const handleCheckboxChange = useCallback((e: CheckboxChangeEvent) => {
    setIsDeveloperAccessAllowed(e.target.checked);
  }, []);

  return (
    <>
      <Title level={3}>Developer Access</Title>
      <p>
        <Checkbox
          name="allowDeveloperAccess"
          checked={isDeveloperAccessAllowed}
          onChange={handleCheckboxChange}
        >
          Allow developer access
        </Checkbox>
      </p>
      <p>
        <SaveDeveloperAccessButton
          environmentId={environment.id}
          isAllowed={isDeveloperAccessAllowed}
        />
      </p>
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
