import { Button, Col, Row, Tabs } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import {
  pipeCommitFn,
  withErrorNotifications,
  withSuccessMessage,
} from "../shared/pipeCommitFn";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";

import { ButtonBar } from "../shared/ButtonBar";
import { ChangeLog } from "../shared/ChangeLog";
import { CompareApplicationPartComponentVersions } from "./CompareApplicationPartComponentVersions";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { DetailView } from "../shared/DetailView";
import { EditApplicationPartComponent$key } from "@generated/EditApplicationPartComponent.graphql";
import { EditApplicationPartComponent_ApplicationPartComponentChangeLog$key } from "@generated/EditApplicationPartComponent_ApplicationPartComponentChangeLog.graphql";
import { EditApplicationPartComponent_EditConfiguration$key } from "@generated/EditApplicationPartComponent_EditConfiguration.graphql";
import { EditApplicationPartComponent_GetById_Query } from "@generated/EditApplicationPartComponent_GetById_Query.graphql";
import { EditApplicationPartComponent_UpdateComponentValues_Mutation } from "@generated/EditApplicationPartComponent_UpdateComponentValues_Mutation.graphql";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { SchemaComponentEditor } from "./components/SchemaComponentEditor";
import { SectionHeader } from "../shared/SectionHeader";
import { TabRow } from "../shared/TabRow";
import { css } from "@emotion/react";
import { graphql } from "babel-plugin-relay/macro";
import { useParams } from "react-router";
import { useTabSwitcher } from "../shared/useTabSwitcher";

export const EditApplicationPartComponent = () => {
  const { partComponentId = "" } = useParams();
  const { tab, navigateToTab } = useTabSwitcher();

  const query = useLazyLoadQuery<EditApplicationPartComponent_GetById_Query>(
    graphql`
      query EditApplicationPartComponent_GetById_Query($partComponentId: ID!) {
        ...EditApplicationPartComponent
      }
    `,
    {
      partComponentId: partComponentId,
    },
    { fetchPolicy: "network-only" }
  );

  const data = useFragment<EditApplicationPartComponent$key>(
    graphql`
      fragment EditApplicationPartComponent on Query {
        applicationPartComponentById(partComponentId: $partComponentId) {
          applicationPart {
            name
            application {
              name
              namespace
            }
          }
          definition {
            name
          }
          version
          ...EditApplicationPartComponent_ApplicationPartComponentChangeLog
            @defer
        }
        ...EditApplicationPartComponent_EditConfiguration
      }
    `,
    query
  );

  if (
    !data ||
    !data.applicationPartComponentById?.applicationPart?.application
  ) {
    return (
      <DetailView style={{ padding: 1 }}>
        Coult not find application part component
      </DetailView>
    );
  }

  const {
    definition,
    version,
    applicationPart,
    applicationPart: {
      application,
      application: { namespace },
    },
  } = data.applicationPartComponentById;

  return (
    <DetailView
      css={css`
        padding: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      <Row>
        <Col xs={24}>
          <Header
            applicationName={application.name}
            namespace={namespace ?? ""}
            applicationPartName={applicationPart.name}
            componentName={definition?.name ?? ""}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <SectionHeader title={`Component ${definition?.name}`} />
        </Col>
      </Row>
      <TabRow>
        <Tabs defaultActiveKey={tab} key={tab} onChange={navigateToTab}>
          <Tabs.TabPane key="edit" tab="Configuration">
            <DefaultSuspense>
              <EditConfiguration
                partComponentId={partComponentId}
                fragmentRef={data}
              />
            </DefaultSuspense>
          </Tabs.TabPane>
          <Tabs.TabPane key="changelog" tab="Change Log">
            <DefaultSuspense>
              <ApplicationPartComponentChangeLog
                fragmentRef={data.applicationPartComponentById}
              />
            </DefaultSuspense>
          </Tabs.TabPane>
          <Tabs.TabPane key="compare" tab="Compare Versions">
            <DefaultSuspense>
              <CompareApplicationPartComponentVersions
                mostRecentVersion={version}
              />
            </DefaultSuspense>
          </Tabs.TabPane>
        </Tabs>
      </TabRow>
    </DetailView>
  );
};

const EditConfiguration: React.FC<{
  partComponentId: string;
  fragmentRef: EditApplicationPartComponent_EditConfiguration$key;
}> = ({ fragmentRef, partComponentId }) => {
  const data = useFragment<EditApplicationPartComponent_EditConfiguration$key>(
    graphql`
      fragment EditApplicationPartComponent_EditConfiguration on Query {
        applicationPartComponentById(partComponentId: $partComponentId) {
          applicationPart {
            variableValues {
              variable {
                name
              }
            }
            application {
              variableValues {
                variable {
                  name
                }
              }
            }
          }
          values
          definition {
            id
            schemaSdl
          }
        }
        globalVariableValues {
          variable {
            name
          }
        }
      }
    `,
    fragmentRef
  );

  const [commit, isInFlight] =
    useMutation<EditApplicationPartComponent_UpdateComponentValues_Mutation>(
      graphql`
        mutation EditApplicationPartComponent_UpdateComponentValues_Mutation(
          $input: UpdateApplicationPartComponentValuesInput!
        ) {
          updateApplicationPartComponentValues(input: $input) {
            component {
              values
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

  const applicationPartComponent = data.applicationPartComponentById;
  const applicationPart = data.applicationPartComponentById?.applicationPart;
  const application = applicationPart?.application;

  const [componentValues, setComponentValues] = useState<
    Record<string, any> | undefined
  >();

  const updateComponentValues = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.updateApplicationPartComponentValues.component,
        "Updated values"
      ),
      withErrorNotifications(
        (x) => x.updateApplicationPartComponentValues?.errors
      ),
    ])({
      variables: {
        input: { partComponentId, values: componentValues },
      },
    });
  }, [commit, partComponentId, componentValues]);

  const variables = useMemo(() => {
    return Array.from(
      new Set([
        ...[
          ...data.globalVariableValues,
          ...(applicationPart?.variableValues ?? []),
          ...(application?.variableValues ?? []),
        ].map((x) => x.variable?.name ?? "-"),
      ])
    );
  }, [
    application?.variableValues,
    applicationPart?.variableValues,
    data.globalVariableValues,
  ]);

  if (!applicationPartComponent) {
    throw new Error("Edit application part component was in invalid state");
  }

  const { definition, values } = applicationPartComponent;

  return (
    <>
      <SchemaComponentEditor
        key={definition?.id}
        onValuesChanged={setComponentValues}
        values={values ?? ""}
        schema={definition?.schemaSdl ?? ""}
        variables={variables}
      />
      <ButtonBar>
        <Button
          loading={isInFlight}
          disabled={!componentValues}
          onClick={updateComponentValues}
        >
          Save
        </Button>
      </ButtonBar>
    </>
  );
};

const Header: React.FC<{
  componentName: string;
  applicationPartName: string;
  applicationName: string;
  namespace: string;
}> = ({ applicationPartName, componentName, applicationName, namespace }) => (
  <EditableBreadcrumbHeader
    isEditable={false}
    title={componentName}
    breadcrumbs={[
      { text: namespace },
      { text: applicationName },
      { text: applicationPartName },
    ]}
  />
);

const ApplicationPartComponentChangeLog: React.FC<{
  fragmentRef: EditApplicationPartComponent_ApplicationPartComponentChangeLog$key;
}> = ({ fragmentRef }) => {
  const { changeLog } =
    useFragment<EditApplicationPartComponent_ApplicationPartComponentChangeLog$key>(
      graphql`
        fragment EditApplicationPartComponent_ApplicationPartComponentChangeLog on ApplicationPartComponent {
          changeLog {
            ...ChangeLog
          }
        }
      `,
      fragmentRef
    );

  return <ChangeLog data={changeLog} />;
};
