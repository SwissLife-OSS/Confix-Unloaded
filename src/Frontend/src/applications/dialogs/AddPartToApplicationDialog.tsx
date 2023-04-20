import * as React from "react";

import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { useCallback, useState } from "react";

import { AddPartToApplicationDialogMutation } from "@generated/AddPartToApplicationDialogMutation.graphql";
import { FieldInput } from "../../shared/FormField";
import { Modal } from "antd";
import { graphql } from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { useStringEventHanlder } from "../../shared/useEventListener";

export const AddPartToApplicationDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  applicationName: string;
  applicationId: string;
}> = ({ open, applicationId, applicationName, onClose }) => {
  const [commit, isInFlight] = useMutation<AddPartToApplicationDialogMutation>(
    graphql`
      mutation AddPartToApplicationDialogMutation(
        $input: AddPartToApplicationInput!
      ) {
        addPartToApplication(input: $input) {
          application {
            id
            ...ApplicationsListItem
            ...EditApplication
          }
          errors {
            __typename
            ... on UserError {
              message
              code
            }
          }
        }
      }
    `
  );

  const [partName, setPartName] = useState("");

  const handlePartNameChange = useStringEventHanlder(setPartName);
  const handleAddApplication = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.addPartToApplication.application?.id,
        `Added ${partName} to ${applicationName}`
      ),
      withErrorNotifications((x) => x.addPartToApplication?.errors),
      withOnSuccess((x) => x.addPartToApplication.application?.id, onClose),
    ])({ variables: { input: { partName, applicationId } } });
  }, [commit, partName, applicationId, onClose, applicationName]);

  return (
    <Modal
      title={`Add Application Part to ${applicationName}`}
      open={open}
      onOk={handleAddApplication}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <FieldInput
        label="Part Name"
        value={partName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
