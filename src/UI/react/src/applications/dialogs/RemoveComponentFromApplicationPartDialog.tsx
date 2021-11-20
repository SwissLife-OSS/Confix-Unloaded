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
import { RemoveComponentFromApplicationPartDialogMutation } from "./__generated__/RemoveComponentFromApplicationPartDialogMutation.graphql";

export const removeComponentFromApplicationPartDialog = graphql`
  mutation RemoveComponentFromApplicationPartDialogMutation(
    $input: RemoveComponentFromApplicationPartInput!
  ) {
    removeComponentFromApplicationPart(input: $input) {
      applicationPart {
        id
        ...EditApplicationPart_fragment
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

export const RemoveComponentFromApplicationPartDialog: React.FC<{
  visible: boolean;
  onClose: () => void;
  componentName: string;
  partComponentId: string;
}> = ({ visible, partComponentId, componentName, onClose }) => {
  const [commit, isInFlight] =
    useMutation<RemoveComponentFromApplicationPartDialogMutation>(
      removeComponentFromApplicationPartDialog
    );
  const handleAddApplication = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.removeComponentFromApplicationPart.applicationPart?.id,
        `Removed ${componentName}`
      ),
      withErrorNotifications(
        (x) => x.removeComponentFromApplicationPart?.errors
      ),
      withOnSuccess(
        (x) => x.removeComponentFromApplicationPart.applicationPart?.id,
        onClose
      ),
    ])({ variables: { input: { partComponentId } } });
  }, [commit, onClose, componentName, partComponentId]);
  return (
    <Modal
      title={`Remove ${componentName}`}
      visible={visible}
      onOk={handleAddApplication}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <Alert
        message="Warning"
        description={`You are about to remove ${componentName}. Are you sure?`}
        type="warning"
        showIcon
      />
    </Modal>
  );
};
