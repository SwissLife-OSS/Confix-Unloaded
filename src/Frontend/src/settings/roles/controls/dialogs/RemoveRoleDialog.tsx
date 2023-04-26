import * as React from 'react';

import {Alert, Modal} from 'antd';
import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from '../../../../shared/pipeCommitFn';

import {RemoveRoleDialogMutation} from '@generated/RemoveRoleDialogMutation.graphql';
import {graphql} from 'babel-plugin-relay/macro';
import {useCallback} from 'react';
import {useConnectionId} from '../../../../shared/useConnectionId';
import {useMutation} from 'react-relay';

export const RemoveRoleDialog: React.FC<{
  open: boolean;
  onClose: (removed: boolean) => void;
  roleId: string;
  roleName: string;
}> = ({open, roleId, roleName, onClose}) => {
  const [commit, isInFlight] = useMutation<RemoveRoleDialogMutation>(graphql`
    mutation RemoveRoleDialogMutation(
      $input: RemoveRoleByIdInput!
      $connectionIds: [ID!]!
    ) {
      removeRoleById(input: $input) {
        role {
          id @deleteEdge(connections: $connectionIds)
        }
        errors {
          __typename
          ... on UserError {
            message
            code
          }
        }
      }
    }
  `);

  const connectionId = useConnectionId('Query_searchRoles');

  const handleRemoveRole = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.removeRoleById.role?.id,
        `Removed ${roleName}`,
      ),
      withErrorNotifications((x) => x.removeRoleById?.errors),
      withOnSuccess(
        (x) => x.removeRoleById.role?.id,
        () => onClose(true),
      ),
    ])({
      variables: {
        input: {id: roleId},
        connectionIds: [connectionId],
      },
    });
  }, [commit, roleId, onClose, roleName, connectionId]);

  const handleClose = useCallback(() => onClose(false), [onClose]);

  return (
    <Modal
      title={`Remove ${roleName}`}
      open={open}
      onOk={handleRemoveRole}
      confirmLoading={isInFlight}
      onCancel={handleClose}
    >
      <Alert
        message="Warning"
        description={`You are about to remove ${roleName}. Are you sure?`}
        type="warning"
        showIcon
      />
    </Modal>
  );
};
