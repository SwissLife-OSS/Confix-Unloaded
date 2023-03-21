import * as React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { SectionHeader } from "../../shared/SectionHeader";
import { useToggle } from "../../shared/useToggle";
import { AddPartToApplicationDialog } from "../dialogs/AddPartToApplicationDialog";
import { ApplicationPartSectionHeader$key } from "./__generated__/ApplicationPartSectionHeader.graphql";

export const ApplicationPartSectionHeader: React.FC<{
  children?: React.ReactElement;
  fragmentRef: ApplicationPartSectionHeader$key;
}> = ({ fragmentRef, children }) => {
  const { name: applicationName, id: applicationId } = useFragment(
    graphql`
      fragment ApplicationPartSectionHeader on Application {
        id
        name
      }
    `,
    fragmentRef
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
