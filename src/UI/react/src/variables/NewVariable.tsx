import React from "react";
import { Button, Col, Row } from "antd";
import { useMutation } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { FormActions, FormCheckbox, FormField } from "../shared/FormField";
import { graphql } from "babel-plugin-relay/macro";
import { withOnSuccess, withSuccessMessage } from "../shared/pipeCommitFn";
import { useConnectionId } from "../shared/useConnectionId";
import { useGoTo } from "../shared/useGoTo";
import { Routes } from "../routes";
import { useCommitForm } from "../shared/useCommitForm";
import { NewVariableMutation } from "./__generated__/NewVariableMutation.graphql";

const newVariableMutation = graphql`
  mutation NewVariableMutation(
    $input: CreateVariableInput!
    $connectionIds: [String!]!
  ) {
    createVariable(input: $input) {
      variable
        @appendNode(
          connections: $connectionIds
          edgeTypeName: "VariablesEdge"
        ) {
        id
        name
      }
    }
  }
`;
export const NewVariable: React.FC = () => {
  const [commit, isInFlight] =
    useMutation<NewVariableMutation>(newVariableMutation);

  const connectionId = useConnectionId("Query_searchVariables");
  const goToEdit = useGoTo(Routes.variables.edit);
  const form = useCommitForm(
    commit,
    {
      name: "",
      defaultValue: null,
      namespace: "",
      isSecret: false,
    },
    (input) => ({ input, connectionIds: [connectionId] }),
    {
      pipes: [
        withOnSuccess((x) => x.createVariable.variable?.id, goToEdit),
        withSuccessMessage(
          (x) => x.createVariable.variable?.id,
          "Variable Created"
        ),
      ],
    }
  );
  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <h2>New Variable</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <form onSubmitCapture={form.handleSubmit}>
            <FormField form={form} field="name" label="Name" />
            <FormField form={form} field="namespace" label="Namespace" />
            <FormCheckbox form={form} field="isSecret" label="IsSecret" />
            <FormField form={form} field="defaultValue" label="Default Value" />
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
