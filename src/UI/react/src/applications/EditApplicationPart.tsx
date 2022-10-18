import * as React from "react";
import {
  useFragment,
  useLazyLoadQuery,
  useRefetchableFragment,
} from "react-relay";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { useParams } from "react-router";
import { EditApplicationPart_GetById_Query } from "./__generated__/EditApplicationPart_GetById_Query.graphql";
import { Col, Empty, Row, Tabs, Typography } from "antd";
import {
  EditableBreadcrumbHeader,
  HeaderButton,
} from "../shared/EditablePageHeader";
import { PublishIcon } from "../icons/icons";
import { useToggle } from "../shared/useToggle";
import {
  EditApplicationPart_fragment$data,
  EditApplicationPart_fragment$key,
} from "./__generated__/EditApplicationPart_fragment.graphql";
import { RenameApplicationPartDialog } from "./dialogs/RenameApplicationPartDialog";
import {
  VariableOption,
  VariablesSelect,
} from "../variables/controls/VariableSelect";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { useCallback, useEffect, useState } from "react";
import { VariableEditor } from "../variables/controls/VariableEditor";
import { EditApplicationPartRefetchPartQuery } from "./__generated__/EditApplicationPartRefetchPartQuery.graphql";
import { VariableValueList } from "../variables/controls/VariableValueList";
import { useSilentRefresh } from "../shared/useDefaultRefetch";
import { useLocation } from "react-router-dom";
import { EditApplicationPart_VariableValues_Fragment$key } from "./__generated__/EditApplicationPart_VariableValues_Fragment.graphql";
import { useTabSwitcher } from "../shared/useTabSwitcher";
import { PublishApplicationPartDialog } from "./dialogs/PublishApplicationPartDialog";
import { EditApplicationPart_DeployedEnvironment_Fragment$key } from "./__generated__/EditApplicationPart_DeployedEnvironment_Fragment.graphql";
import { DeployedEnvironmentsOverview } from "./components/DeployedEnvironmentsOverview";
import {
  Title,
  ApplicationPartChangeLog,
} from "./components/ApplicationPartChangeLog";
import { ApplicationPartComponents } from "./components/ApplicationPartComponents";
import { PublishedApplicationParts } from "./components/PublishedApplicationParts";

const applicationByIdQuery = graphql`
  query EditApplicationPart_GetById_Query($id: ID!) {
    applicationPartById(id: $id) {
      id
      ...EditApplicationPart_fragment
    }
  }
`;

const applicationPartfragment = graphql`
  fragment EditApplicationPart_fragment on ApplicationPart
  @refetchable(queryName: "EditApplicationPartRefetchPartQuery") {
    id
    name
    application {
      id
      namespace
      name
    }
    components {
      id
      definition {
        id
      }
      ...ApplicationPartComponents_component
    }
    ...EditApplicationPart_VariableValues_Fragment @defer
    ...ApplicationPartChangeLog_ChangeLog_Fragment @defer
    ...EditApplicationPart_DeployedEnvironment_Fragment @defer
    ...PublishedApplicationPartsFragment
  }
`;

const applicationDeployedEnvironmentPart = graphql`
  fragment EditApplicationPart_DeployedEnvironment_Fragment on ApplicationPart {
    deployments {
      nodes {
        ...DeployedEnvironmentsOverviewFragment
      }
    }
  }
`;

const applicationVariableValuesFragment = graphql`
  fragment EditApplicationPart_VariableValues_Fragment on ApplicationPart {
    variableValues {
      ...VariableValueList_values
    }
  }
`;

export const EditApplicationPart = () => {
  const { applicationId = "", id: applicationPartId = "" } = useParams();
  const variables = { id: applicationPartId };
  const { tab, navigateToTab } = useTabSwitcher();
  const data = useLazyLoadQuery<EditApplicationPart_GetById_Query>(
    applicationByIdQuery,
    variables
  );
  const [applicationPartById, refetch] = useRefetchableFragment<
    EditApplicationPartRefetchPartQuery,
    EditApplicationPart_fragment$key
  >(applicationPartfragment, data.applicationPartById);

  const { refresh } = useSilentRefresh(
    applicationByIdQuery,
    refetch,
    variables
  );

  if (!applicationPartById) {
    return (
      <DetailView style={{ padding: 1 }}>
        Coult not find application part
      </DetailView>
    );
  }
  const {
    id,
    components,
    name: applicationPartName,
    application,
  } = applicationPartById;

  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <Header
            applicationPartId={id}
            applicationName={application?.name ?? ""}
            applicationPartName={applicationPartName}
            namespace={application?.namespace ?? ""}
            id={id}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Tabs
            defaultActiveKey={tab}
            key={tab}
            onChange={navigateToTab}
            items={[
              {
                key: "edit",
                label: "Overview",
                children: (
                  <>
                    <Title>
                      <h3>Deployments</h3>
                    </Title>
                    <DeployedEnvironments data={applicationPartById} />
                    <Title>
                      <h3>Components</h3>
                    </Title>
                    <ApplicationPartComponents
                      applicationId={applicationId}
                      components={components}
                    />
                  </>
                ),
              },
              {
                key: "variables",
                label: "Variables",
                children: (
                  <DefaultSuspense>
                    <Variables data={applicationPartById} refetch={refresh} />
                  </DefaultSuspense>
                ),
              },
              {
                key: "publish_log",
                label: "Publish Log",
                children: (
                  <DefaultSuspense>
                    <PublishedApplicationParts data={applicationPartById} />
                  </DefaultSuspense>
                ),
              },
              {
                key: "changelog",
                label: "Change Log",
                children: (
                  <DefaultSuspense>
                    <ApplicationPartChangeLog data={applicationPartById} />
                  </DefaultSuspense>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </DetailView>
  );
};

const Variables: React.FC<{
  data: EditApplicationPart_fragment$data;
  refetch: () => void;
}> = ({ data, refetch }) => {
  const { variableValues } =
    useFragment<EditApplicationPart_VariableValues_Fragment$key>(
      applicationVariableValuesFragment,
      data
    );
  const { state } = useLocation();
  const [selected, setSelected] = useState<VariableOption>(
    state?.variableOption
  );
  useEffect(
    () => state?.variableOption && setSelected(state?.variableOption),
    [state?.variableOption]
  );
  const handleVariableValueEditClick = useCallback(
    (id: string, name: string) => {
      setSelected({ label: name, value: id });
    },
    []
  );
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Typography.Title level={4}>Configure Variables</Typography.Title>
        </Col>
        <Col xs={24}>
          <VariablesSelect onChange={setSelected} value={selected} />
        </Col>
        {!!selected && (
          <Col xs={24}>
            <DefaultSuspense>
              <VariableEditor
                applicationId={data.application?.id}
                applicationPartId={data.id}
                variableId={selected.value}
                refresh={refetch}
              />
            </DefaultSuspense>
          </Col>
        )}
        <Col xs={24}>
          <Typography.Title level={4}>Variable Overview</Typography.Title>
        </Col>
        <Col xs={24}>
          <DefaultSuspense>
            <VariableValueList
              onEdit={handleVariableValueEditClick}
              data={variableValues}
            />
          </DefaultSuspense>
        </Col>
      </Row>
    </>
  );
};

const DeployedEnvironments: React.FC<{
  data: EditApplicationPart_DeployedEnvironment_Fragment$key;
}> = ({ data }) => {
  const { deployments } =
    useFragment<EditApplicationPart_DeployedEnvironment_Fragment$key>(
      applicationDeployedEnvironmentPart,
      data
    );
  if (!deployments?.nodes || deployments.nodes.length === 0) {
    return <Empty description="This part was never deployed"></Empty>;
  } else {
    return (
      <Row>
        <DeployedEnvironmentsOverview data={deployments?.nodes} />
      </Row>
    );
  }
};

const Header: React.FC<{
  applicationPartId: string;
  applicationPartName: string;
  applicationName: string;
  namespace: string;
  id: string;
}> = ({
  applicationPartName,
  applicationPartId,
  applicationName,
  namespace,
  id,
}) => {
  const [isEdit, , enableEdit, disableEdit] = useToggle();
  const [publishVisible, , enablePublish, disablePublish] = useToggle();
  return (
    <>
      <EditableBreadcrumbHeader
        onEdit={enableEdit}
        title={applicationPartName}
        breadcrumbs={[{ text: namespace }, { text: applicationName }]}
      >
        <HeaderButton
          type="primary"
          icon={<PublishIcon />}
          onClick={enablePublish}
        >
          Publish
        </HeaderButton>
        <RenameApplicationPartDialog
          applicationPartName={applicationName}
          applicationPartId={id}
          onClose={disableEdit}
          open={isEdit}
        />
      </EditableBreadcrumbHeader>
      <PublishApplicationPartDialog
        open={publishVisible}
        onClose={disablePublish}
        applicationPartName={applicationPartName}
        applicationPartId={applicationPartId}
      />
    </>
  );
};
