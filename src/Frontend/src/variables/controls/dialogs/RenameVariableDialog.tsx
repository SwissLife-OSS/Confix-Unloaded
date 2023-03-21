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
import { RenameVariableDialogMutation } from "./__generated__/RenameVariableDialogMutation.graphql";
import { useCallback, useState } from "react";

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
