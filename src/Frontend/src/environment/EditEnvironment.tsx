import {Button, Checkbox, Col, Row, Typography} from 'antd';
import React, {useCallback, useState} from 'react';
import {useFragment, useLazyLoadQuery} from 'react-relay';

import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import {DetailView} from '../shared/DetailView';
import {EditEnvironmentQuery} from '@generated/EditEnvironmentQuery.graphql';
import {EditEnvironment_EditEnvironmentForm$key} from '@generated/EditEnvironment_EditEnvironmentForm.graphql';
import {EditEnvironment_Header$key} from '@generated/EditEnvironment_Header.graphql';
import {EditEnvironment_IsDeveloperAccessAllowedFrom$key} from '@generated/EditEnvironment_IsDeveloperAccessAllowedFrom.graphql';
import {EditEnvironment_ParentEnvironement$key} from '@generated/EditEnvironment_ParentEnvironement.graphql';
import {EditableBreadcrumbHeader} from '../shared/EditablePageHeader';
import {FieldInputGroup} from '../shared/FormField';
import {RenameEnvironmentDialog} from './controls/dialogs/RenameEnvironmentDialog';
import {SaveDeveloperAccessButton} from './controls/buttons/SaveDeveloperAccessButton';
import {SetParentEnvironmentDialog} from './controls/dialogs/SetParentEnvironmentDialog';
import {css} from '@emotion/react';
import {graphql} from 'babel-plugin-relay/macro';
import {useParams} from 'react-router';
import {useToggle} from '../shared/useToggle';

const {Title} = Typography;

export const EditEnvironment = () => {
  const {environmentId = ''} = useParams();
  const query = useLazyLoadQuery<EditEnvironmentQuery>(
    graphql`
      query EditEnvironmentQuery($id: ID!) {
        environmentById(id: $id) {
          id
          ...EditEnvironment_EditEnvironmentForm
        }
      }
    `,
    {
      id: environmentId,
    },
  );

  const id = query.environmentById?.id;

  if (!id) {
    return (
      <DetailView style={{padding: 1}}>Coult not find Environment</DetailView>
    );
  }

  return <EditEnvironmentForm key={id} fragmentRef={query.environmentById} />;
};

const EditEnvironmentForm: React.FC<{
  fragmentRef: EditEnvironment_EditEnvironmentForm$key;
}> = ({fragmentRef}) => {
  const data = useFragment<EditEnvironment_EditEnvironmentForm$key>(
    graphql`
      fragment EditEnvironment_EditEnvironmentForm on Environment {
        id
        name
        ...EditEnvironment_ParentEnvironement
        ...EditEnvironment_IsDeveloperAccessAllowedFrom
        ...EditEnvironment_Header
      }
    `,
    fragmentRef,
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
        <Col xs={24}>
          <Header fragmentRef={data} />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <ParentEnvironement fragmentRef={data} />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <IsDeveloperAccessAllowedFrom fragmentRef={data} />
        </Col>
      </Row>
    </DetailView>
  );
};

const ParentEnvironement: React.FC<{
  fragmentRef: EditEnvironment_ParentEnvironement$key;
}> = ({fragmentRef}) => {
  const environment = useFragment<EditEnvironment_ParentEnvironement$key>(
    graphql`
      fragment EditEnvironment_ParentEnvironement on Environment {
        id
        name
        parent {
          id
          name
        }
      }
    `,
    fragmentRef,
  );

  const [open, , enable, disable] = useToggle();

  return (
    <>
      <Typography>Parent environment</Typography>
      <FieldInputGroup
        name={'Parent'}
        label={'Parent'}
        value={environment?.parent?.name ?? '-'}
        disabled
      >
        <Button onClick={enable}>Change</Button>
      </FieldInputGroup>
      <SetParentEnvironmentDialog
        open={open}
        onClose={disable}
        name={environment.name}
        id={environment.id}
      />
    </>
  );
};

const IsDeveloperAccessAllowedFrom: React.FC<{
  fragmentRef: EditEnvironment_IsDeveloperAccessAllowedFrom$key;
}> = ({fragmentRef}) => {
  const data = useFragment<EditEnvironment_IsDeveloperAccessAllowedFrom$key>(
    graphql`
      fragment EditEnvironment_IsDeveloperAccessAllowedFrom on Environment {
        id
        allowDeveloperAccess
      }
    `,
    fragmentRef,
  );

  const [isDeveloperAccessAllowed, setIsDeveloperAccessAllowed] = useState(
    data.allowDeveloperAccess,
  );

  const handleCheckboxChange = useCallback((e: CheckboxChangeEvent) => {
    setIsDeveloperAccessAllowed(e.target.checked);
  }, []);

  return (
    <>
      <Title level={3}>Developer Access</Title>
      <p>
        <Checkbox
          name="allowDeveloperAccess"
          checked={isDeveloperAccessAllowed}
          onChange={handleCheckboxChange}
        >
          Allow developer access
        </Checkbox>
      </p>
      <p>
        <SaveDeveloperAccessButton
          environmentId={data.id}
          isAllowed={isDeveloperAccessAllowed}
        />
      </p>
    </>
  );
};

const Header: React.FC<{
  fragmentRef: EditEnvironment_Header$key;
}> = ({fragmentRef}) => {
  const {name, id} = useFragment<EditEnvironment_Header$key>(
    graphql`
      fragment EditEnvironment_Header on Environment {
        id
        name
      }
    `,
    fragmentRef,
  );

  const [isEdit, , enable, disable] = useToggle();

  return (
    <EditableBreadcrumbHeader onEdit={enable} title={name}>
      <RenameEnvironmentDialog
        name={name}
        key={name}
        id={id}
        onClose={disable}
        open={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};
