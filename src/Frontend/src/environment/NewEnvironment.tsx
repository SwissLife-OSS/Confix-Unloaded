import { Button, Col, Row } from "antd";
import { FormActions, FormField } from "../shared/FormField";
import {
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../shared/pipeCommitFn";

import { DetailView } from "../shared/DetailView";
import { NewEnvironmentMutation } from "@generated/NewEnvironmentMutation.graphql";
import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useCommitForm } from "../shared/useCommitForm";
import { useConnectionId } from "../shared/useConnectionId";
import { useGoTo } from "../shared/useGoTo";
import { useMutation } from "react-relay";

export const NewEnvironment: React.FC = () => {
  const [commit, isInFlight] = useMutation<NewEnvironmentMutation>(
    graphql`
      mutation NewEnvironmentMutation(
        $input: CreateEnvironmentInput!
        $connectionIds: [ID!]!
      ) {
        createEnvironment(input: $input) {
          environment
            @appendNode(
              connections: $connectionIds
              edgeTypeName: "EnvironmentsEdge"
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
    `
  );

  const connectionIds = [
    useConnectionId("useEnvironments_searchEnvironments"),
    useConnectionId("Query_searchEnvironments"),
  ];

  const goToEdit = useGoTo((id: string) => `${id}/edit`);
  const form = useCommitForm(
    commit,
    {
      name: "",
    },
    (input) => ({ input, connectionIds }),
    {
      pipes: [
        withErrorNotifications((x) => x.createEnvironment?.errors),
        withOnSuccess((x) => x.createEnvironment.environment?.id, goToEdit),
        withSuccessMessage(
          (x) => x.createEnvironment.environment?.id,
          "Environment Created"
        ),
      ],
    }
  );

  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <h2>New Environment</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <form onSubmitCapture={form.handleSubmit}>
            <FormField form={form} field="name" label="Name" />
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
