import * as React from "react";
import { SectionHeader } from "../../shared/SectionHeader";
import { useToggle } from "../../shared/useToggle";
import { AddComponentsToApplicationPartDialog } from "../dialogs/AddComponentsToApplicationPartDialog";

export const ApplicationPartComponentSectionHeader: React.FC<{
  applicationPartName: string;
  applicationPartId: string;
}> = ({ applicationPartId, applicationPartName, children }) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <>
      <SectionHeader title="Overview" onAdd={enable}>
        {children}
      </SectionHeader>
      <AddComponentsToApplicationPartDialog
        applicationPartName={applicationPartName}
        applicationPartId={applicationPartId}
        visible={isEdit}
        onClose={disable}
      />
    </>
  );
};
