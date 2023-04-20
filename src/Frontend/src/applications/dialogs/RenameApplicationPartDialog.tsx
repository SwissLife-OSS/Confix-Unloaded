import * as React from "react";

import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { useCallback, useState } from "react";

import { FieldInput } from "../../shared/FormField";
import { Modal } from "antd";
import { RenameApplicationPartDialogMutation } from "@generated/RenameApplicationPartDialogMutation.graphql";
import { graphql } from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { useStringEventHanlder } from "../../shared/useEventListener";

export const RenameApplicationPartDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  applicationPartName: string;
  applicationPartId: string;
}> = ({ open, applicationPartName, applicationPartId, onClose }) => {
  const [commit, isInFlight] = useMutation<RenameApplicationPartDialogMutation>(
    graphql`
      mutation RenameApplicationPartDialogMutation(
        $input: RenameApplicationPartInput!
      ) {
        renameApplicationPart(input: $input) {
          applicationPart {
            ...EditApplicationPart
            application {
              id
              ...ApplicationsListItem
            }
          }
          errors {
            ... on UserError {
              message
              code
            }
          }
        }
      }
    `
  );

  const [applicationName, setApplicationPartName] =
    useState(applicationPartName);
  const handlePartNameChange = useStringEventHanlder(setApplicationPartName);
  const handleRename = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.renameApplicationPart.applicationPart?.application?.id,
        "Renamed ApplicationPart"
      ),
      withErrorNotifications((x) => x.renameApplicationPart?.errors),
      withOnSuccess(
        (x) => x.renameApplicationPart.applicationPart?.application?.id,
        onClose
      ),
    ])({
      variables: {
        input: { name: applicationName, applicationPartId: applicationPartId },
      },
    });
  }, [commit, applicationPartId, applicationName, onClose]);

  return (
    <Modal
      title={`Rename ApplicationPart ${applicationPartName}`}
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
