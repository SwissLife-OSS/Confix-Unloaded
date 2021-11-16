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
import { AddComponentsToApplicationPartDialogMutation } from "./__generated__/AddComponentsToApplicationPartDialogMutation.graphql";
import {
  ComponentOption,
  ComponentsSelect,
} from "../../components/controls/ComponentsSelect";

export const addComponentsToApplicationPartMutation = graphql`
  mutation AddComponentsToApplicationPartDialogMutation(
    $input: AddComponentsToApplicationPartInput!
  ) {
    addComponentsToApplicationPart(input: $input) {
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

export const AddComponentsToApplicationPartDialog: React.FC<{
  visible: boolean;
  onClose: () => void;
  applicationPartName: string;
  applicationPartId: string;
}> = ({ visible, applicationPartId, applicationPartName, onClose }) => {
  const [commit, isInFlight] =
    useMutation<AddComponentsToApplicationPartDialogMutation>(
      addComponentsToApplicationPartMutation
    );
  const [options, setOptions] = useState<ComponentOption[]>([]);
  const handleAddParts = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.addComponentsToApplicationPart.application?.id,
        `Added components to ${applicationPartName}`
      ),
      withErrorNotifications((x) => x.addComponentsToApplicationPart?.errors),
      withOnSuccess(
        (x) => x.addComponentsToApplicationPart.application?.id,
        onClose
      ),
    ])({
      variables: {
        input: { applicationPartId, componentIds: options.map((x) => x.value) },
      },
    });
  }, [commit, options, onClose, applicationPartId, applicationPartName]);
  return (
    <Modal
      title={`Add Components to ${applicationPartName}`}
      visible={visible}
      onOk={handleAddParts}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <ComponentsSelect onChange={setOptions} />
    </Modal>
  );
};
