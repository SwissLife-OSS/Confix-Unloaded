import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { Col, Row } from "antd";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { EditComponentQuery } from "./__generated__/EditComponentQuery.graphql";
import { pipeCommitFn, withSuccessMessage } from "../shared/pipeCommitFn";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { useToggle } from "../shared/useToggle";
import { RenameComponentDialog } from "./controls/dialogs/RenameComponentDialog";
import { ComponentEditor } from "../applications/components/ComponentEditor";
import {
  EditComponentUpdateMutation,
  EditComponentUpdateMutationResponse,
} from "./__generated__/EditComponentUpdateMutation.graphql";
import React, { useState } from "react";
import { EditComponent_component$key } from "./__generated__/EditComponent_component.graphql";
import { css } from "@emotion/react";
import { SectionHeader } from "../shared/SectionHeader";
import { useParams } from "react-router";

const componentByIdQuery = graphql`
  query EditComponentQuery($id: ID!) {
    componentById(id: $id) {
      id
      ...EditComponent_component
    }
  }
`;

const editComponentFragment = graphql`
  fragment EditComponent_component on Component {
    id
    name
    state
    schemaSdl
    schema
    values
    defaults
    schemaViolations {
      path
      code
    }
  }
`;

const editComponentMutation = graphql`
  mutation EditComponentUpdateMutation(
    $valuesInput: UpdateComponentValuesInput!
    $schemaInput: UpdateComponentSchemaInput!
  ) {
    updateComponentSchema(input: $schemaInput) {
      component {
        id
        ...EditComponent_component
      }
    }
    updateComponentValues(input: $valuesInput) {
      component {
        id
        ...EditComponent_component
      }
    }
  }
`;

export const EditComponent = () => {
  const { id: componentId = "" } = useParams();
  const component = useLazyLoadQuery<EditComponentQuery>(componentByIdQuery, {
    id: componentId,
  });
  const id = component.componentById?.id;
  if (!id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find component</DetailView>
    );
  }
  return <EditComponentForm data={component.componentById} id={id} />;
};

const EditComponentForm: React.FC<{
  id: string;
  data: NonNullable<EditComponentQuery["response"]["componentById"]>;
}> = ({ data, id }) => {
  const component = useFragment<EditComponent_component$key>(
    editComponentFragment,
    data
  );
  const [commit, isInFlight] = useMutation<EditComponentUpdateMutation>(
    editComponentMutation
  );

  const [schema, setSchema] = useState<string | undefined>(
    component.schemaSdl ?? ""
  );
  const [values, setValues] = useState<Record<string, object> | undefined>(
    component.values as any
  );
  const handleUpdate = React.useCallback(() => {
    const isSuccess = (r: EditComponentUpdateMutationResponse) =>
      !!r.updateComponentSchema.component?.id &&
      !!r.updateComponentValues.component?.id;

    pipeCommitFn(commit, [withSuccessMessage(isSuccess, "Updated Component")])({
      variables: {
        schemaInput: { id, schema: schema ?? "" },
        valuesInput: { id, values },
      },
    });
  }, [commit, schema, values, id]);

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
          <Header name={component.name} id={component.id} />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <SectionHeader
            loading={isInFlight}
            title={`Component ${component.name}`}
            disabled={!schema}
            onSave={handleUpdate}
          ></SectionHeader>
        </Col>
      </Row>
      <ComponentEditor
        key={component.id}
        onValuesChanged={setValues}
        onSchemaChange={setSchema}
        values={JSON.stringify(component.values)}
        schema={component.schemaSdl ?? ""}
        editSchema
      />
    </DetailView>
  );
};

const Header: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader onEdit={enable} title={name}>
      <RenameComponentDialog
        name={name}
        key={name}
        id={id}
        onClose={disable}
        visible={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};
