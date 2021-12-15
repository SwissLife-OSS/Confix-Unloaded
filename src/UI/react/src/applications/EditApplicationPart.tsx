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
import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Row,
  Tabs,
  Typography,
} from "antd";
import styled from "@emotion/styled";
import {
  EditableBreadcrumbHeader,
  HeaderButton,
} from "../shared/EditablePageHeader";
import { DeleteIcon, EditIcon, PublishIcon } from "../icons/icons";
import { useToggle } from "../shared/useToggle";
import { ApplicationPartComponentSectionHeader } from "./components/ApplicationPartComponentSectionHeader";
import { EditApplicationPartComponent_component$key } from "./__generated__/EditApplicationPartComponent_component.graphql";
import {
  EditApplicationPart_fragment,
  EditApplicationPart_fragment$key,
} from "./__generated__/EditApplicationPart_fragment.graphql";
import { RenameApplicationPartDialog } from "./dialogs/RenameApplicationPartDialog";
import { RemoveComponentFromApplicationPartDialog } from "./dialogs/RemoveComponentFromApplicationPartDialog";
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
import { generatePath, Link, useLocation } from "react-router-dom";
import { EditApplicationPart_VariableValues_Fragment$key } from "./__generated__/EditApplicationPart_VariableValues_Fragment.graphql";
import { EditApplicationPart_ChangeLog_Fragment$key } from "./__generated__/EditApplicationPart_ChangeLog_Fragment.graphql";
import { ChangeLog } from "../shared/ChangeLog";
import { useTabSwitcher } from "../shared/useTabSwitcher";

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
      ...EditApplicationPartComponent_component
    }
    ...EditApplicationPart_VariableValues_Fragment @defer
    ...EditApplicationPart_ChangeLog_Fragment @defer
  }
`;

const applicationVariableValuesFragment = graphql`
  fragment EditApplicationPart_VariableValues_Fragment on ApplicationPart {
    variableValues {
      ...VariableValueList_values
    }
  }
`;

const applicationPartChangeLog = graphql`
  fragment EditApplicationPart_ChangeLog_Fragment on ApplicationPart {
    changeLog {
      ...ChangeLog_fragment
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
            applicationName={application?.name ?? ""}
            applicationPartName={applicationPartName}
            namespace={application?.namespace ?? ""}
            id={id}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <ApplicationPartComponentSectionHeader
            applicationPartId={id}
            applicationPartName={applicationPartName}
          />
        </Col>
        <Col xs={24}>
          <Tabs defaultActiveKey={tab} key={tab} onChange={navigateToTab}>
            <Tabs.TabPane tab="Components" key="edit">
              <Components
                applicationId={applicationId}
                components={components}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Variables" key="variables">
              <DefaultSuspense>
                <Variables data={applicationPartById} refetch={refresh} />
              </DefaultSuspense>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Change Log" key="changelog">
              <DefaultSuspense>
                <ApplicationPartChangeLog data={applicationPartById} />
              </DefaultSuspense>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </DetailView>
  );
};

const Variables: React.FC<{
  data: EditApplicationPart_fragment;
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

const Components: React.FC<{
  applicationId: string;
  components: EditApplicationPart_fragment["components"];
}> = ({ applicationId, components }) => {
  if (components.length === 0) {
    return <Empty description="No Application Parts"></Empty>;
  } else {
    return (
      <Row gutter={[16, 16]}>
        {(components.map((x) => ({ ...x })) ?? []).map((item) => (
          <Col span={8} key={item.definition.id}>
            <ApplicationPartComponentsDisplay
              applicationId={applicationId}
              part={item}
              componentPartId={item.id}
            />
          </Col>
        ))}
      </Row>
    );
  }
};

const applicationPartComponentFragment = graphql`
  fragment EditApplicationPartComponent_component on ApplicationPartComponent {
    id
    definition {
      id
      name
      state
    }
  }
`;

const ApplicationPartComponentsDisplay: React.FC<{
  applicationId: string;
  componentPartId: string;
  part: EditApplicationPartComponent_component$key;
}> = ({ part, applicationId, componentPartId }) => {
  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const {
    id,
    definition: { name, state },
  } = useFragment(applicationPartComponentFragment, part);
  const linkToPart = generatePath(
    `../:applicationId/components/:componentId/edit`,
    {
      applicationId,
      componentId: id,
    }
  );
  return (
    <>
      <Card
        title={name}
        actions={[
          <Link to={linkToPart}>
            <EditIcon />
          </Link>,
        ]}
        extra={
          <Button icon={<DeleteIcon />} danger onClick={enableRemoveDialog} />
        }
      >
        <CardBody>
          <Descriptions>
            <Descriptions.Item label="name">{name}</Descriptions.Item>
            <Descriptions.Item label="state">{state}</Descriptions.Item>
          </Descriptions>
        </CardBody>
      </Card>
      <RemoveComponentFromApplicationPartDialog
        partComponentId={id}
        componentName={name}
        visible={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
    </>
  );
};

const CardBody = styled("div")`
  height: 200px;
  overflow-y: scroll;
`;

const Header: React.FC<{
  applicationPartName: string;
  applicationName: string;
  namespace: string;
  id: string;
}> = ({ applicationPartName, applicationName, namespace, id }) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader
      onEdit={enable}
      title={applicationPartName}
      breadcrumbs={[{ text: namespace }, { text: applicationName }]}
    >
      <HeaderButton type="primary" icon={<PublishIcon />}>
        Publish
      </HeaderButton>
      <RenameApplicationPartDialog
        applicationPartName={applicationName}
        applicationPartId={id}
        onClose={disable}
        visible={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};

const ApplicationPartChangeLog: React.FC<{
  data: EditApplicationPart_ChangeLog_Fragment$key;
}> = ({ data }) => {
  const { changeLog } = useFragment<EditApplicationPart_ChangeLog_Fragment$key>(
    applicationPartChangeLog,
    data
  );

  return <ChangeLog data={changeLog} />;
};
