import { Button, Col, Row } from "antd";
import { FormActions, FormField } from "../../shared/FormField";
import {
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";

import { DetailView } from "../../shared/DetailView";
import { NewGroupMutation } from "@generated/NewGroupMutation.graphql";
import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useCommitForm } from "../../shared/useCommitForm";
import { useConnectionId } from "../../shared/useConnectionId";
import { useGoTo } from "../../shared/useGoTo";
import { useMutation } from "react-relay";

export const NewGroup: React.FC = () => {
  const [commit, isInFlight] = useMutation<NewGroupMutation>(graphql`
    mutation NewGroupMutation(
      $input: CreateGroupInput!
      $connectionIds: [ID!]!
    ) {
      createGroup(input: $input) {
        group
          @appendNode(connections: $connectionIds, edgeTypeName: "GroupsEdge") {
          id
          ...GroupsList_ListItem
        }
        errors {
          ... on UserError {
            message
            code
          }
        }
      }
    }
  `);

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
