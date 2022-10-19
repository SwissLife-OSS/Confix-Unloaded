import * as React from "react";
import { SectionHeader } from "../../shared/SectionHeader";
import { useToggle } from "../../shared/useToggle";
import { AddComponentsToApplicationPartDialog } from "../dialogs/AddComponentsToApplicationPartDialog";

export const ApplicationPartComponentSectionHeader: React.FC<{
  applicationPartName: string;
  applicationPartId: string;
  children: React.ReactElement;
}> = ({ applicationPartId, applicationPartName, children }) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <>
      <SectionHeader title="Components" onAdd={enable}>
        {children}
      </SectionHeader>
      <AddComponentsToApplicationPartDialog
        applicationPartName={applicationPartName}
        applicationPartId={applicationPartId}
        open={isEdit}
        onClose={disable}
      />
    </>
  );
};
