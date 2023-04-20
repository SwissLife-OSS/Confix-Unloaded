import { Button, Col, Row } from "antd";
import { FormActions, FormEditor, FormField } from "../shared/FormField";
import { useLazyLoadQuery, useMutation } from "react-relay";
import {
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../shared/pipeCommitFn";

import { ApplicationCascader } from "../applications/components/ApplicationCascader";
import { DetailView } from "../shared/DetailView";
import { NewComponentMutation } from "@generated/NewComponentMutation.graphql";
import { NewComponent_Query } from "@generated/NewComponent_Query.graphql";
import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useCommitForm } from "../shared/useCommitForm";
import { useConnectionId } from "../shared/useConnectionId";
import { useGoTo } from "../shared/useGoTo";

const newComponentMutation = graphql`
  mutation NewComponentMutation(
    $input: CreateComponentInput!
    $connectionIds: [ID!]!
  ) {
    createComponent(input: $input) {
      component
        @appendNode(
          connections: $connectionIds
          edgeTypeName: "ComponentsEdge"
        ) {
        id
        name
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
const defaultSchema = `
  type Configuration {
    value: String
  }
`;

type Result = [string] | [string, string] | [string, string, string];

export const NewComponent: React.FC = () => {
  const data = useLazyLoadQuery<NewComponent_Query>(
    graphql`
      query NewComponent_Query($search: String) {
        ...ApplicationCascader @arguments(search: $search)
      }
    `,
    {}
  );

  const [scopes, setScope] = React.useState<Result[]>([]);
  const [commit, isInFlight] =
    useMutation<NewComponentMutation>(newComponentMutation);
  const connectionId = useConnectionId("Query_components");
  const goToEdit = useGoTo((id: string) => `../${id}/edit`);
  const form = useCommitForm(
    commit,
    {
      name: "",
      scopes: scopes.map((x) => {
        return {
          namespace: x[0],
          applicationId: x[1],
          applicationPartId: x[2],
        };
      }),
      schema: defaultSchema,
    },
    (input) => ({ input, connectionIds: [connectionId] }),
    {
      pipes: [
        withErrorNotifications((x) => x.createComponent?.errors),
        withOnSuccess((x) => x.createComponent.component?.id, goToEdit),
        withSuccessMessage(
          (x) => x.createComponent.component?.id,
          "Component Created"
        ),
      ],
    }
  );
  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <h2>New Component</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <form onSubmitCapture={form.handleSubmit}>
            <FormField form={form} field="name" label="Name" />
            <ApplicationCascader
              fragmentRef={data}
              onChange={setScope}
              value={scopes}
            />
            <FormEditor form={form} field="schema" label="Schema" />
            <FormActions>
              <Button type="primary" htmlType="submit" loading={isInFlight}>
                Submit
              </Button>
            </FormActions>
          </form>
        </Col>
      </Row>
    </DetailView>
  );
};
