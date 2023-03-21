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
import { useCallback, useState } from "react";

export const RenameGroupDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ open, name, id, onClose }) => {
  const [commit, isInFlight] = useMutation<RenameGroupDialogMutation>(graphql`
    mutation RenameGroupDialogMutation($input: RenameGroupInput!) {
      renameGroup(input: $input) {
        group {
          id
          name
        }
      }
    }
  `);

  const [groupName, setGroupName] = useState(name);

  const handlePartNameChange = useStringEventHanlder(setGroupName);

  const handleRename = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage((x) => x.renameGroup.group?.id, "Renamed Group"),
      withOnSuccess((x) => x.renameGroup.group?.id, onClose),
    ])({ variables: { input: { name: groupName, id } } });
  }, [commit, id, groupName, onClose]);

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
        value={groupName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
