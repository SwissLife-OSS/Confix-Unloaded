import * as React from 'react';

import {
  ComponentOption,
  ComponentsSelect,
} from '../../components/controls/ComponentsSelect';
import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from '../../shared/pipeCommitFn';
import {useCallback, useState} from 'react';
import {useFragment, useMutation} from 'react-relay';

import {AddComponentsToApplicationPartDialog$key} from '@generated/AddComponentsToApplicationPartDialog.graphql';
import {AddComponentsToApplicationPartDialogMutation} from '@generated/AddComponentsToApplicationPartDialogMutation.graphql';
import {Modal} from 'antd';
import {graphql} from 'babel-plugin-relay/macro';

export const AddComponentsToApplicationPartDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  fragmentRef: AddComponentsToApplicationPartDialog$key;
}> = ({open, fragmentRef: data, onClose}) => {
  const {application, ...applicationPart} = useFragment(
    graphql`
      fragment AddComponentsToApplicationPartDialog on ApplicationPart {
        id
        name
        application {
          id
          namespace
        }
      }
    `,
    data,
  );

  const [commit, isInFlight] =
    useMutation<AddComponentsToApplicationPartDialogMutation>(
      graphql`
        mutation AddComponentsToApplicationPartDialogMutation(
          $input: AddComponentsToApplicationPartInput!
        ) {
          addComponentsToApplicationPart(input: $input) {
            applicationPart {
              application {
                id
                ...ApplicationsListItem
                ...EditApplication
              }
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
      `,
    );

  const [options, setOptions] = useState<ComponentOption[]>([]);
  const handleAddParts = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) =>
          x.addComponentsToApplicationPart.applicationPart?.application?.id,
        `Added components to ${applicationPart.name}`,
      ),
      withErrorNotifications((x) => x.addComponentsToApplicationPart?.errors),
      withOnSuccess(
        (x) =>
          x.addComponentsToApplicationPart.applicationPart?.application?.id,
        onClose,
      ),
    ])({
      variables: {
        input: {
          applicationPartId: applicationPart.id,
          componentIds: options.map((x) => x.value),
        },
      },
    });
  }, [commit, options, onClose, applicationPart.id, applicationPart.name]);

  if (!application) {
    throw new Error(
      'Application part {applicationPartId} does not have an application',
    );
  }

  return (
    <Modal
      title={`Add Components to ${applicationPart.name}`}
      open={open}
      onOk={handleAddParts}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      <ComponentsSelect
        onChange={setOptions}
        filter={{
          applicationId: application.id,
          applicationPartId: applicationPart.id,
          namespace: application.namespace,
        }}
      />
    </Modal>
  );
};
