import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { Button, Col, Row } from "antd";
import { DetailView } from "../../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { EditRoleQuery } from "./__generated__/EditRoleQuery.graphql";
import { EditableBreadcrumbHeader } from "../../shared/EditablePageHeader";
import { useToggle } from "../../shared/useToggle";
import { RenameRoleDialog } from "./controls/dialogs/RenameRoleDialog";
import React, { useState } from "react";
import { EditRole_Role$key } from "./__generated__/EditRole_Role.graphql";
import { css } from "@emotion/react";
import { useParams } from "react-router";
import {
  mapPermissionsFromObjectType,
  mapPermissionsToInput,
  PermissionsForm,
} from "./controls/forms/PermissionForm";
import { EditRoleForm_ChangeRolePermissions_Mutation } from "./__generated__/EditRoleForm_ChangeRolePermissions_Mutation.graphql";
import { useHandler } from "../../shared/useHandler";
import { FormActions } from "../../shared/FormField";
import {
  pipeCommitFn,
  withErrorNotifications,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";

const roleByIdQuery = graphql`
  query EditRoleQuery($id: ID!) {
    roleById(id: $id) {
      id
      ...EditRole_Role
    }
  }
`;
const editRoleFragment = graphql`
  fragment EditRole_Role on Role {
    id
    name
    permissions {
      scope
      permissions {
        isRead
        isWrite
        isClaim
        isPublish
        isDecrypt
      }
    }
  }
`;

export const EditRole = () => {
  const { roleId = "" } = useParams();
  const role = useLazyLoadQuery<EditRoleQuery>(roleByIdQuery, {
    id: roleId,
  });
  const id = role.roleById?.id;
  if (!id) {
    return <DetailView style={{ padding: 1 }}>Coult not find role </DetailView>;
  }
  return <EditRoleForm key={id} data={role.roleById} id={id} />;
};

const EditRoleForm: React.FC<{
  id: string;
  data: NonNullable<EditRoleQuery["response"]["roleById"]>;
}> = ({ data, id }) => {
  const role = useFragment<EditRole_Role$key>(editRoleFragment, data);
  const [permissions, setPermissions] = useState(() =>
    mapPermissionsFromObjectType(role)
  );
  const [commit, isInFlight] =
    useMutation<EditRoleForm_ChangeRolePermissions_Mutation>(graphql`
      mutation EditRoleForm_ChangeRolePermissions_Mutation(
        $input: ChangeRolePermissionsInput!
      ) {
        changeRolePermissions(input: $input) {
          role {
            id
            ...EditRole_Role
          }
          errors {
            ... on IUserError {
              message
              code
            }
          }
        }
      }
    `);
  const handleSavePermissions = useHandler(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.changeRolePermissions?.role?.id,
        `Updated permissions of ${role.name}`
      ),
      withErrorNotifications((x) => x.changeRolePermissions?.errors),
    ])({
      variables: {
        input: { id: role.id, permissions: mapPermissionsToInput(permissions) },
      },
    });
  });

  return (
    <DetailView
      style={{ padding: 1 }}
      css={css`
        padding: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      <Row>
        <Col xs={24}>
          <Header name={role.name} id={role.id} />
        </Col>
      </Row>
      <PermissionsForm permissions={permissions} onChange={setPermissions} />
      <FormActions>
        <Button
          type="primary"
          disabled={isInFlight}
          loading={isInFlight}
          onClick={handleSavePermissions}
        >
          Save Permissions
        </Button>
      </FormActions>
    </DetailView>
  );
};

const Header: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader onEdit={enable} title={name}>
      <RenameRoleDialog
        name={name}
        key={name}
        id={id}
        onClose={disable}
        open={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};
