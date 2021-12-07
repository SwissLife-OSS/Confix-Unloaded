import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Modal } from "antd";
import { FieldInput } from "../../../shared/FormField";
import {
  pipeCommitFn,
  withSuccessMessage,
  withErrorNotifications,
  withOnSuccess,
} from "../../../shared/pipeCommitFn";
import { useStringEventHanlder } from "../../../shared/useEventListener";
import { RenameVariableDialogMutation } from "./__generated__/RenameVariableDialogMutation.graphql";

const renameVariableMutation = graphql`
  mutation RenameVariableDialogMutation($input: RenameVariableInput!) {
    renameVariable(input: $input) {
      variable {
        id
        ...VariablesList_VariableEdge
      }
    }
  }
`;

export const RenameVariableDialog: React.FC<{
  visible: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ visible, name, id, onClose }) => {
  const [commit, isInFlight] = useMutation<RenameVariableDialogMutation>(
    renameVariableMutation
  );
  const [VariableName, setVariableName] = React.useState(name);
  const handlePartNameChange = useStringEventHanlder(setVariableName);
  const handleRename = React.useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.renameVariable.variable?.id,
        "Renamed Variable"
      ),
      withOnSuccess((x) => x.renameVariable.variable?.id, onClose),
    ])({ variables: { input: { name: VariableName, id } } });
  }, [commit, id, VariableName, onClose]);
  return (
    <Modal
      title={`Rename Variable ${name}`}
      visible={visible}
      onOk={handleRename}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <FieldInput
        label="New Name"
        value={VariableName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
