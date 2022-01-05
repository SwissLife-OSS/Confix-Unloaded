import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { Button, Col, Row, Tabs } from "antd";
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
import { useTabSwitcher } from "../shared/useTabSwitcher";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { ChangeLog } from "../shared/ChangeLog";
import { TabRow } from "../shared/TabRow";
import { ButtonBar } from "../shared/ButtonBar";

const componentByIdQuery = graphql`
  query EditComponentQuery($id: ID!) {
    componentById(id: $id) {
      id
      name
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
    changeLog {
      ...ChangeLog_fragment
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

  const { tab, navigateToTab } = useTabSwitcher();
  const component = useLazyLoadQuery<EditComponentQuery>(componentByIdQuery, {
    id: componentId,
  });
  const id = component.componentById?.id;
  const name = component.componentById?.name;
  if (!id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find component</DetailView>
    );
  }
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
          <Header name={name ?? "unkonw"} id={id} />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <SectionHeader title={`Component ${name}`}></SectionHeader>
        </Col>
      </Row>
      <TabRow>
        <Tabs defaultActiveKey={tab} key={tab} onChange={navigateToTab}>
          <Tabs.TabPane tab="Parts" key="edit">
            <EditComponentForm id={id} data={component.componentById} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Change Log" key="changelog">
            <DefaultSuspense>
              <ComponentChangeLog data={component.componentById} />
            </DefaultSuspense>
          </Tabs.TabPane>
        </Tabs>
      </TabRow>
    </DetailView>
  );
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
    <>
      <ComponentEditor
        key={component.id}
        onValuesChanged={setValues}
        onSchemaChange={setSchema}
        values={JSON.stringify(component.values)}
        schema={component.schemaSdl ?? ""}
        editSchema
      />
      <ButtonBar>
        <Button loading={isInFlight} onClick={handleUpdate}>
          Save
        </Button>
      </ButtonBar>
    </>
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

const ComponentChangeLog: React.FC<{
  data: EditComponent_component$key;
}> = ({ data }) => {
  const { changeLog } = useFragment<EditComponent_component$key>(
    editComponentFragment,
    data
  );

  return <ChangeLog data={changeLog} />;
};
