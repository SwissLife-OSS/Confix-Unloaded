import {
  fetchQuery,
  useFragment,
  useLazyLoadQuery,
  useRelayEnvironment,
} from "react-relay";
import { Col, Descriptions, Empty, Row, Select, Spin, Tabs } from "antd";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { EditVariableQuery } from "./__generated__/EditVariableQuery.graphql";
import { EditableBreadcrumbHeader } from "../shared/EditablePageHeader";
import { useToggle } from "../shared/useToggle";
import { RenameVariableDialog } from "./controls/dialogs/RenameVariableDialog";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EditVariable_Variable$key } from "./__generated__/EditVariable_Variable.graphql";
import { css } from "@emotion/react";
import { CheckIcon, NotCheckIcon } from "../icons/icons";
import { Field } from "../shared/FormField";
import { useDebounce } from "../shared/debounce";
import { EditVariableApplicationsQuery } from "./__generated__/EditVariableApplicationsQuery.graphql";
import { ApplicationsList_applicationsEdge$key } from "../applications/__generated__/ApplicationsList_applicationsEdge.graphql";
import { applicationFragment } from "../applications/ApplicationsList";
import { useMultiplexer } from "../shared/useMultiplexer";
import { VariableEditor } from "./controls/VariableEditor";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { useParams } from "react-router";
import { TabRow } from "../shared/TabRow";
import { useTabSwitcher } from "../shared/useTabSwitcher";
import { ChangeLog } from "../shared/ChangeLog";

const variableByIdQuery = graphql`
  query EditVariableQuery($id: ID!) {
    variable(id: $id) {
      id
      name
      namespace
      ...EditVariable_Variable
    }
  }
`;

const editVariableFragment = graphql`
  fragment EditVariable_Variable on Variable {
    id
    name
    namespace
    isSecret
    state
    values {
      application {
        id
      }
      applicationPart {
        id
      }
      id
      value
    }
    changeLog {
      ...ChangeLog_fragment
    }
  }
`;

export const EditVariable = () => {
  const { variableId = "" } = useParams();
  const { variable } = useLazyLoadQuery<EditVariableQuery>(variableByIdQuery, {
    id: variableId,
  });
  const { tab, navigateToTab } = useTabSwitcher();
  const id = variable?.id;
  if (!id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find Variable</DetailView>
    );
  }
  return (
    <DetailView
      style={{ padding: 1 }}
      css={css`
        padding: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      <Row>
        <Col xs={24}>
          <Header namespace={variable.namespace} name={variable.name} id={id} />
        </Col>
      </Row>

      <TabRow>
        <Tabs
          defaultActiveKey={tab}
          key={tab}
          onChange={navigateToTab}
          items={[
            {
              key: "edit",
              label: "Edit",
              children: <EditVariableForm id={id} data={variable} />,
            },
            {
              key: "changelog",
              label: "Change Log",
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
  data: NonNullable<EditVariableQuery["response"]["variable"]>;
}> = ({ data, id }) => {
  const { name, namespace, isSecret } = useFragment<EditVariable_Variable$key>(
    editVariableFragment,
    data
  );
  const [application, setSelectedApplication] = useState<ApplicationOption>();
  const [applicationPart, setApplicationPart] =
    useState<ApplicationPartOption>();
  const handleApplicationChange = useMultiplexer(
    [setSelectedApplication, () => setApplicationPart(undefined)],
    [setSelectedApplication, setApplicationPart]
  );

  return (
    <DetailView
      style={{ padding: 1 }}
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
        applicationOption={application}
        applicationPartOption={applicationPart}
        variableId={id}
      />
    </DetailView>
  );
};

const nullWhenGlobal = (val?: string | "__global"): string | undefined =>
  !val || val === "__global" ? undefined : val;

export const VariableEditorOrPlaceholder: React.FC<{
  variableId?: string;
  applicationOption?: ApplicationOption;
  applicationPartOption?: ApplicationPartOption;
}> = ({ variableId, applicationOption, applicationPartOption }) => {
  if (variableId && applicationOption && applicationPartOption) {
    return (
      <DefaultSuspense>
        <VariableEditor
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
}> = ({ name, namespace, id }) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader
      onEdit={enable}
      title={name}
      breadcrumbs={[
        {
          text: namespace ?? "-",
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

const applicationsQuery = graphql`
  query EditVariableApplicationsQuery(
    $cursor: String
    $count: Int
    $where: ApplicationFilterInput
  ) {
    applications(after: $cursor, first: $count, where: $where)
      @connection(key: "Query_applications") {
      edges {
        node {
          id
          name
          ...ApplicationsList_applicationsEdge
        }
      }
    }
  }
`;
export type ApplicationOption = {
  label: string;
  value: string;
  edge?: ApplicationsList_applicationsEdge$key & { id: string };
};

const globalOption: ApplicationOption = {
  label: "Global",
  value: "__global",
  edge: undefined,
};

const ApplicationSelector: React.FC<{
  onChange: (id?: ApplicationOption) => void;
  value?: ApplicationOption;
}> = ({ onChange, value }) => {
  const [options, setOptions] = useState<ApplicationOption[]>([]);
  const [isLoading, setIsLoading] = useState(options.length === 0);
  const env = useRelayEnvironment();

  const fetchData = useCallback(
    async (search: string) => {
      setIsLoading(true);
      const data = await fetchQuery<EditVariableApplicationsQuery>(
        env,
        applicationsQuery,
        {
          where: !search
            ? null
            : {
                or: [
                  { namespace: { contains: search } },
                  { name: { contains: search } },
                ],
              },
        }
      ).toPromise();
      setOptions(
        data?.applications?.edges?.map((x) => ({
          value: x.node.id,
          edge: x.node,
          label: x.node.name,
        })) ?? []
      );
      setIsLoading(false);
    },
    [env]
  );

  const debouncedSearch = useDebounce((search: string) => {
    fetchData(search);
  }, 500);

  const handleChange = useCallback(
    (ids: ApplicationOption[], t: any) => {
      onChange(t);
      fetchData("");
    },
    [onChange, fetchData]
  );

  // initial data fetch
  useEffect(() => {
    fetchData("");
  }, [fetchData]);

  const optionsWithGlobal = useMemo(
    () => [globalOption, ...options],
    [options]
  );

  return (
    <Field label="Application">
      <Select<ApplicationOption[]>
        allowClear
        labelInValue
        style={{ width: "100%" }}
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
}> = ({ onChange, application, value }) => {
  const data = useFragment<ApplicationsList_applicationsEdge$key>(
    applicationFragment,
    application?.edge ?? null
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
          name: y.definition.name,
          label: y.definition.name,
          value: y.id,
        })),
      })) ?? []
    );
  }, [data]);

  const handleChange = useCallback(
    (ids: ApplicationPartOption[], t: any) => {
      onChange(t);
    },
    [onChange]
  );

  const optionsWithGlobal = useMemo(
    () => [globalOption, ...options],
    [options]
  );

  return (
    <Field label="Application Part">
      <Select<ApplicationPartOption[]>
        allowClear
        labelInValue
        style={{ width: "100%" }}
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
  data: EditVariable_Variable$key;
}> = ({ data }) => {
  const { changeLog } = useFragment<EditVariable_Variable$key>(
    editVariableFragment,
    data
  );

  return <ChangeLog data={changeLog} />;
};
