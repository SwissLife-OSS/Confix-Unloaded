import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Modal } from "antd";
import { FieldInput } from "../../../shared/FormField";
import {
  pipeCommitFn,
  withSuccessMessage,
  withOnSuccess,
} from "../../../shared/pipeCommitFn";
import { useStringEventHanlder } from "../../../shared/useEventListener";
import { RenameEnvironmentDialogMutation } from "./__generated__/RenameEnvironmentDialogMutation.graphql";
import { useCallback, useState } from "react";

export const RenameEnvironmentDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ open, name, id, onClose }) => {
  const [commit, isInFlight] = useMutation<RenameEnvironmentDialogMutation>(
    graphql`
      mutation RenameEnvironmentDialogMutation(
        $input: RenameEnvironmentInput!
      ) {
        renameEnvironment(input: $input) {
          environment {
            id
            name
          }
        }
      }
    `
  );
  const [environmentName, setEnvironmentName] = useState(name);

  const handlePartNameChange = useStringEventHanlder(setEnvironmentName);
  const handleRename = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.renameEnvironment.environment?.id,
        "Renamed Environment"
      ),
      withOnSuccess((x) => x.renameEnvironment.environment?.id, onClose),
    ])({ variables: { input: { name: environmentName, id } } });
  }, [commit, id, environmentName, onClose]);

  return (
    <Modal
      title={`Rename Environment ${name}`}
      open={open}
      onOk={handleRename}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <FieldInput
        label="New Name"
        value={environmentName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
