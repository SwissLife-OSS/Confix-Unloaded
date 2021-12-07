import React from "react";
import { Button, Col, Row } from "antd";
import { useMutation } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { FormActions, FormField } from "../shared/FormField";
import { graphql } from "babel-plugin-relay/macro";
import { NewComponentMutation } from "./__generated__/NewComponentMutation.graphql";
import {
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../shared/pipeCommitFn";
import { useConnectionId } from "../shared/useConnectionId";
import { useGoTo } from "../shared/useGoTo";
import { useCommitForm } from "../shared/useCommitForm";

const newComponentMutation = graphql`
  mutation NewComponentMutation(
    $input: CreateComponentInput!
    $connectionIds: [String!]!
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
        ... on IUserError {
          message
          code
        }
      }
    }
  }
`;
export const NewComponent: React.FC = () => {
  const [commit, isInFlight] =
    useMutation<NewComponentMutation>(newComponentMutation);

  const connectionId = useConnectionId("Query_components");
  const goToEdit = useGoTo((id: string) => `${id}/edit`);
  const form = useCommitForm(
    commit,
    {
      name: "",
      schema: "",
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
            <FormField form={form} field="schema" label="Schema" />
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
