import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { useCallback, useState } from "react";
import { Modal } from "antd";
import { useStringEventHanlder } from "../../shared/useEventListener";
import { FieldInput } from "../../shared/FormField";
import { RenameApplicationDialogMutation } from "./__generated__/RenameApplicationDialogMutation.graphql";

const renameApplicationMutation = graphql`
  mutation RenameApplicationDialogMutation($input: RenameApplicationInput!) {
    renameApplication(input: $input) {
      application {
        id
        ...ApplicationsList_applicationsEdge
      }
      errors {
        ... on UserError {
          message
          code
        }
      }
    }
  }
`;

export const RenameApplicationDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ open, name, id, onClose }) => {
  const [commit, isInFlight] = useMutation<RenameApplicationDialogMutation>(
    renameApplicationMutation
  );
  const [applicationName, setApplicationName] = useState(name);
  const handlePartNameChange = useStringEventHanlder(setApplicationName);
  const handleRename = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.renameApplication.application?.id,
        "Renamed Application"
      ),
      withErrorNotifications((x) => x.renameApplication?.errors),
      withOnSuccess((x) => x.renameApplication.application?.id, onClose),
    ])({ variables: { input: { name: applicationName, id } } });
  }, [commit, id, applicationName, onClose]);
  return (
    <Modal
      title={`Rename Application ${name}`}
      open={open}
      onOk={handleRename}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <FieldInput
        label="New Name"
        value={applicationName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
