import * as React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { SectionHeader } from "../../shared/SectionHeader";
import { useToggle } from "../../shared/useToggle";
import { AddPartToApplicationDialog } from "../dialogs/AddPartToApplicationDialog";
import { ApplicationPartSectionHeaderFragment$key } from "./__generated__/ApplicationPartSectionHeaderFragment.graphql";

const applicationFragment = graphql`
  fragment ApplicationPartSectionHeaderFragment on Application {
    id
    name
  }
`;

export const ApplicationPartSectionHeader: React.FC<{
  applicationKey: ApplicationPartSectionHeaderFragment$key;
}> = ({ applicationKey, children }) => {
  const { name: applicationName, id: applicationId } = useFragment(
    applicationFragment,
    applicationKey
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
        visible={isEdit}
        onClose={disable}
      />
    </>
  );
};
