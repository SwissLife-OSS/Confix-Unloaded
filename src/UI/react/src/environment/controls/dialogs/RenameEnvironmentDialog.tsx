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
import { RenameEnvironmentDialogMutation } from "./__generated__/RenameEnvironmentDialogMutation.graphql";

const renameEnvironmentMutation = graphql`
  mutation RenameEnvironmentDialogMutation($input: RenameEnvironmentInput!) {
    renameEnvironment(input: $input) {
      environment {
        id
        ...EnvironmentsList_EnvironmentEdge
      }
    }
  }
`;

export const RenameEnvironmentDialog: React.FC<{
  visible: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ visible, name, id, onClose }) => {
  const [commit, isInFlight] = useMutation<RenameEnvironmentDialogMutation>(
    renameEnvironmentMutation
  );
  const [EnvironmentName, setEnvironmentName] = React.useState(name);
  const handlePartNameChange = useStringEventHanlder(setEnvironmentName);
  const handleRename = React.useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.renameEnvironment.environment?.id,
        "Renamed Environment"
      ),
      withOnSuccess((x) => x.renameEnvironment.environment?.id, onClose),
    ])({ variables: { input: { name: EnvironmentName, id } } });
  }, [commit, id, EnvironmentName, onClose]);
  return (
    <Modal
      title={`Rename Environment ${name}`}
      visible={visible}
      onOk={handleRename}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <FieldInput
        label="New Name"
        value={EnvironmentName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
