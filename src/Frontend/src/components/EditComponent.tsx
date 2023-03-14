import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { Button, Col, Row, Space, Tabs, Tag } from "antd";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { EditComponentQuery } from "./__generated__/EditComponentQuery.graphql";
import {
  pipeCommitFn,
  withErrorNotifications,
  withSuccessMessage,
} from "../shared/pipeCommitFn";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { useToggle } from "../shared/useToggle";
import { RenameComponentDialog } from "./controls/dialogs/RenameComponentDialog";
import { SchemaComponentEditor } from "../applications/components/SchemaComponentEditor";
import {
  EditComponentUpdateMutation,
  EditComponentUpdateMutation$data,
} from "./__generated__/EditComponentUpdateMutation.graphql";
import React, { useState } from "react";
import { css } from "@emotion/react";
import { SectionHeader } from "../shared/SectionHeader";
import { useParams } from "react-router";
import { useTabSwitcher } from "../shared/useTabSwitcher";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { ChangeLog } from "../shared/ChangeLog";
import { TabRow } from "../shared/TabRow";
import { ButtonBar } from "../shared/ButtonBar";
import { EditComponent_AvailableIn$key } from "./__generated__/EditComponent_AvailableIn.graphql";
import { EditIcon } from "../icons/icons";
import { ChangeComponentScopeDialog } from "./controls/dialogs/ChangeComponentScopeDialog";
import { EditComponent$key } from "./__generated__/EditComponent.graphql";
import { EditComponent_EditComponentForm$key } from "./__generated__/EditComponent_EditComponentForm.graphql";
import { EditComponent_ComponentChangeLog$key } from "./__generated__/EditComponent_ComponentChangeLog.graphql";

export const EditComponent = () => {
  const { id: componentId = "" } = useParams();

  const { tab, navigateToTab } = useTabSwitcher();

  const data = useLazyLoadQuery<EditComponentQuery>(
    graphql`
      query EditComponentQuery($id: ID!) {
        componentById(id: $id) {
          ...EditComponent
        }
      }
    `,
    {
      id: componentId,
    }
  );

  const component = useFragment<EditComponent$key>(
    graphql`
      fragment EditComponent on Component {
        id
        name
        ...EditComponent_AvailableIn
        ...EditComponent_EditComponentForm
        ...EditComponent_ComponentChangeLog
      }
    `,
    data.componentById
  );
  const id = component?.id;
  const name = component?.name;
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
      <Row>
        <AvailableIn id={id} data={component} />
      </Row>
      <TabRow>
        <Tabs
          defaultActiveKey={tab}
          key={tab}
          onChange={navigateToTab}
          items={[
            {
              key: "edit",
              label: "Parts",
              children: <EditComponentForm id={id} data={component} />,
            },
            {
              key: "changelog",
              label: "Change Log",
              children: (
                <DefaultSuspense>
                  <ComponentChangeLog data={component} />
                </DefaultSuspense>
              ),
            },
          ]}
        />
      </TabRow>
    </DetailView>
  );
};

const EditComponentForm: React.FC<{
  id: string;
  data: EditComponent_EditComponentForm$key;
}> = ({ data, id }) => {
  const component = useFragment(
    graphql`
      fragment EditComponent_EditComponentForm on Component {
        id
        schemaSdl
        values
      }
    `,
    data
  );
  const [commit, isInFlight] = useMutation<EditComponentUpdateMutation>(
    graphql`
      mutation EditComponentUpdateMutation(
        $valuesInput: UpdateComponentValuesInput!
        $schemaInput: UpdateComponentSchemaInput!
      ) {
        updateComponentSchema(input: $schemaInput) {
          component {
            id
            ...EditComponent
          }
          errors {
            ... on UserError {
              message
              code
            }
          }
        }
        updateComponentValues(input: $valuesInput) {
          component {
            id
            ...EditComponent
          }
          errors {
            ... on UserError {
              message
              code
            }
          }
        }
      }
    `
  );

  const [schema, setSchema] = useState<string | undefined>(
    component.schemaSdl ?? ""
  );
  const [values, setValues] = useState<Record<string, object> | undefined>(
    component.values as any
  );
  const handleUpdate = React.useCallback(() => {
    const isSuccess = (r: EditComponentUpdateMutation$data) =>
      !!r.updateComponentSchema.component?.id &&
      !!r.updateComponentValues.component?.id;

    pipeCommitFn(commit, [
      withSuccessMessage(isSuccess, "Updated Component"),
      withErrorNotifications((r) => [
        ...(r.updateComponentSchema.errors ?? []),
        ...(r.updateComponentValues.errors ?? []),
      ]),
    ])({
      variables: {
        schemaInput: { id, schema: schema ?? "" },
        valuesInput: { id, values },
      },
    });
  }, [commit, schema, values, id]);

  return (
    <>
      <SchemaComponentEditor
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
        open={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};

const ComponentChangeLog: React.FC<{
  data: EditComponent_ComponentChangeLog$key;
}> = ({ data }) => {
  const { changeLog } = useFragment(
    graphql`
      fragment EditComponent_ComponentChangeLog on Component {
        changeLog {
          ...ChangeLog_fragment
        }
      }
    `,
    data
  );

  return <ChangeLog data={changeLog} />;
};

const AvailableIn: React.FC<{
  id: string;
  data: EditComponent_AvailableIn$key;
}> = ({ data, id }) => {
  const [isEdit, , edit, stopEdit] = useToggle();
  const { scopes } = useFragment<EditComponent_AvailableIn$key>(
    graphql`
      fragment EditComponent_AvailableIn on Component {
        scopes {
          namespace
          applicationId
          application {
            name
          }
          applicationPartId
          applicationPart {
            name
          }
        }
      }
    `,
    data
  );
  return (
    <>
      <span style={{ marginRight: 8 }}>Scopes:</span>
      <Space size={[0, 8]} wrap>
        {scopes.map((scope) => {
          const tag = scope.applicationPartId
            ? `${scope.namespace}/${scope.application?.name}/${scope.applicationPart?.name}`
            : scope.applicationId
            ? `${scope.namespace}/${scope.application?.name}`
            : `${scope.namespace}`;

          return (
            <Tag
              key={
                scope.namespace + scope.applicationId + scope.applicationPartId
              }
            >
              {tag}
            </Tag>
          );
        })}
        <Button
          type="text"
          css={css`
            display: inline-block;
          `}
          onClick={edit}
          icon={<EditIcon />}
        ></Button>
      </Space>
      <ChangeComponentScopeDialog
        open={isEdit}
        onClose={stopEdit}
        id={id}
        scopes={scopes.map((x) =>
          x.applicationPartId
            ? [x.namespace, x.applicationId!, x.applicationPartId]
            : x.applicationId
            ? [x.namespace, x.applicationId!]
            : [x.namespace]
        )}
      />
    </>
  );
};
