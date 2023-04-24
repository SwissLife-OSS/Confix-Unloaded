import * as React from "react";

import {
  pipeCommitFn,
  withOnSuccess,
  withSuccessMessage,
} from "../../../shared/pipeCommitFn";
import { useCallback, useState } from "react";

import { FieldInput } from "../../../shared/FormField";
import { Modal } from "antd";
import { RenameVariableDialogMutation } from "@generated/RenameVariableDialogMutation.graphql";
import { graphql } from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { useStringEventHanlder } from "../../../shared/useEventListener";

export const RenameVariableDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ open, name, id, onClose }) => {
  const [commit, isInFlight] = useMutation<RenameVariableDialogMutation>(
    graphql`
      mutation RenameVariableDialogMutation($input: RenameVariableInput!) {
        renameVariable(input: $input) {
          variable {
            id
            name
          }
        }
      }
    `
  );
  const [variableName, setVariableName] = useState(name);

  const handlePartNameChange = useStringEventHanlder(setVariableName);

  const handleRename = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.renameVariable.variable?.id,
        "Renamed Variable"
      ),
      withOnSuccess((x) => x.renameVariable.variable?.id, onClose),
    ])({ variables: { input: { name: variableName, id } } });
  }, [commit, id, variableName, onClose]);

  return (
    <Modal
      title={`Rename Variable ${name}`}
      open={open}
      onOk={handleRename}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <FieldInput
        label="New Name"
        value={variableName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
