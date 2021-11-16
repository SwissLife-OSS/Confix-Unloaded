import { useMutation } from "react-relay";
import {
  pipeCommitFn,
  withErrorNotifications,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { EditablePageHeader } from "../../shared/EditablePageHeader";
import { EditApplicationHeaderMutation } from "./__generated__/EditApplicationHeaderMutation.graphql";

const renameApplicationMutation = graphql`
  mutation EditApplicationHeaderMutation($input: RenameApplicationInput!) {
    renameApplication(input: $input) {
      application {
        id
        ...ApplicationsList_applicationsEdge
      }
      errors {
        ... on IUserError {
          message
          code
        }
      }
    }
  }
`;

export const EditApplicationHeader: React.FC<{
  name: string;
  id: string;
}> = ({ name, id, children }) => {
  const [commit, isInFlight] = useMutation<EditApplicationHeaderMutation>(
    renameApplicationMutation
  );
  const handleRename = useCallback(
    (name) => {
      pipeCommitFn(commit, [
        withSuccessMessage(
          (x) => x.renameApplication.application?.id,
          "Renamed Application"
        ),
        withErrorNotifications((x) => x.renameApplication?.errors),
      ])({ variables: { input: { name, id } } });
    },
    [commit, id]
  );
  return (
    <EditablePageHeader value={name} loading={isInFlight} onSave={handleRename}>
      {children}
    </EditablePageHeader>
  );
};
