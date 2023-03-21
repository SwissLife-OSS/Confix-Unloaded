import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Modal } from "antd";
import { RenameRoleDialogMutation } from "./__generated__/RenameRoleDialogMutation.graphql";
import { FieldInput } from "../../../../shared/FormField";
import {
  pipeCommitFn,
  withSuccessMessage,
  withOnSuccess,
} from "../../../../shared/pipeCommitFn";
import { useStringEventHanlder } from "../../../../shared/useEventListener";
import { useCallback, useState } from "react";

export const RenameRoleDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ open, name, id, onClose }) => {
  const [commit, isInFlight] = useMutation<RenameRoleDialogMutation>(graphql`
    mutation RenameRoleDialogMutation($input: RenameRoleInput!) {
      renameRole(input: $input) {
        role {
          id
          name
        }
      }
    }
  `);
  const [roleName, setRoleName] = useState(name);

  const handlePartNameChange = useStringEventHanlder(setRoleName);
  const handleRename = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage((x) => x.renameRole.role?.id, "Renamed Role"),
      withOnSuccess((x) => x.renameRole.role?.id, onClose),
    ])({ variables: { input: { name: roleName, id } } });
  }, [commit, id, roleName, onClose]);
  return (
    <Modal
      title={`Rename Role ${name}`}
      open={open}
      onOk={handleRename}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <FieldInput
        label="New Name"
        value={roleName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
