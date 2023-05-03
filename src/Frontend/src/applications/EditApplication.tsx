import * as React from 'react';

import {AddIcon, DeleteIcon, EditIcon} from '../icons/icons';
import {Button, Card, Col, Empty, List, Row, Tabs, Typography} from 'antd';
import {
  EditApplication$data,
  EditApplication$key,
} from '@generated/EditApplication.graphql';
import {generatePath, useLocation, useParams} from 'react-router';
import {useCallback, useEffect, useState} from 'react';

import {AddComponentsToApplicationPartDialog} from './dialogs/AddComponentsToApplicationPartDialog';
import {ApplicationPartSectionHeader} from './components/ApplicationPartSectionHeader';
import {ChangeLog} from '../shared/ChangeLog';
import {DefaultSuspense} from '../shared/DefaultSuspense';
import {DetailView} from '../shared/DetailView';
import {EditApplication_ApplicationChangeLog$key} from '@generated/EditApplication_ApplicationChangeLog.graphql';
import {EditApplication_ApplicationParts$key} from '@generated/EditApplication_ApplicationParts.graphql';
import {EditApplication_ApplicationPartsDisplay$key} from '@generated/EditApplication_ApplicationPartsDisplay.graphql';
import {EditApplication_Query} from '@generated/EditApplication_Query.graphql';
import {EditApplication_Variables$key} from '@generated/EditApplication_Variables.graphql';
import {EditableBreadcrumbHeader} from '../shared/EditablePageHeader';
import {Link} from 'react-router-dom';
import {RemovePartFromApplicationDialog} from './dialogs/RemovePartFromApplicationDialog';
import {RenameApplicationDialog} from './dialogs/RenameApplicationDialog';
import {VariableEditor} from '../variables/controls/VariableEditor';
import {VariableValueList} from '../variables/controls/VariableValueList';
import {VariablesSelect} from '../variables/controls/VariableSelect';
import {graphql} from 'babel-plugin-relay/macro';
import styled from '@emotion/styled';
import {useFragment} from 'react-relay';
import {useSilentRefreshQuery} from '../shared/useDefaultRefetch';
import {useTabSwitcher} from '../shared/useTabSwitcher';
import {useToggle} from '../shared/useToggle';

export const EditApplication = () => {
  const route = useParams();
  const variables = {id: route.applicationId ?? ''};
  const {tab, navigateToTab} = useTabSwitcher();
  const {data: query, refresh} = useSilentRefreshQuery<EditApplication_Query>(
    graphql`
      query EditApplication_Query($id: ID!) {
        applicationById(id: $id) {
          ...EditApplication
        }
      }
    `,
    variables,
  );

  const data = useFragment<EditApplication$key>(
    graphql`
      fragment EditApplication on Application
      @refetchable(queryName: "EditApplication_RefetchQuery") {
        id
        name
        namespace
        ...EditApplication_Variables @defer
        ...EditApplication_ApplicationChangeLog @defer
        ...EditApplication_ApplicationParts
        ...ApplicationPartSectionHeader
      }
    `,
    query.applicationById,
  );

  if (!data?.id) {
    return (
      <DetailView style={{padding: 1}}>Could not find application</DetailView>
    );
  }

  return (
    <DetailView style={{padding: 1}}>
      <Row>
        <Col xs={24}>
          <Header
            name={data.name}
            namespace={data.namespace ?? ''}
            id={data.id}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <ApplicationPartSectionHeader fragmentRef={data} />
        </Col>
        <Col xs={24}>
          <Tabs
            defaultActiveKey={tab}
            key={tab}
            onChange={navigateToTab}
            items={[
              {
                key: 'edit',
                label: 'Parts',
                children: <ApplicationParts fragmentRef={data} />,
              },
              {
                key: 'variables',
                label: 'Variables',
                children: (
                  <DefaultSuspense>
                    <Variables data={data} refetch={refresh} />
                  </DefaultSuspense>
                ),
              },
              {
                key: 'changelog',
                label: 'Change Log',
                children: (
                  <DefaultSuspense>
                    <ApplicationChangeLog fragmentRef={data} />
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

export type VariableOption = {label: string; value: string};

const Variables: React.FC<{
  data: EditApplication$data;
  refetch: () => void;
}> = ({data, refetch}) => {
  const {state} = useLocation();

  const {variableValues} = useFragment<EditApplication_Variables$key>(
    graphql`
      fragment EditApplication_Variables on Application {
        variableValues {
          ...VariableValueList
        }
      }
    `,
    data,
  );

  const [selected, setSelected] = useState<VariableOption>(
    state?.variableOption,
  );

  const handleVariableValueEditClick = useCallback(
    (id: string, name: string) => {
      setSelected({label: name, value: id});
    },
    [],
  );

  useEffect(
    () => state?.variableOption && setSelected(state?.variableOption),
    [state?.variableOption],
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
                applicationId={data.id}
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

const ApplicationParts: React.FC<{
  fragmentRef: EditApplication_ApplicationParts$key;
}> = ({fragmentRef}) => {
  const {parts, id} = useFragment(
    graphql`
      fragment EditApplication_ApplicationParts on Application {
        id
        parts {
          ...EditApplication_ApplicationPartsDisplay
        }
      }
    `,
    fragmentRef,
  );

  if (parts.length === 0) {
    return <Empty description="No Application Parts"></Empty>;
  } else {
    return (
      <Row gutter={[16, 16]}>
        {(parts.map((x) => ({...x})) ?? []).map((item) => (
          <Col span={8}>
            <ApplicationPartsDisplay part={item} applicationId={id} />
          </Col>
        ))}
      </Row>
    );
  }
};

const ApplicationPartsDisplay: React.FC<{
  applicationId: string;
  part: EditApplication_ApplicationPartsDisplay$key;
}> = ({applicationId, part}) => {
  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const [isAddComponentVisible, , enableAddComponent, disableAddComponent] =
    useToggle();
  const applicationPart = useFragment(
    graphql`
      fragment EditApplication_ApplicationPartsDisplay on ApplicationPart {
        id
        name
        components {
          definition {
            id
            name
            state
          }
        }
        ...AddComponentsToApplicationPartDialog
      }
    `,
    part,
  );
  const {components, name, id} = applicationPart;

  const linkToPart = generatePath(`../:applicationId/parts/:partId/edit`, {
    applicationId,
    partId: id,
  });
  return (
    <>
      <Card
        title={name}
        actions={[
          <Link to={linkToPart}>
            <EditIcon />
          </Link>,
          <AddIcon onClick={enableAddComponent} />,
        ]}
        extra={
          <Button icon={<DeleteIcon />} danger onClick={enableRemoveDialog} />
        }
      >
        <CardBody>
          <List
            dataSource={components.map((x) => ({...x}))}
            renderItem={(item) => (
              <ComponentListItem name={item.definition?.name ?? ''} />
            )}
          />
        </CardBody>
      </Card>
      <RemovePartFromApplicationDialog
        applicationPartName={name}
        applicationPartId={id}
        open={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
      <AddComponentsToApplicationPartDialog
        open={isAddComponentVisible}
        onClose={disableAddComponent}
        fragmentRef={applicationPart}
      />
    </>
  );
};

const ComponentListItem: React.FC<{name: string}> = ({name}) => {
  return (
    <List.Item>
      <List.Item.Meta title={name} />
    </List.Item>
  );
};

const CardBody = styled('div')`
  height: 200px;
  overflow-y: auto;
`;

const Header: React.FC<{name: string; namespace: string; id: string}> = ({
  name,
  namespace,
  id,
}) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader
      onEdit={enable}
      title={name}
      breadcrumbs={[{text: namespace}]}
    >
      <RenameApplicationDialog
        name={name}
        id={id}
        onClose={disable}
        open={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};

const ApplicationChangeLog: React.FC<{
  fragmentRef: EditApplication_ApplicationChangeLog$key;
}> = ({fragmentRef}) => {
  const {changeLog} = useFragment(
    graphql`
      fragment EditApplication_ApplicationChangeLog on Application {
        changeLog {
          ...ChangeLog
        }
      }
    `,
    fragmentRef,
  );

  return <ChangeLog data={changeLog} />;
};
