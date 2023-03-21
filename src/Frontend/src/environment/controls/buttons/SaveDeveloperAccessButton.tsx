import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { SaveDeveloperAccessButtonMutation } from "./__generated__/SaveDeveloperAccessButtonMutation.graphql";
import { Button } from "antd";
import { pipeCommitFn, withSuccessMessage } from "../../../shared/pipeCommitFn";

export const SaveDeveloperAccessButton: React.FC<{
  isAllowed: boolean;
  environmentId: string;
}> = ({ isAllowed, environmentId }) => {
  const [commit, isInFlight] = useMutation<SaveDeveloperAccessButtonMutation>(
    graphql`
      mutation SaveDeveloperAccessButtonMutation(
        $input: SetDeveloperAccessOfEnvironmentInput!
      ) {
        setDeveloperAccessOfEnvironment(input: $input) {
          environment {
            id
            allowDeveloperAccess
          }
          errors {
            ... on EnvironmentNotFoundError {
              environmentId
              code
              message
            }
            ... on UnauthorizedOperationError {
              code
              message
            }
            ... on UserError {
              code
              message
            }
          }
        }
      }
    `
  );

  const handleSave = React.useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.setDeveloperAccessOfEnvironment.environment?.id,
        "Saved Developer Access"
      ),
    ])({
      variables: {
        input: {
          isAllowed,
          environmentId,
        },
      },
    });
  }, [commit, environmentId, isAllowed]);

  return (
    <Button onClick={handleSave} loading={isInFlight} disabled={isInFlight}>
      Save
    </Button>
  );
};
