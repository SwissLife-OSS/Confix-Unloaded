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
import { RemoveGroupDialogMutation } from "./__generated__/RemoveGroupDialogMutation.graphql";

export const RemoveGroupDialog: React.FC<{
  open: boolean;
  onClose: (removed: boolean) => void;
  groupId: string;
  groupName: string;
}> = ({ open, groupId, groupName, onClose }) => {
  const [commit, isInFlight] = useMutation<RemoveGroupDialogMutation>(graphql`
    mutation RemoveGroupDialogMutation(
      $input: RemoveGroupByIdInput!
      $connectionIds: [ID!]!
    ) {
      removeGroupById(input: $input) {
        group {
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

  const connectionId = useConnectionId("Query_searchGroups");

  const handleRemoveGroup = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.removeGroupById.group?.id,
        `Removed ${groupName}`
      ),
      withErrorNotifications((x) => x.removeGroupById?.errors),
      withOnSuccess(
        (x) => x.removeGroupById.group?.id,
        () => onClose(true)
      ),
    ])({
      variables: {
        input: { id: groupId },
        connectionIds: [connectionId],
      },
    });
  }, [commit, groupId, onClose, groupName, connectionId]);

  const handleClose = useCallback(() => onClose(false), [onClose]);

  return (
    <Modal
      title={`Remove ${groupName}`}
      open={open}
      onOk={handleRemoveGroup}
      confirmLoading={isInFlight}
      onCancel={handleClose}
    >
      <Alert
        message="Warning"
        description={`You are about to remove ${groupName}. Are you sure?`}
        type="warning"
        showIcon
      />
    </Modal>
  );
};
