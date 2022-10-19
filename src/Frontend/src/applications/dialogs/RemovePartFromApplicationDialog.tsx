import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { useCallback } from "react";
import { Alert, Modal } from "antd";
import { RemovePartFromApplicationDialogMutation } from "./__generated__/RemovePartFromApplicationDialogMutation.graphql";

export const removePartFromApplicationDialog = graphql`
  mutation RemovePartFromApplicationDialogMutation(
    $input: RemoveApplicationPartInput!
  ) {
    removeApplicationPart(input: $input) {
      application {
        id
        ...ApplicationsList_applicationsEdge
        ...EditApplication_Application_Fragment
      }
      errors {
        __typename
        ... on IUserError {
          message
          code
        }
      }
    }
  }
`;

export const RemovePartFromApplicationDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  applicationPartId: string;
  applicationPartName: string;
}> = ({ open, applicationPartId, applicationPartName, onClose }) => {
  const [commit, isInFlight] =
    useMutation<RemovePartFromApplicationDialogMutation>(
      removePartFromApplicationDialog
    );
  const handleAddApplication = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.removeApplicationPart.application?.id,
        `Removed ${applicationPartName}`
      ),
      withErrorNotifications((x) => x.removeApplicationPart?.errors),
      withOnSuccess((x) => x.removeApplicationPart.application?.id, onClose),
    ])({ variables: { input: { applicationPartId } } });
  }, [commit, applicationPartId, onClose, applicationPartName]);
  return (
    <Modal
      title={`Remove ${applicationPartName}`}
      open={open}
      onOk={handleAddApplication}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <Alert
        message="Warning"
        description={`You are about to remove ${applicationPartName}. Are you sure?`}
        type="warning"
        showIcon
      />
    </Modal>
  );
};
