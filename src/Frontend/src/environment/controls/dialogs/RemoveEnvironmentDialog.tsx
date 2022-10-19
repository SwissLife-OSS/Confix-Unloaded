import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { Alert, Modal } from "antd";
import { useConnectionId } from "../../../shared/useConnectionId";
import {
  pipeCommitFn,
  withSuccessMessage,
  withErrorNotifications,
  withOnSuccess,
} from "../../../shared/pipeCommitFn";
import { RemoveEnvironmentDialogMutation } from "./__generated__/RemoveEnvironmentDialogMutation.graphql";

export const removeEnvironmentDialog = graphql`
  mutation RemoveEnvironmentDialogMutation(
    $input: RemoveEnvironmentByIdInput!
    $connectionIds: [ID!]!
  ) {
    removeEnvironmentById(input: $input) {
      environment {
        id @deleteEdge(connections: $connectionIds)
        ...EnvironmentsList_EnvironmentEdge
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
`;

export const RemoveEnvironmentDialog: React.FC<{
  open: boolean;
  onClose: (removed: boolean) => void;
  environmentId: string;
  environmentName: string;
}> = ({ open, environmentId, environmentName, onClose }) => {
  const [commit, isInFlight] = useMutation<RemoveEnvironmentDialogMutation>(
    removeEnvironmentDialog
  );
  const connectionId = useConnectionId("Query_searchEnvironments");
  const handleRemoveEnvironment = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.removeEnvironmentById.environment?.id,
        `Removed ${environmentName}`
      ),
      withErrorNotifications((x) => x.removeEnvironmentById?.errors),
      withOnSuccess(
        (x) => x.removeEnvironmentById.environment?.id,
        () => onClose(true)
      ),
    ])({
      variables: {
        input: { id: environmentId },
        connectionIds: [connectionId],
      },
    });
  }, [commit, environmentId, onClose, environmentName, connectionId]);
  const handleClose = useCallback(() => {
    onClose(false);
  }, [onClose]);
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
