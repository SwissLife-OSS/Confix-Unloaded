import * as React from "react";
import { useFragment, useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Modal } from "antd";
import {
  pipeCommitFn,
  withSuccessMessage,
  withOnSuccess,
} from "../../../shared/pipeCommitFn";
import { ChangeComponentScopeDialogMutation } from "./__generated__/ChangeComponentScopeDialogMutation.graphql";
import { ApplicationCascader } from "../../../applications/components/ApplicationCascader";
import { ChangeComponentScopeDialog$key } from "./__generated__/ChangeComponentScopeDialog.graphql";
import { withSilentSuspense } from "../../../shared/withSilentSuspense";

type Result = [string] | [string, string] | [string, string, string];

export const ChangeComponentScopeDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  scopes: Result[];
  id: string;
  fragmentRef: ChangeComponentScopeDialog$key;
}> = withSilentSuspense(
  ({ fragmentRef, open, id, scopes: initialScopes, onClose }) => {
    const [commit, isInFlight] =
      useMutation<ChangeComponentScopeDialogMutation>(
        graphql`
          mutation ChangeComponentScopeDialogMutation(
            $input: UpdateComponentScopesInput!
          ) {
            updateComponentScopes(input: $input) {
              component {
                id
                name
                scopes {
                  namespace
                  applicationId
                  applicationPartId
                  application {
                    id
                    name
                  }
                  applicationPart {
                    id
                    name
                  }
                }
              }
            }
          }
        `
      );

    const data = useFragment(
      graphql`
        fragment ChangeComponentScopeDialog on Query
        @argumentDefinitions(search: { type: "String", defaultValue: null }) {
          ...ApplicationCascader @arguments(search: $search)
        }
      `,
      fragmentRef
    );

    const [scopes, setScope] = React.useState<Result[]>(initialScopes);
    const handleRename = React.useCallback(() => {
      pipeCommitFn(commit, [
        withSuccessMessage(
          (x) => x.updateComponentScopes.component?.id,
          "Changes scopes of component"
        ),
        withOnSuccess((x) => x.updateComponentScopes.component?.id, onClose),
      ])({
        variables: {
          input: {
            id,
            scopes: scopes.map((x) => {
              return {
                namespace: x[0],
                applicationId: x[1],
                applicationPartId: x[2],
              };
            }),
          },
        },
      });
    }, [commit, id, onClose, scopes]);
    return (
      <Modal
        title={`Change component scope`}
        open={open}
        onOk={handleRename}
        confirmLoading={isInFlight}
        onCancel={onClose}
      >
        <ApplicationCascader
          fragmentRef={data}
          onChange={setScope}
          value={scopes}
        />
      </Modal>
    );
  }
);
