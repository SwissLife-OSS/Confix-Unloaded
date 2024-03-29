import {Button, Row, message} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {
  VariableEditorQuery,
  VariableEditorQuery$data,
} from '@generated/VariableEditorQuery.graphql';
import {
  pipeCommitFn,
  withOnCompleted,
  withSuccessMessage,
} from '../../shared/pipeCommitFn';
import {
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
} from 'react-relay';

import {FieldInputGroup} from '../../shared/FormField';
import {QueryOptions} from '../../shared/QueryOptions';
import {VariableEditorDeleteVariableValueMutation} from '@generated/VariableEditorDeleteVariableValueMutation.graphql';
import {VariableEditorSaveVariableMutation} from '@generated/VariableEditorSaveVariableMutation.graphql';
import {VariableEditor_useEnvironments$key} from '@generated/VariableEditor_useEnvironments.graphql';
import {VariableEditor_useEnvironmentsPaginationQuery} from '@generated/VariableEditor_useEnvironmentsPaginationQuery.graphql';
import {graphql} from 'babel-plugin-relay/macro';
import {useStringEventHanlder} from '../../shared/useEventListener';

const variableEditorQuery = graphql`
  query VariableEditorQuery(
    $variableId: ID!
    $scope: VariableValueScopeInput!
  ) {
    variableValues(variableId: $variableId, scope: $scope) {
      id
      application {
        id
        name
      }
      variable {
        id
        name
        isSecret
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
    ...VariableEditor_useEnvironments
  }
`;

export const VariableEditor: React.FC<{
  variableId: string;
  namespace: string;
  applicationId?: string;
  applicationPartId?: string;
  refresh?: () => void;
}> = ({
  variableId,
  namespace,
  applicationId,
  applicationPartId,
  refresh: outerRefresh,
}) => {
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({});
  const data = useLazyLoadQuery<VariableEditorQuery>(
    variableEditorQuery,
    {
      variableId,
      scope: applicationPartId
        ? {
            applicationPart: {partId: applicationPartId},
          }
        : applicationId
        ? {application: {applicationId}}
        : {namespace: {namespace}},
    },
    {fetchPolicy: 'network-only', ...queryOptions},
  );
  const valueByEnv: {
    [key: string]: VariableEditorQuery$data['variableValues'][0];
  } = data.variableValues.reduce(
    (p, c) => ({
      ...p,
      [c.environment?.id ?? '-']: c,
    }),
    {},
  );

  const environments = useEnvironments(data);
  const refresh = useCallback(() => {
    outerRefresh && outerRefresh();
    setQueryOptions((p) => ({
      fetchPolicy: 'store-and-network',
      fetchKey: Number(p?.fetchKey ?? 0) + 1,
    }));
  }, [outerRefresh, setQueryOptions]);

  return (
    <>
      {environments.map((x) => (
        <Row key={x.id}>
          <EnvironementVariableValue
            key={
              (applicationId ?? '-') +
              (applicationPartId ?? '-') +
              x.id +
              variableId
            }
            environment={x}
            value={valueByEnv[x.id]?.value ?? ''}
            valueId={valueByEnv[x.id]?.id}
            isSecret={valueByEnv[x.id]?.variable?.isSecret ?? true}
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
  valueId?: string | undefined,
) => {
  const [commit, isSaving] = useMutation<VariableEditorSaveVariableMutation>(
    variableEditorSaveVariableValue,
  );
  const saveVariable = React.useCallback(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.saveVariableValue.value?.id,
        'Saved Variable',
      ),
      withOnCompleted(() => refresh()),
    ])({
      variables: {
        input: {
          variableId,
          value: value ?? '',
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

  return {saveVariable, isSaving};
};

const useDeleteVariableValue = (
  valueId: string | undefined,
  refresh: () => void,
) => {
  const [commit, isDeleting] =
    useMutation<VariableEditorDeleteVariableValueMutation>(
      variableEditorDeleteVariableValue,
    );
  const deleteVariableValue = React.useCallback(() => {
    if (!valueId) {
      message.error('This variable does not have a value');
      return;
    }

    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.deleteVariableValue.value?.variable?.id,
        'Deleted Variable Value',
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

  return {deleteVariableValue, isDeleting};
};

const EnvironementVariableValue: React.FC<{
  environment: {id: string; name: string};
  variableId: string;
  applicationId?: string;
  applicationPartId?: string;
  isSecret: boolean;
  value: string | undefined;
  valueId: string | undefined;
  refresh: () => void;
}> = ({
  variableId,
  applicationId,
  applicationPartId,
  isSecret,
  value: defaultValue,
  valueId,
  environment,
  refresh,
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = useStringEventHanlder(setValue);
  const {isDeleting, deleteVariableValue} = useDeleteVariableValue(
    valueId,
    refresh,
  );
  const {isSaving, saveVariable} = useSaveVariable(
    environment.id,
    variableId,
    refresh,
    applicationId,
    applicationPartId,
    value,
    valueId,
  );

  // reset the input when the variable is changed from the outside
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <FieldInputGroup
      label={environment.name}
      value={value}
      type={isSecret ? 'password' : 'text'}
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

const useEnvironments = (
  dataRef: VariableEditor_useEnvironments$key,
): {id: string; name: string}[] => {
  const {data: connection} = usePaginationFragment<
    VariableEditor_useEnvironmentsPaginationQuery,
    VariableEditor_useEnvironments$key
  >(
    graphql`
      fragment VariableEditor_useEnvironments on Query
      @argumentDefinitions(
        count: {type: "Int", defaultValue: 50}
        cursor: {type: "String"}
      )
      @refetchable(queryName: "VariableEditor_useEnvironmentsPaginationQuery") {
        searchEnvironments(after: $cursor, first: $count)
          @connection(
            key: "VariableEditor_useEnvironments_searchEnvironments"
          ) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    dataRef,
  );

  return connection?.searchEnvironments?.edges?.map((x) => x.node) ?? [];
};
