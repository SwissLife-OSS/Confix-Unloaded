import * as React from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Modal } from "antd";
import { Field } from "../../../shared/FormField";
import {
  pipeCommitFn,
  withSuccessMessage,
  withOnSuccess,
  withErrorNotifications,
} from "../../../shared/pipeCommitFn";
import { SetParentEnvironmentDialogMutation } from "./__generated__/SetParentEnvironmentDialogMutation.graphql";
import { EnvironmentsSelect } from "../EnvironmentsSelect";

const setParentMutation = graphql`
  mutation SetParentEnvironmentDialogMutation(
    $input: SetParentOfEnvironmentInput!
  ) {
    setParentOfEnvironment(input: $input) {
      environment {
        id
        ...EditEnvironment_Environment
      }
      errors {
        ... on EnvironmentCycleDetectedError {
          path
          code
          message
        }
        ... on EnvironmentNotFoundError {
          environmentId
          code
          message
        }
      }
    }
  }
`;

export const SetParentEnvironmentDialog: React.FC<{
  visible: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ visible, name, id, onClose }) => {
  const [commit, isInFlight] =
    useMutation<SetParentEnvironmentDialogMutation>(setParentMutation);
  const [parent, setParent] = React.useState<string>();
  const handleSetParent = React.useCallback(() => {
    if (!parent) {
      return;
    }
    pipeCommitFn(commit, [
      withErrorNotifications((x) => x.setParentOfEnvironment.errors),
      withSuccessMessage(
        (x) => x.setParentOfEnvironment.environment?.id,
        "SetParentd Environment"
      ),
      withOnSuccess((x) => x.setParentOfEnvironment.environment?.id, onClose),
    ])({ variables: { input: { parentId: parent, environmentId: id } } });
  }, [commit, id, parent, onClose]);
  return (
    <Modal
      title={`SetParent Environment ${name}`}
      visible={visible}
      onOk={handleSetParent}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <Field name={"Parent"} label={"Parent"}>
        <EnvironmentsSelect onChange={(v) => setParent(v.value)} value={""} />
      </Field>
    </Modal>
  );
};