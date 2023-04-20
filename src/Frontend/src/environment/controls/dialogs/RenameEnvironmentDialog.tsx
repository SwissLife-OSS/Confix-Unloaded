import * as React from "react";

import {
  pipeCommitFn,
  withOnSuccess,
  withSuccessMessage,
} from "../../../shared/pipeCommitFn";
import { useCallback, useState } from "react";

import { FieldInput } from "../../../shared/FormField";
import { Modal } from "antd";
import { RenameEnvironmentDialogMutation } from "@generated/RenameEnvironmentDialogMutation.graphql";
import { graphql } from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { useStringEventHanlder } from "../../../shared/useEventListener";

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
