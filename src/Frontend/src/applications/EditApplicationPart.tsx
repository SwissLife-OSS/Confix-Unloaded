import * as React from "react";
import { useFragment } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { useParams } from "react-router";
import { Col, Empty, Row, Tabs, Typography } from "antd";
import {
  EditableBreadcrumbHeader,
  HeaderButton,
} from "../shared/EditablePageHeader";
import { PublishIcon } from "../icons/icons";
import { useToggle } from "../shared/useToggle";
import { RenameApplicationPartDialog } from "./dialogs/RenameApplicationPartDialog";
import {
  VariableOption,
  VariablesSelect,
} from "../variables/controls/VariableSelect";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { useCallback, useEffect, useState } from "react";
import { VariableEditor } from "../variables/controls/VariableEditor";
import { VariableValueList } from "../variables/controls/VariableValueList";
import { useSilentRefreshQuery } from "../shared/useDefaultRefetch";
import { useLocation } from "react-router-dom";
import { useTabSwitcher } from "../shared/useTabSwitcher";
import { PublishApplicationPartDialog } from "./dialogs/PublishApplicationPartDialog";
import { EditApplicationPart_DeployedEnvironments$key } from "./__generated__/EditApplicationPart_DeployedEnvironments.graphql";
import { DeployedEnvironmentsOverview } from "./components/DeployedEnvironmentsOverview";
import {
  Title,
  ApplicationPartChangeLog,
} from "./components/ApplicationPartChangeLog";
import { ApplicationPartComponents } from "./components/ApplicationPartComponents";
import { PublishedApplicationParts } from "./components/PublishedApplicationParts";
import { EditApplicationPart_Variable$key } from "./__generated__/EditApplicationPart_Variable.graphql";
import { EditApplicationPart$key } from "./__generated__/EditApplicationPart.graphql";
import { EditApplicationPartQuery } from "./__generated__/EditApplicationPartQuery.graphql";

export const EditApplicationPart = () => {
  const { applicationId = "", id: applicationPartId = "" } = useParams();
  const variables = { id: applicationPartId };
  const { tab, navigateToTab } = useTabSwitcher();

  const { data: query, refresh } =
    useSilentRefreshQuery<EditApplicationPartQuery>(
      graphql`
        query EditApplicationPartQuery($id: ID!) {
          applicationPartById(id: $id) {
            id
            ...EditApplicationPart
          }
        }
      `,
      variables
    );

  const data = useFragment<EditApplicationPart$key>(
    graphql`
      fragment EditApplicationPart on ApplicationPart {
        id
        name
        application {
          id
          namespace
          name
        }
        ...ApplicationPartComponents
        ...EditApplicationPart_Variable @defer
        ...ApplicationPartChangeLog @defer
        ...EditApplicationPart_DeployedEnvironments @defer
        ...PublishedApplicationParts
      }
    `,
    query.applicationPartById
  );

  if (!data) {
    return (
      <DetailView style={{ padding: 1 }}>
        Coult not find application part
      </DetailView>
    );
  }

  const { id, name: applicationPartName, application } = data;

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
                    <DeployedEnvironments fragmentRef={data} />
                    <Title>
                      <h3>Components</h3>
                    </Title>
                    <ApplicationPartComponents
                      applicationId={applicationId}
                      fragmentRef={data}
                    />
                  </>
                ),
              },
              {
                key: "variables",
                label: "Variables",
                children: (
                  <DefaultSuspense>
                    <Variables fragmentRef={data} refetch={refresh} />
                  </DefaultSuspense>
                ),
              },
              {
                key: "publish_log",
                label: "Publish Log",
                children: (
                  <DefaultSuspense>
                    <PublishedApplicationParts fragmentRef={data} />
                  </DefaultSuspense>
                ),
              },
              {
                key: "changelog",
                label: "Change Log",
                children: (
                  <DefaultSuspense>
                    <ApplicationPartChangeLog fragmentRef={data} />
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
  fragmentRef: EditApplicationPart_Variable$key;
  refetch: () => void;
}> = ({ fragmentRef, refetch }) => {
  const { state } = useLocation();

  const data = useFragment(
    graphql`
      fragment EditApplicationPart_Variable on ApplicationPart {
        id
        application {
          id
        }
        variableValues {
          ...VariableValueList
        }
      }
    `,
    fragmentRef
  );

  const [selected, setSelected] = useState<VariableOption>(
    state?.variableOption
  );

  const handleVariableValueEditClick = useCallback(
    (id: string, name: string) => {
      setSelected({ label: name, value: id });
    },
    []
  );

  useEffect(
    () => state?.variableOption && setSelected(state?.variableOption),
    [state?.variableOption]
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
              data={data.variableValues}
            />
          </DefaultSuspense>
        </Col>
      </Row>
    </>
  );
};

const DeployedEnvironments: React.FC<{
  fragmentRef: EditApplicationPart_DeployedEnvironments$key;
}> = ({ fragmentRef }) => {
  const { deployments } = useFragment(
    graphql`
      fragment EditApplicationPart_DeployedEnvironments on ApplicationPart {
        deployments {
          nodes {
            ...DeployedEnvironmentsOverview
          }
        }
      }
    `,
    fragmentRef
  );

  if (!deployments?.nodes || deployments.nodes.length === 0) {
    return <Empty description="This part was never deployed"></Empty>;
  } else {
    return (
      <Row>
        <DeployedEnvironmentsOverview fragmentRef={deployments?.nodes} />
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
