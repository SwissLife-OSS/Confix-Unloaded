import * as React from 'react';

import {AddPartToApplicationDialog} from '../dialogs/AddPartToApplicationDialog';
import {ApplicationPartSectionHeader$key} from '@generated/ApplicationPartSectionHeader.graphql';
import {SectionHeader} from '../../shared/SectionHeader';
import {graphql} from 'babel-plugin-relay/macro';
import {useFragment} from 'react-relay';
import {useToggle} from '../../shared/useToggle';

export const ApplicationPartSectionHeader: React.FC<{
  children?: React.ReactElement;
  fragmentRef: ApplicationPartSectionHeader$key;
}> = ({fragmentRef, children}) => {
  const {name: applicationName, id: applicationId} = useFragment(
    graphql`
      fragment ApplicationPartSectionHeader on Application {
        id
        name
      }
    `,
    fragmentRef,
  );
  const [isEdit, , enable, disable] = useToggle();
  return (
    <>
      <SectionHeader title="Parts" onAdd={enable}>
        {children}
      </SectionHeader>
      <AddPartToApplicationDialog
        applicationName={applicationName}
        applicationId={applicationId}
        open={isEdit}
        onClose={disable}
      />
    </>
  );
};
