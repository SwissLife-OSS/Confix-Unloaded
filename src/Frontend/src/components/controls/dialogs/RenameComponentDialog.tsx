import * as React from 'react';

import {
  pipeCommitFn,
  withOnSuccess,
  withSuccessMessage,
} from '../../../shared/pipeCommitFn';

import {FieldInput} from '../../../shared/FormField';
import {Modal} from 'antd';
import {RenameComponentDialogMutation} from '@generated/RenameComponentDialogMutation.graphql';
import {graphql} from 'babel-plugin-relay/macro';
import {useMutation} from 'react-relay';
import {useStringEventHanlder} from '../../../shared/useEventListener';

export const RenameComponentDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({open, name, id, onClose}) => {
  const [commit, isInFlight] = useMutation<RenameComponentDialogMutation>(
    graphql`
      mutation RenameComponentDialogMutation($input: RenameComponentInput!) {
        renameComponent(input: $input) {
          component {
            id
            name
          }
        }
      }
    `,
  );

  const [componentName, setComponentName] = React.useState(name);

  const handlePartNameChange = useStringEventHanlder(setComponentName);
  const handleRename = React.useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.renameComponent.component?.id,
        'Renamed Component',
      ),
      withOnSuccess((x) => x.renameComponent.component?.id, onClose),
    ])({variables: {input: {name: componentName, id}}});
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
