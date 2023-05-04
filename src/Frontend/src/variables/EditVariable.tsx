import {CheckIcon, NotCheckIcon} from '../icons/icons';
import {Col, Descriptions, Empty, Row, Select, Spin, Tabs} from 'antd';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  useFragment,
  useLazyLoadQuery,
  useRefetchableFragment,
} from 'react-relay';

import {ChangeLog} from '../shared/ChangeLog';
import {DefaultSuspense} from '../shared/DefaultSuspense';
import {DetailView} from '../shared/DetailView';
import {EditVariable$key} from '@generated/EditVariable.graphql';
import {EditVariableQuery} from '@generated/EditVariableQuery.graphql';
import {EditVariable_ApplicationPartSelector$key} from '@generated/EditVariable_ApplicationPartSelector.graphql';
import {EditVariable_ApplicationSelector$key} from '@generated/EditVariable_ApplicationSelector.graphql';
import {EditVariable_ApplicationSelector_Query} from '@generated/EditVariable_ApplicationSelector_Query.graphql';
import {EditVariable_EditVariableForm$key} from '@generated/EditVariable_EditVariableForm.graphql';
import {EditVariable_VariableChangeLog$key} from '@generated/EditVariable_VariableChangeLog.graphql';
import {EditableBreadcrumbHeader} from '../shared/EditablePageHeader';
import {Field} from '../shared/FormField';
import {RenameVariableDialog} from './controls/dialogs/RenameVariableDialog';
import {TabRow} from '../shared/TabRow';
import {VariableEditor} from './controls/VariableEditor';
import {css} from '@emotion/react';
import {graphql} from 'babel-plugin-relay/macro';
import {useDebounce} from '../shared/debounce';
import {useMultiplexer} from '../shared/useMultiplexer';
import {useParams} from 'react-router';
import {useTabSwitcher} from '../shared/useTabSwitcher';
import {useToggle} from '../shared/useToggle';

export const EditVariable = () => {
  const {variableId = ''} = useParams();
  const query = useLazyLoadQuery<EditVariableQuery>(
    graphql`
      query EditVariableQuery($id: ID!) {
        variable(id: $id) {
          ...EditVariable
        }
        ...EditVariable_ApplicationSelector @defer
      }
    `,
    {
      id: variableId,
    },
  );
  const variable = useFragment<EditVariable$key>(
    graphql`
      fragment EditVariable on Variable {
        id
        name
        namespace
        ...EditVariable_EditVariableForm
        ...EditVariable_VariableChangeLog
      }
    `,
    query.variable,
  );

  const {tab, navigateToTab} = useTabSwitcher();

  if (!variable?.id) {
    return (
      <DetailView style={{padding: 1}}>Coult not find Variable</DetailView>
    );
  }

  const {id, name, namespace} = variable;

  return (
    <DetailView
      style={{padding: 1}}
      css={css`
        padding: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      <Row>
        <Col xs={24}>
          <Header namespace={namespace} name={name} id={id} />
        </Col>
      </Row>

      <TabRow>
        <Tabs
          defaultActiveKey={tab}
          key={tab}
          onChange={navigateToTab}
          items={[
            {
              key: 'edit',
              label: 'Edit',
              children: (
                <EditVariableForm id={id} data={variable} query={query} />
              ),
            },
            {
              key: 'changelog',
              label: 'Change Log',
              children: (
                <DefaultSuspense>
                  <VariableChangeLog data={variable} />
                </DefaultSuspense>
              ),
            },
          ]}
        />
      </TabRow>
    </DetailView>
  );
};

const EditVariableForm: React.FC<{
  id: string;
  data: EditVariable_EditVariableForm$key;
  query: EditVariable_ApplicationSelector$key;
}> = ({data, id, query}) => {
  const {name, namespace, isSecret} = useFragment(
    graphql`
      fragment EditVariable_EditVariableForm on Variable {
        name
        namespace
        isSecret
      }
    `,
    data,
  );
  const [application, setSelectedApplication] = useState<ApplicationOption>();
  const [applicationPart, setApplicationPart] =
    useState<ApplicationPartOption>();
  const handleApplicationChange = useMultiplexer(
    [setSelectedApplication, () => setApplicationPart(undefined)],
    [setSelectedApplication, setApplicationPart],
  );

  return (
    <DetailView
      style={{padding: 1}}
      css={css`
        padding: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      <Row>
        <Descriptions>
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Namespace">{namespace}</Descriptions.Item>
          <Descriptions.Item label="Is Secret">
            {isSecret ? <CheckIcon /> : <NotCheckIcon />}
          </Descriptions.Item>
        </Descriptions>
      </Row>
      <Row>
        <ApplicationSelector
          query={query}
          onChange={handleApplicationChange}
          value={application}
        />
      </Row>
      <Row>
        <ApplicationPartSelector
          onChange={setApplicationPart}
          application={application}
          value={applicationPart}
        />
      </Row>
      <VariableEditorOrPlaceholder
        key={id}
        namespace={namespace}
        applicationOption={application}
        applicationPartOption={applicationPart}
        variableId={id}
      />
    </DetailView>
  );
};

const nullWhenGlobal = (val?: string | '__global'): string | undefined =>
  !val || val === '__global' ? undefined : val;

export const VariableEditorOrPlaceholder: React.FC<{
  namespace: string;
  variableId?: string;
  applicationOption?: ApplicationOption;
  applicationPartOption?: ApplicationPartOption;
}> = ({namespace, variableId, applicationOption, applicationPartOption}) => {
  if (variableId && applicationOption && applicationPartOption) {
    return (
      <DefaultSuspense>
        <VariableEditor
          namespace={namespace}
          variableId={variableId}
          applicationId={nullWhenGlobal(applicationOption?.edge?.id)}
          applicationPartId={nullWhenGlobal(applicationPartOption.id)}
        />
      </DefaultSuspense>
    );
  }
  return (
    <Row>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Select a application part first"
      />
    </Row>
  );
};

const Header: React.FC<{
  name: string;
  namespace: string | null;
  id: string;
}> = ({name, namespace, id}) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader
      onEdit={enable}
      title={name}
      breadcrumbs={[
        {
          text: namespace ?? '-',
        },
      ]}
    >
      <RenameVariableDialog
        name={name}
        key={name}
        id={id}
        onClose={disable}
        open={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};

export type ApplicationOption = {
  label: string;
  value: string;
  edge?: EditVariable_ApplicationPartSelector$key & {id: string};
};

const globalOption: ApplicationOption = {
  label: 'Global',
  value: '__global',
  edge: undefined,
};

const ApplicationSelector: React.FC<{
  query: EditVariable_ApplicationSelector$key;
  onChange: (id?: ApplicationOption) => void;
  value?: ApplicationOption;
}> = ({onChange, value, query}) => {
  const [options, setOptions] = useState<ApplicationOption[]>([]);
  const [isLoading, setIsLoading] = useState(options.length === 0);

  const [data, refetch] = useRefetchableFragment<
    EditVariable_ApplicationSelector_Query,
    EditVariable_ApplicationSelector$key
  >(
    graphql`
      fragment EditVariable_ApplicationSelector on Query
      @refetchable(queryName: "EditVariable_ApplicationSelector_Query")
      @argumentDefinitions(
        cursor: {type: "String"}
        count: {type: "Int", defaultValue: 20}
        search: {type: "String"}
      ) {
        applications(after: $cursor, first: $count, search: $search)
          @connection(key: "Query_applications") {
          edges {
            node {
              id
              name
              ...EditVariable_ApplicationPartSelector
            }
          }
        }
      }
    `,
    query,
  );

  const fetchData = useCallback(
    async (search: string) => {
      setIsLoading(true);
      refetch({
        search,
      });
      setOptions(
        data?.applications?.edges?.map((x) => ({
          value: x.node.id,
          edge: x.node,
          label: x.node.name,
        })) ?? [],
      );
      setIsLoading(false);
    },
    [data, refetch],
  );

  const debouncedSearch = useDebounce((search: string) => {
    fetchData(search);
  }, 500);

  const handleChange = useCallback(
    (ids: ApplicationOption[], t: any) => {
      onChange(t);
      fetchData('');
    },
    [onChange, fetchData],
  );

  // initial data fetch
  useEffect(() => {
    fetchData('');
  }, [fetchData]);

  const optionsWithGlobal = useMemo(
    () => [globalOption, ...options],
    [options],
  );

  return (
    <Field label="Application">
      <Select<ApplicationOption[]>
        allowClear
        labelInValue
        style={{width: '100%'}}
        value={value ? [value] : []}
        placeholder="Please select"
        filterOption={false}
        onChange={handleChange}
        notFoundContent={isLoading ? <Spin size="small" /> : null}
        onSearch={debouncedSearch}
        showArrow
        options={optionsWithGlobal}
      />
    </Field>
  );
};

type ApplicationPartOption = {
  id: string;
  name: string;
  label: string;
  value: string;
};

const ApplicationPartSelector: React.FC<{
  application?: ApplicationOption;
  onChange: (id?: ApplicationPartOption) => void;
  value?: ApplicationPartOption;
}> = ({onChange, application, value}) => {
  const data = useFragment<EditVariable_ApplicationPartSelector$key>(
    graphql`
      fragment EditVariable_ApplicationPartSelector on Application {
        id
        parts {
          id
          name
          components {
            id
            definition {
              name
            }
          }
        }
      }
    `,
    application?.edge ?? null,
  );

  const options: ApplicationPartOption[] = useMemo(() => {
    return (
      data?.parts.map((x) => ({
        id: x.id,
        name: x.name,
        label: x.name,
        value: x.id,
        components: x.components.map((y) => ({
          id: y.id,
          name: y.definition?.name,
          label: y.definition?.name,
          value: y.id,
        })),
      })) ?? []
    );
  }, [data]);

  const handleChange = useCallback(
    (ids: ApplicationPartOption[], t: any) => {
      onChange(t);
    },
    [onChange],
  );

  const optionsWithGlobal = useMemo(
    () => [globalOption, ...options],
    [options],
  );

  return (
    <Field label="Application Part">
      <Select<ApplicationPartOption[]>
        allowClear
        labelInValue
        style={{width: '100%'}}
        placeholder="Please select"
        filterOption={false}
        value={value ? [value] : []}
        onChange={handleChange}
        showArrow
        options={optionsWithGlobal}
      />
    </Field>
  );
};

const VariableChangeLog: React.FC<{
  data: EditVariable_VariableChangeLog$key;
}> = ({data}) => {
  const {changeLog} = useFragment(
    graphql`
      fragment EditVariable_VariableChangeLog on Variable {
        changeLog {
          ...ChangeLog
        }
      }
    `,
    data,
  );

  return <ChangeLog data={changeLog} />;
};
