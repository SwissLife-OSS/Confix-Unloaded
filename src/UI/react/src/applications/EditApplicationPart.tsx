import * as React from "react";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { useRouteMatch } from "react-router";
import { EditApplicationPart_GetById_Query } from "./__generated__/EditApplicationPart_GetById_Query.graphql";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  List,
  Row,
  Tabs,
  Tag,
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
import { useGoTo } from "../shared/useGoTo";
import { Routes } from "../routes";
import {
  VariableOption,
  VariablesSelect,
} from "../variables/controls/VariableSelect";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { EditApplicationPartVariableOverviewQuery } from "./__generated__/EditApplicationPartVariableOverviewQuery.graphql";
import { useCallback, useMemo, useState } from "react";
import { groupBy } from "../shared/groupBy";
import { VariableEditor } from "../variables/controls/VariableEditor";
import { ColorTag } from "../shared/ColorTag";

const applicationByIdQuery = graphql`
  query EditApplicationPart_GetById_Query($id: ID!) {
    applicationPartById(id: $id) {
      id
      ...EditApplicationPart_fragment
    }
  }
`;

const applicationPartfragment = graphql`
  fragment EditApplicationPart_fragment on ApplicationPart {
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
  }
`;

export const EditApplicationPart = () => {
  const {
    params: { applicationId, id: applicationPartId },
  } = useRouteMatch<{ applicationId: string; id: string }>();
  const data = useLazyLoadQuery<EditApplicationPart_GetById_Query>(
    applicationByIdQuery,
    { id: applicationPartId }
  );
  const applicationPartById = useFragment<EditApplicationPart_fragment$key>(
    applicationPartfragment,
    data.applicationPartById
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
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Parts" key="1">
              <ApplicationParts
                applicationId={applicationId}
                components={components}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Variables" key="2">
              <Variables
                applicationId={applicationId}
                applicationPartId={applicationPartById.id}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </DetailView>
  );
};

const Variables: React.FC<{
  applicationId: string;
  applicationPartId: string;
}> = ({ applicationId, applicationPartId }) => {
  const [selected, setSelected] = useState<VariableOption>();
  const handleVariableValueEditClick = useCallback(
    (id: string, name: string) => {
      setSelected({ label: name, value: id });
    },
    []
  );
  const [fetchKey, setFetchKey] = useState(0);
  const refresh = useCallback(() => {
    setFetchKey((p) => (p += 1));
  }, [setFetchKey]);
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
                applicationId={applicationId}
                applicationPartId={applicationPartId}
                variableId={selected.value}
                refresh={refresh}
              />
            </DefaultSuspense>
          </Col>
        )}
        <Col xs={24}>
          <Typography.Title level={4}>Variable Overview</Typography.Title>
        </Col>
        <Col xs={24}>
          <DefaultSuspense>
            <VariableValueOverview
              onEdit={handleVariableValueEditClick}
              applicationPartId={applicationPartId}
              fetchKey={fetchKey}
            />
          </DefaultSuspense>
        </Col>
      </Row>
    </>
  );
};

const ApplicationParts: React.FC<{
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
  const goToComponent = useGoTo(() =>
    Routes.applicationPartComponents.edit(applicationId, componentPartId)
  );
  return (
    <>
      <Card
        title={name}
        actions={[<EditIcon onClick={goToComponent} />]}
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

const variableOverview = graphql`
  query EditApplicationPartVariableOverviewQuery($id: ID!) {
    applicationPartById(id: $id) {
      id
      variableValues {
        id
        environment {
          id
          name
        }
        variable {
          id
          name
        }
        value
      }
    }
  }
`;

const VariableValueOverview: React.FC<{
  applicationPartId: string;
  fetchKey?: number;
  onEdit: (id: string, name: string) => void;
}> = ({ applicationPartId, onEdit, fetchKey }) => {
  const data = useLazyLoadQuery<EditApplicationPartVariableOverviewQuery>(
    variableOverview,
    { id: applicationPartId },
    { fetchKey, fetchPolicy: "store-and-network" }
  );

  const values = data.applicationPartById?.variableValues;
  const grouped = useMemo(
    () =>
      groupBy(
        values?.map((x) => ({ ...x })) ?? [],
        (x) => x.variable?.id ?? ""
      ),
    [values]
  );

  return (
    <List>
      {Object.keys(grouped).map((x) => {
        const variable = grouped[x][0].variable;
        const tags = grouped[x]
          .map((x) => x.environment?.name)
          .filter((x) => !!x)
          .map((x) => <ColorTag value={x ?? "-"}>{x}</ColorTag>);
        return (
          <List.Item
            actions={[
              <Button
                onClick={() => variable && onEdit(variable.id, variable.name)}
              >
                Edit
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={variable?.name ?? "Unkonw"}
              description={tags}
            />
          </List.Item>
        );
      })}
    </List>
  );
};
