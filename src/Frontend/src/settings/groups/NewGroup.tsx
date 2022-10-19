import React from "react";
import { Button, Col, Row } from "antd";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { DetailView } from "../../shared/DetailView";
import { FormField, FormActions } from "../../shared/FormField";
import {
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { useCommitForm } from "../../shared/useCommitForm";
import { useConnectionId } from "../../shared/useConnectionId";
import { useGoTo } from "../../shared/useGoTo";
import { NewGroupMutation } from "./__generated__/NewGroupMutation.graphql";

const newGroupMutation = graphql`
  mutation NewGroupMutation($input: CreateGroupInput!, $connectionIds: [ID!]!) {
    createGroup(input: $input) {
      group
        @appendNode(connections: $connectionIds, edgeTypeName: "GroupsEdge") {
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
export const NewGroup: React.FC = () => {
  const [commit, isInFlight] = useMutation<NewGroupMutation>(newGroupMutation);

  const connectionIds = [
    useConnectionId("useGroups_searchGroups"),
    useConnectionId("Query_searchGroups"),
  ];
  const goToEdit = useGoTo((id: string) => `${id}/edit`);
  const form = useCommitForm(
    commit,
    {
      name: "",
      requirements: [],
      roles: [],
    },
    (input) => ({ input, connectionIds }),
    {
      pipes: [
        withErrorNotifications((x) => x.createGroup?.errors),
        withOnSuccess((x) => x.createGroup.group?.id, goToEdit),
        withSuccessMessage((x) => x.createGroup.group?.id, "Group Created"),
      ],
    }
  );
  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <h2>New Group</h2>
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
