import React, { useCallback, useMemo, useState } from "react";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { useParams } from "react-router";
import { EditApplicationPartComponent_GetById_Query } from "./__generated__/EditApplicationPartComponent_GetById_Query.graphql";
import { Button, Col, Row, Tabs } from "antd";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import {
  EditApplicationPartComponent_fragment$data,
  EditApplicationPartComponent_fragment$key,
} from "./__generated__/EditApplicationPartComponent_fragment.graphql";
import { SectionHeader } from "../shared/SectionHeader";
import { SchemaComponentEditor } from "./components/SchemaComponentEditor";
import { css } from "@emotion/react";
import { EditApplicationPartComponent_UpdateComponentValues_Mutation } from "./__generated__/EditApplicationPartComponent_UpdateComponentValues_Mutation.graphql";
import {
  pipeCommitFn,
  withSuccessMessage,
  withErrorNotifications,
} from "../shared/pipeCommitFn";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { CompareApplicationPartComponentVersions } from "./CompareApplicationPartComponentVersions";
import { ButtonBar } from "../shared/ButtonBar";
import { EditApplicationPartComponent_ChangeLog_Fragment$key } from "./__generated__/EditApplicationPartComponent_ChangeLog_Fragment.graphql";
import { ChangeLog } from "../shared/ChangeLog";
import { useTabSwitcher } from "../shared/useTabSwitcher";
import { TabRow } from "../shared/TabRow";

const applicationPartComponentQuery = graphql`
  query EditApplicationPartComponent_GetById_Query($partComponentId: ID!) {
    applicationPartComponentById(partComponentId: $partComponentId) {
      ...EditApplicationPartComponent_fragment
    }
    globalVariableValues {
      variable {
        name
      }
    }
  }
`;

const applicationPartComponentFragment = graphql`
  fragment EditApplicationPartComponent_fragment on ApplicationPartComponent {
    applicationPart {
      name
      application {
        name
        namespace
      }
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
    definition {
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
    version
    values
    ...EditApplicationPartComponent_ChangeLog_Fragment @defer
  }
`;

const applicationPartComponentChangeLog = graphql`
  fragment EditApplicationPartComponent_ChangeLog_Fragment on ApplicationPartComponent {
    changeLog {
      ...ChangeLog_fragment
    }
  }
`;

const updateComponentValuesMutation = graphql`
  mutation EditApplicationPartComponent_UpdateComponentValues_Mutation(
    $input: UpdateApplicationPartComponentValuesInput!
  ) {
    updateApplicationPartComponentValues(input: $input) {
      component {
        ...EditApplicationPartComponent_fragment
      }
      errors {
        ... on UserError {
          message
          code
        }
      }
    }
  }
`;

export const EditApplicationPartComponent = () => {
  const { partComponentId = "" } = useParams();
  const data = useLazyLoadQuery<EditApplicationPartComponent_GetById_Query>(
    applicationPartComponentQuery,
    {
      partComponentId: partComponentId,
    },
    { fetchPolicy: "network-only" }
  );
  const component = useFragment<EditApplicationPartComponent_fragment$key>(
    applicationPartComponentFragment,
    data.applicationPartComponentById
  );
  const { tab, navigateToTab } = useTabSwitcher();
  if (!component || !component.applicationPart?.application) {
    return (
      <DetailView style={{ padding: 1 }}>
        Coult not find application part component
      </DetailView>
    );
  }

  const {
    definition,
    version,
    applicationPart: {
      name: applicationPartName,
      application: { name: applicationName, namespace },
    },
  } = component;

  console.log({ tab });
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
            applicationName={applicationName}
            namespace={namespace ?? ""}
            applicationPartName={applicationPartName}
            componentName={definition?.name ?? ""}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <SectionHeader
            title={`Component ${definition?.name}`}
          ></SectionHeader>
        </Col>
      </Row>
      <TabRow>
        <Tabs
          defaultActiveKey={tab}
          key={tab}
          onChange={navigateToTab}
          items={[
            {
              key: "edit",
              label: "Configuration",
              children: (
                <DefaultSuspense>
                  <EditConfiguration
                    partComponentId={partComponentId}
                    component={component}
                    globalVariableValues={data.globalVariableValues}
                  />
                </DefaultSuspense>
              ),
            },
            {
              key: "changelog",
              label: "Change Log",
              children: (
                <DefaultSuspense>
                  <ApplicationPartComponentChangeLog data={component} />
                </DefaultSuspense>
              ),
            },
            {
              key: "compare",
              label: "Compare Versions",
              children: (
                <DefaultSuspense>
                  <CompareApplicationPartComponentVersions
                    mostRecentVersion={version}
                  />
                </DefaultSuspense>
              ),
            },
          ]}
        />
      </TabRow>
    </DetailView>
  );
};

export const EditConfiguration: React.FC<{
  partComponentId: string;
  component: EditApplicationPartComponent_fragment$data;
  globalVariableValues: EditApplicationPartComponent_GetById_Query["response"]["globalVariableValues"];
}> = ({ component, partComponentId, globalVariableValues }) => {
  const [commit, isInFlight] =
    useMutation<EditApplicationPartComponent_UpdateComponentValues_Mutation>(
      updateComponentValuesMutation
    );

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
          ...globalVariableValues,
          ...(component?.applicationPart?.variableValues ?? []),
          ...(component?.applicationPart?.application?.variableValues ?? []),
        ].map((x) => x.variable?.name ?? "-"),
      ])
    );
  }, [
    component?.applicationPart?.application?.variableValues,
    component?.applicationPart?.variableValues,
    globalVariableValues,
  ]);

  if (!component || !component.applicationPart?.application) {
    throw new Error("Edit application part component was in invalid state");
  }

  const { definition, values } = component;

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
  data: EditApplicationPartComponent_ChangeLog_Fragment$key;
}> = ({ data }) => {
  const { changeLog } =
    useFragment<EditApplicationPartComponent_ChangeLog_Fragment$key>(
      applicationPartComponentChangeLog,
      data
    );

  return <ChangeLog data={changeLog} />;
};
