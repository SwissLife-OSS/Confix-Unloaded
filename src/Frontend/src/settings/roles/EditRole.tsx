import { Button, Col, Row } from "antd";
import {
  PermissionsForm,
  mapPermissionsFromObjectType,
  mapPermissionsToInput,
} from "./controls/forms/PermissionForm";
import React, { useState } from "react";
import {
  pipeCommitFn,
  withErrorNotifications,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";

import { DetailView } from "../../shared/DetailView";
import { EditRoleForm_ChangeRolePermissions_Mutation } from "@generated/EditRoleForm_ChangeRolePermissions_Mutation.graphql";
import { EditRoleQuery } from "@generated/EditRoleQuery.graphql";
import { EditRole_Form$key } from "@generated/EditRole_Form.graphql";
import { EditRole_Header$key } from "@generated/EditRole_Header.graphql";
import { EditableBreadcrumbHeader } from "../../shared/EditablePageHeader";
import { FormActions } from "../../shared/FormField";
import { RenameRoleDialog } from "./controls/dialogs/RenameRoleDialog";
import { css } from "@emotion/react";
import { graphql } from "babel-plugin-relay/macro";
import { useHandler } from "../../shared/useHandler";
import { useParams } from "react-router";
import { useToggle } from "../../shared/useToggle";

export const EditRole = () => {
  const { roleId = "" } = useParams();
  const query = useLazyLoadQuery<EditRoleQuery>(
    graphql`
      query EditRoleQuery($id: ID!) {
        roleById(id: $id) {
          id
          ...EditRole_Form
        }
      }
    `,
    {
      id: roleId,
    }
  );

  const id = query.roleById?.id;

  if (!id) {
    return <DetailView style={{ padding: 1 }}>Could not find role </DetailView>;
  }

  return <Form key={id} fragmentRef={query.roleById} />;
};

const Form: React.FC<{
  fragmentRef: EditRole_Form$key;
}> = ({ fragmentRef }) => {
  const data = useFragment(
    graphql`
      fragment EditRole_Form on Role {
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
        ...EditRole_Header
      }
    `,
    fragmentRef
  );

  const [commit, isInFlight] =
    useMutation<EditRoleForm_ChangeRolePermissions_Mutation>(graphql`
      mutation EditRoleForm_ChangeRolePermissions_Mutation(
        $input: ChangeRolePermissionsInput!
      ) {
        changeRolePermissions(input: $input) {
          role {
            id
            ...EditRole_Form
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

  const [permissions, setPermissions] = useState(() =>
    mapPermissionsFromObjectType(data)
  );

  const handleSavePermissions = useHandler(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.changeRolePermissions?.role?.id,
        `Updated permissions of ${data.name}`
      ),
      withErrorNotifications((x) => x.changeRolePermissions?.errors),
    ])({
      variables: {
        input: { id: data.id, permissions: mapPermissionsToInput(permissions) },
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
          <Header fragmentRef={data} />
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

const Header: React.FC<{ fragmentRef: EditRole_Header$key }> = ({
  fragmentRef,
}) => {
  const { name, id } = useFragment(
    graphql`
      fragment EditRole_Header on Role {
        id
        name
      }
    `,
    fragmentRef
  );

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
