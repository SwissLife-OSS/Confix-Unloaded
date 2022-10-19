import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Modal } from "antd";
import { RenameGroupDialogMutation } from "./__generated__/RenameGroupDialogMutation.graphql";
import { FieldInput } from "../../../../shared/FormField";
import {
  pipeCommitFn,
  withSuccessMessage,
  withOnSuccess,
} from "../../../../shared/pipeCommitFn";
import { useStringEventHanlder } from "../../../../shared/useEventListener";

const renameGroupMutation = graphql`
  mutation RenameGroupDialogMutation($input: RenameGroupInput!) {
    renameGroup(input: $input) {
      group {
        id
        ...GroupsList_GroupEdge
      }
    }
  }
`;

export const RenameGroupDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ open, name, id, onClose }) => {
  const [commit, isInFlight] =
    useMutation<RenameGroupDialogMutation>(renameGroupMutation);
  const [GroupName, setGroupName] = React.useState(name);
  const handlePartNameChange = useStringEventHanlder(setGroupName);
  const handleRename = React.useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage((x) => x.renameGroup.group?.id, "Renamed Group"),
      withOnSuccess((x) => x.renameGroup.group?.id, onClose),
    ])({ variables: { input: { name: GroupName, id } } });
  }, [commit, id, GroupName, onClose]);
  return (
    <Modal
      title={`Rename Group ${name}`}
      open={open}
      onOk={handleRename}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <FieldInput
        label="New Name"
        value={GroupName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
