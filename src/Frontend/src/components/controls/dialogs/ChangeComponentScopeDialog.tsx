import * as React from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Modal } from "antd";
import { FieldInput } from "../../../shared/FormField";
import {
  pipeCommitFn,
  withSuccessMessage,
  withOnSuccess,
} from "../../../shared/pipeCommitFn";
import { useStringEventHanlder } from "../../../shared/useEventListener";
import { ChangeComponentScopeDialog_Query } from "./__generated__/ChangeComponentScopeDialog_Query.graphql";
import { ChangeComponentScopeDialogMutation } from "./__generated__/ChangeComponentScopeDialogMutation.graphql";

export const ChangeComponentScopeDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({ open, name, id, onClose }) => {
  const [commit, isInFlight] = useMutation<ChangeComponentScopeDialogMutation>(
    graphql`
      mutation ChangeComponentScopeDialogMutation(
        $input: UpdateComponentScopesInput!
      ) {
        updateComponentScopes(input: $input) {
          component {
            id
            ...ComponentsList_componentEdge
          }
        }
      }
    `
  );
  const data = useLazyLoadQuery<ChangeComponentScopeDialog_Query>(
    graphql`
      query ChangeComponentScopeDialog_Query($search: String) {
        ...ApplicationCascader_Data @arguments(search: $search)
      }
    `,
    {}
  );
  const [componentName, setComponentName] = React.useState(name);
  const handlePartNameChange = useStringEventHanlder(setComponentName);
  const handleRename = React.useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.renameComponent.component?.id,
        "Renamed Component"
      ),
      withOnSuccess((x) => x.renameComponent.component?.id, onClose),
    ])({ variables: { input: { name: componentName, id } } });
  }, [commit, id, componentName, onClose]);
  return (
    <Modal
      title={`Rename Component ${name}`}
      open={open}
      onOk={handleRename}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <FieldInput
        label="New Name"
        value={componentName}
        onChange={handlePartNameChange}
      />
    </Modal>
  );
};
