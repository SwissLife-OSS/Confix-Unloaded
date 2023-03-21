import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { Alert, Modal } from "antd";
import {
  pipeCommitFn,
  withSuccessMessage,
  withErrorNotifications,
  withOnSuccess,
} from "../../../../shared/pipeCommitFn";
import { useConnectionId } from "../../../../shared/useConnectionId";
import { RemoveApiKeyDialogMutation } from "./__generated__/RemoveApiKeyDialogMutation.graphql";

export const RemoveApiKeyDialog: React.FC<{
  open: boolean;
  onClose: (removed: boolean) => void;
  keyId: string;
  keyName: string;
}> = ({ open, keyId, keyName, onClose }) => {
  const [commit, isInFlight] = useMutation<RemoveApiKeyDialogMutation>(graphql`
    mutation RemoveApiKeyDialogMutation(
      $input: RemoveApiKeyByIdInput!
      $connectionIds: [ID!]!
    ) {
      removeApiKeyById(input: $input) {
        apiKey {
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

  const connectionId = useConnectionId("Query__apiKeys");

  const handleRemoveApiKey = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.removeApiKeyById.apiKey?.id,
        `Removed ${keyName}`
      ),
      withErrorNotifications((x) => x.removeApiKeyById?.errors),
      withOnSuccess(
        (x) => x.removeApiKeyById.apiKey?.id,
        () => onClose(true)
      ),
    ])({
      variables: {
        input: { id: keyId },
        connectionIds: [connectionId],
      },
    });
  }, [commit, keyId, onClose, keyName, connectionId]);

  const handleClose = useCallback(() => onClose(false), [onClose]);

  return (
    <Modal
      title={`Remove ${keyName}`}
      open={open}
      onOk={handleRemoveApiKey}
      confirmLoading={isInFlight}
      onCancel={handleClose}
    >
      <Alert
        message="Warning"
        description={`You are about to remove ${keyName}. Are you sure?`}
        type="warning"
        showIcon
      />
    </Modal>
  );
};
