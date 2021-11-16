import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { useCallback, useState } from "react";
import { Modal } from "antd";
import { useStringEventHanlder } from "../../shared/useEventListener";
import { FieldInput } from "../../shared/FormField";
import { AddPartToApplicationDialogMutation } from "./__generated__/AddPartToApplicationDialogMutation.graphql";

export const addPartToApplicationMutation = graphql`
  mutation AddPartToApplicationDialogMutation(
    $input: AddPartToApplicationInput!
  ) {
    addPartToApplication(input: $input) {
      application {
        id
        ...ApplicationsList_applicationsEdge
        ...EditApplication_Application_Fragment
      }
      errors {
        __typename
        ... on IUserError {
          message
          code
        }
      }
    }
  }
`;

export const AddPartToApplicationDialog: React.FC<{
  visible: boolean;
  onClose: () => void;
  applicationName: string;
  applicationId: string;
}> = ({ visible, applicationId, applicationName, onClose }) => {
  const [commit, isInFlight] = useMutation<AddPartToApplicationDialogMutation>(
    addPartToApplicationMutation
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
      visible={visible}
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
