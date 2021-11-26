import { useFragment, useLazyLoadQuery } from "react-relay";
import { Col, Descriptions, Form, Row } from "antd";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { useRouteMatch } from "react-router";
import { EditVariableQuery } from "./__generated__/EditVariableQuery.graphql";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { useToggle } from "../shared/useToggle";
import { RenameVariableDialog } from "./controls/dialogs/RenameVariableDialog";
import React from "react";
import { EditVariable_Variable$key } from "./__generated__/EditVariable_Variable.graphql";
import { css } from "@emotion/react";
import { CheckIcon, NotCheckIcon } from "../icons/icons";
import { FieldInput } from "../shared/FormField";

const variableByIdQuery = graphql`
  query EditVariableQuery($id: ID!) {
    variable(id: $id) {
      id
      ...EditVariable_Variable
    }
    searchEnvironments {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const editVariableFragment = graphql`
  fragment EditVariable_Variable on Variable {
    id
    name
    namespace
    isSecret
    state
    values {
      application {
        id
      }
      part {
        id
      }
      id
      value
      encryption {
        keyProvider
        key
        algorithm
      }
    }
  }
`;

export const EditVariable = () => {
  const route = useRouteMatch<{ id: string }>();
  const { variable, searchEnvironments } = useLazyLoadQuery<EditVariableQuery>(
    variableByIdQuery,
    {
      id: route.params.id,
    }
  );
  const id = variable?.id;
  if (!id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find Variable</DetailView>
    );
  }
  return (
    <EditVariableForm
      data={variable}
      id={id}
      environments={searchEnvironments?.edges?.map((x) => x.node) ?? []}
    />
  );
};

const EditVariableForm: React.FC<{
  id: string;
  environments: { id: string; name: string }[];
  data: NonNullable<EditVariableQuery["response"]["variable"]>;
}> = ({ data, id, environments }) => {
  const { name, namespace, isSecret } = useFragment<EditVariable_Variable$key>(
    editVariableFragment,
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
          <Header namespace={namespace} name={name} id={id} />
        </Col>
      </Row>
      <Row>
        <Descriptions>
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Namespace">{namespace}</Descriptions.Item>
          <Descriptions.Item label="Is Secret">
            {isSecret ? <CheckIcon /> : <NotCheckIcon />}
          </Descriptions.Item>
        </Descriptions>
      </Row>
      {environments.map((x) => (
        <Row>
          <FieldInput label={x.name} />
        </Row>
      ))}
    </DetailView>
  );
};

const Header: React.FC<{ name: string; namespace: string | null; id: string }> =
  ({ name, namespace, id }) => {
    const [isEdit, , enable, disable] = useToggle();
    return (
      <EditableBreadcrumbHeader
        onEdit={enable}
        title={name}
        breadcrumbs={[
          {
            text: namespace ?? "-",
          },
        ]}
      >
        <RenameVariableDialog
          name={name}
          key={name}
          id={id}
          onClose={disable}
          visible={isEdit}
        />
      </EditableBreadcrumbHeader>
    );
  };
