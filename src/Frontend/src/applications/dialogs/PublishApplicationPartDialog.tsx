import * as React from 'react';

import {
  pipeCommitFn,
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from '../../shared/pipeCommitFn';

import {Modal} from 'antd';
import {PublishApplicationPartDialogMutation} from '@generated/PublishApplicationPartDialogMutation.graphql';
import {graphql} from 'babel-plugin-relay/macro';
import {useCallback} from 'react';
import {useMutation} from 'react-relay';

export const PublishApplicationPartDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  applicationPartName: string;
  applicationPartId: string;
}> = ({open, applicationPartId, applicationPartName, onClose}) => {
  const [commit, isInFlight] =
    useMutation<PublishApplicationPartDialogMutation>(
      graphql`
        mutation PublishApplicationPartDialogMutation(
          $input: PublishApplicationPartByIdInput!
        ) {
          publishApplicationPartById(input: $input) {
            publishedApplicationPart {
              id
              version
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

  const handlePublish = useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.publishApplicationPartById.publishedApplicationPart?.id,
        `Published ${applicationPartName}`,
      ),
      withErrorNotifications((x) => x.publishApplicationPartById.errors),
      withOnSuccess(
        (x) => x.publishApplicationPartById.publishedApplicationPart?.id,
        onClose,
      ),
    ])({
      variables: {
        input: {applicationPartId},
      },
    });
  }, [commit, onClose, applicationPartId, applicationPartName]);

  return (
    <Modal
      title={`Publish ${applicationPartName}`}
      open={open}
      onOk={handlePublish}
      confirmLoading={isInFlight}
      onCancel={onClose}
    >
      Do you want to publish {applicationPartName}?
    </Modal>
  );
};
