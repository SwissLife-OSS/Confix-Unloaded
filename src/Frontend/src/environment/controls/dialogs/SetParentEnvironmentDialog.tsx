import * as React from 'react';

import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from '../../../shared/pipeCommitFn';

import {EnvironmentsSelect} from '../EnvironmentsSelect';
import {Field} from '../../../shared/FormField';
import {Modal} from 'antd';
import {SetParentEnvironmentDialogMutation} from '@generated/SetParentEnvironmentDialogMutation.graphql';
import {graphql} from 'babel-plugin-relay/macro';
import {useMutation} from 'react-relay';

const setParentMutation = graphql`
  mutation SetParentEnvironmentDialogMutation(
    $input: SetParentOfEnvironmentInput!
  ) {
    setParentOfEnvironment(input: $input) {
      environment {
        id
        parent {
          id
          name
        }
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
  open: boolean;
  onClose: () => void;
  name: string;
  id: string;
}> = ({open, name, id, onClose}) => {
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
        'SetParentd Environment',
      ),
      withOnSuccess((x) => x.setParentOfEnvironment.environment?.id, onClose),
    ])({variables: {input: {parentId: parent, environmentId: id}}});
  }, [commit, id, parent, onClose]);

  return (
    <Modal
      title={`SetParent Environment ${name}`}
      open={open}
      onOk={handleSetParent}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <Field name={'Parent'} label={'Parent'}>
        <EnvironmentsSelect onChange={(v) => setParent(v.value)} value={''} />
      </Field>
    </Modal>
  );
};
