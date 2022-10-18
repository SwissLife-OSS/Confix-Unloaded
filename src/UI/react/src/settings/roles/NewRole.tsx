import React, { useState } from "react";
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
import { NewRoleMutation } from "./__generated__/NewRoleMutation.graphql";
import {
  createDefaultPermissions,
  mapPermissionsToInput,
  PermissionsForm,
} from "./controls/forms/PermissionForm";

const newRoleMutation = graphql`
  mutation NewRoleMutation($input: CreateRoleInput!, $connectionIds: [ID!]!) {
    createRole(input: $input) {
      role @appendNode(connections: $connectionIds, edgeTypeName: "RolesEdge") {
        id
        name
        ...RolesList_RoleEdge
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
export const NewRole: React.FC = () => {
  const [commit, isInFlight] = useMutation<NewRoleMutation>(newRoleMutation);
  const [permissions, setPermissions] = useState(() =>
    createDefaultPermissions()
  );
  const connectionIds = [
    useConnectionId("useRoles_searchRoles"),
    useConnectionId("Query_searchRoles"),
  ];
  const goToEdit = useGoTo((id: string) => `${id}/edit`);
  const form = useCommitForm(
    commit,
    {
      name: "",
      permissions: [],
    },
    (input) => ({
      input: { ...input, permissions: mapPermissionsToInput(permissions) },
      connectionIds,
    }),
    {
      pipes: [
        withErrorNotifications((x) => x.createRole?.errors),
        withOnSuccess((x) => x.createRole.role?.id, goToEdit),
        withSuccessMessage((x) => x.createRole.role?.id, "Role Created"),
      ],
    }
  );
  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <h2>New Role</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <form onSubmitCapture={form.handleSubmit}>
            <FormField form={form} field="name" label="Name" />
            <PermissionsForm
              permissions={permissions}
              onChange={setPermissions}
            />
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
