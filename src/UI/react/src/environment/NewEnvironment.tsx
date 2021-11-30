import { useFormik } from "formik";
import React from "react";
import { Button, Col, Row } from "antd";
import { useMutation } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { FormActions, FormField } from "../shared/FormField";
import { environmentSchema } from "./environmentSchema";
import { graphql } from "babel-plugin-relay/macro";
import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../shared/pipeCommitFn";
import { useConnectionId } from "../shared/useConnectionId";
import { useGoTo } from "../shared/useGoTo";
import { Routes } from "../routes";
import { useCommitForm } from "../shared/useCommitForm";
import { NewEnvironmentMutation } from "./__generated__/NewEnvironmentMutation.graphql";

const newEnvironmentMutation = graphql`
  mutation NewEnvironmentMutation(
    $input: CreateEnvironmentInput!
    $connectionIds: [String!]!
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
        ... on IUserError {
          message
          code
        }
      }
    }
  }
`;
export const NewEnvironment: React.FC = () => {
  const [commit, isInFlight] = useMutation<NewEnvironmentMutation>(
    newEnvironmentMutation
  );

  const connectionIds = [
    useConnectionId("useEnvironments_searchEnvironments"),
    useConnectionId("Query_searchEnvironments"),
  ];
  const goToEdit = useGoTo(Routes.environments.edit);
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
