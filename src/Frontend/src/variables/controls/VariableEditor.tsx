import { Button, message, Row } from "antd";
import { graphql } from "babel-plugin-relay/macro";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { useEnvironments } from "../../environment/data/useEnvironments";
import { FieldInputGroup } from "../../shared/FormField";
import {
  pipeCommitFn,
  withOnCompleted,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { QueryOptions } from "../../shared/QueryOptions";
import { useStringEventHanlder } from "../../shared/useEventListener";
import { VariableEditorDeleteVariableValueMutation } from "./__generated__/VariableEditorDeleteVariableValueMutation.graphql";
import {
  VariableEditorQuery,
  VariableEditorQuery$data,
} from "./__generated__/VariableEditorQuery.graphql";
import { VariableEditorSaveVariableMutation } from "./__generated__/VariableEditorSaveVariableMutation.graphql";

const variableEditorQuery = graphql`
  query VariableEditorQuery(
    $variableId: ID!
    $applicationId: ID
    $applicationPartId: ID
  ) {
    variableValues(
      variableId: $variableId
      applicationId: $applicationId
      applicationPartId: $applicationPartId
    ) {
      id
      application {
        id
        name
      }
      variable {
        id
        name
      }
      environment {
        id
        name
      }
      applicationPart {
        id
        name
      }
      value
    }
  }
`;

export const VariableEditor: React.FC<{
  variableId: string;
  applicationId?: string;
  applicationPartId?: string;
  refresh?: () => void;
}> = ({
  variableId,
  applicationId,
  applicationPartId,
  refresh: outerRefresh,
}) => {
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({});
  const data = useLazyLoadQuery<VariableEditorQuery>(
    variableEditorQuery,
    {
      variableId,
      applicationId,
      applicationPartId,
    },
    { fetchPolicy: "network-only", ...queryOptions }
  );
  const valueByEnv: Record<
    string,
    VariableEditorQuery$data["variableValues"][0]
  > = data.variableValues.reduce(
    (p, c) => ({
      ...p,
      [c.environment?.id ?? "-"]: c,
    }),
    {}
  );
  const environments = useEnvironments();
  const refresh = useCallback(() => {
    outerRefresh && outerRefresh();
    setQueryOptions((p) => ({
      fetchPolicy: "store-and-network",
      fetchKey: Number(p?.fetchKey ?? 0) + 1,
    }));
  }, [outerRefresh, setQueryOptions]);

  return (
    <>
      {environments.map((x) => (
        <Row key={x.id}>
          <EnvironementVariableValue
            key={
              (applicationId ?? "-") +
              (applicationPartId ?? "-") +
              x.id +
              variableId
            }
            environment={x}
            value={valueByEnv[x.id]?.value ?? ""}
            valueId={valueByEnv[x.id]?.id}
            applicationId={applicationId}
            applicationPartId={applicationPartId}
            variableId={variableId}
            refresh={refresh}
          />
        </Row>
      ))}
    </>
  );
};

const variableEditorSaveVariableValue = graphql`
  mutation VariableEditorSaveVariableMutation($input: SaveVariableValueInput!) {
    saveVariableValue(input: $input) {
      value {
        id
        value
      }
    }
  }
`;

const variableEditorDeleteVariableValue = graphql`
  mutation VariableEditorDeleteVariableValueMutation(
    $input: DeleteVariableValueInput!
  ) {
    deleteVariableValue(input: $input) {
      value {
        variable {
          id
          values {
            id
            value
          }
        }
      }
    }
  }
`;

const useSaveVariable = (
  environmentId: string,
  variableId: string,
  refresh: () => void,
  applicationId?: string,
  applicationPartId?: string,
  value?: string | undefined,
  valueId?: string | undefined
) => {
  const [commit, isSaving] = useMutation<VariableEditorSaveVariableMutation>(
    variableEditorSaveVariableValue
  );
  const saveVariable = React.useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.saveVariableValue.value?.id,
        "Saved Variable"
      ),
      withOnCompleted(() => refresh()),
    ])({
      variables: {
        input: {
          variableId,
          value: value ?? "",
          valueId,
          applicationId: applicationId,
          partId: applicationPartId,
          environmentId: environmentId,
        },
      },
    });
  }, [
    applicationId,
    applicationPartId,
    commit,
    environmentId,
    refresh,
    value,
    valueId,
    variableId,
  ]);

  return { saveVariable, isSaving };
};

const useDeleteVariableValue = (
  valueId: string | undefined,
  refresh: () => void
) => {
  const [commit, isDeleting] =
    useMutation<VariableEditorDeleteVariableValueMutation>(
      variableEditorDeleteVariableValue
    );
  const deleteVariableValue = React.useCallback(() => {
    if (!valueId) {
      message.error("This variable does not have a value");
      return;
    }

    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.deleteVariableValue.value?.variable?.id,
        "Deleted Variable Value"
      ),
      withOnCompleted(() => refresh()),
    ])({
      variables: {
        input: {
          id: valueId,
        },
      },
    });
  }, [commit, refresh, valueId]);

  return { deleteVariableValue, isDeleting };
};

const EnvironementVariableValue: React.FC<{
  environment: { id: string; name: string };
  variableId: string;
  applicationId?: string;
  applicationPartId?: string;
  value: string | undefined;
  valueId: string | undefined;
  refresh: () => void;
}> = ({
  variableId,
  applicationId,
  applicationPartId,
  value: defaultValue,
  valueId,
  environment,
  refresh,
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = useStringEventHanlder(setValue);
  const { isDeleting, deleteVariableValue } = useDeleteVariableValue(
    valueId,
    refresh
  );
  const { isSaving, saveVariable } = useSaveVariable(
    environment.id,
    variableId,
    refresh,
    applicationId,
    applicationPartId,
    value,
    valueId
  );

  // reset the input when the variable is changed from the outside
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <FieldInputGroup
      label={environment.name}
      value={value}
      onChange={handleChange}
      allowClear
    >
      {defaultValue && (
        <Button loading={isDeleting} onClick={deleteVariableValue}>
          Clear
        </Button>
      )}
      <Button loading={isSaving} onClick={saveVariable}>
        Save
      </Button>
    </FieldInputGroup>
  );
};
