import * as React from 'react';

import {Alert, Modal} from 'antd';
import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from '../../../shared/pipeCommitFn';

import {RemoveEnvironmentDialogMutation} from '@generated/RemoveEnvironmentDialogMutation.graphql';
import {graphql} from 'babel-plugin-relay/macro';
import {useCallback} from 'react';
import {useConnectionId} from '../../../shared/useConnectionId';
import {useMutation} from 'react-relay';

export const RemoveEnvironmentDialog: React.FC<{
  open: boolean;
  onClose: (removed: boolean) => void;
  environmentId: string;
  environmentName: string;
}> = ({open, environmentId, environmentName, onClose}) => {
  const [commit, isInFlight] = useMutation<RemoveEnvironmentDialogMutation>(
    graphql`
      mutation RemoveEnvironmentDialogMutation(
        $input: RemoveEnvironmentByIdInput!
        $connectionIds: [ID!]!
      ) {
        removeEnvironmentById(input: $input) {
          environment {
            id @deleteEdge(connections: $connectionIds)
            name
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
    `,
  );

  const connectionId = useConnectionId('Query_searchEnvironments');

  const handleRemoveEnvironment = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.removeEnvironmentById.environment?.id,
        `Removed ${environmentName}`,
      ),
      withErrorNotifications((x) => x.removeEnvironmentById?.errors),
      withOnSuccess(
        (x) => x.removeEnvironmentById.environment?.id,
        () => onClose(true),
      ),
    ])({
      variables: {
        input: {id: environmentId},
        connectionIds: [connectionId],
      },
    });
  }, [commit, environmentId, onClose, environmentName, connectionId]);

  const handleClose = useCallback(() => onClose(false), [onClose]);

  return (
    <Modal
      title={`Remove ${environmentName}`}
      open={open}
      onOk={handleRemoveEnvironment}
      confirmLoading={isInFlight}
      onCancel={handleClose}
    >
      <Alert
        message="Warning"
        description={`You are about to remove ${environmentName}. Are you sure?`}
        type="warning"
        showIcon
      />
    </Modal>
  );
};
