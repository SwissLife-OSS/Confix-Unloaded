import React, { useCallback, useState } from "react";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { useRouteMatch } from "react-router";
import { EditApplicationPartComponent_GetById_Query } from "./__generated__/EditApplicationPartComponent_GetById_Query.graphql";
import { Col, Row } from "antd";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { EditApplicationPartComponent_fragment$key } from "./__generated__/EditApplicationPartComponent_fragment.graphql";
import { SectionHeader } from "../shared/SectionHeader";
import { ComponentEditor } from "./components/ComponentEditor";
import { css } from "@emotion/react";
import { EditApplicationPartComponent_UpdateComponentValues_Mutation } from "./__generated__/EditApplicationPartComponent_UpdateComponentValues_Mutation.graphql";
import {
  pipeCommitFn,
  withSuccessMessage,
  withErrorNotifications,
} from "../shared/pipeCommitFn";

const applicationPartComponentQuery = graphql`
  query EditApplicationPartComponent_GetById_Query($partComponentId: ID!) {
    applicationPartComponentById(partComponentId: $partComponentId) {
      ...EditApplicationPartComponent_fragment
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
    values
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
        ... on IUserError {
          message
          code
        }
      }
    }
  }
`;

export const EditApplicationPartComponent = () => {
  const {
    params: { partComponentId },
  } = useRouteMatch<{
    partComponentId: string;
  }>();
  const data = useLazyLoadQuery<EditApplicationPartComponent_GetById_Query>(
    applicationPartComponentQuery,
    {
      partComponentId: partComponentId,
    }
  );
  const component = useFragment<EditApplicationPartComponent_fragment$key>(
    applicationPartComponentFragment,
    data.applicationPartComponentById
  );
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
        "Renamed ApplicationPart"
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

  if (!component || !component.applicationPart?.application) {
    return (
      <DetailView style={{ padding: 1 }}>
        Coult not find application part component
      </DetailView>
    );
  }

  const {
    definition,
    values,
    applicationPart: {
      name: applicationPartName,
      application: { name: applicationName, namespace },
    },
  } = component;

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
            componentName={definition.name}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <SectionHeader
            loading={isInFlight}
            title={`Component ${definition.name}`}
            disabled={!componentValues}
            onSave={updateComponentValues}
          ></SectionHeader>
        </Col>
      </Row>
      <ComponentEditor
        key={definition.id}
        onValuesChanged={setComponentValues}
        values={JSON.stringify(values)}
        schema={definition.schemaSdl ?? ""}
      />
    </DetailView>
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
