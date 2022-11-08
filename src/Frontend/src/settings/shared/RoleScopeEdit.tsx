import React from "react";
import { Col, Table, Button, Modal } from "antd";
import Column from "antd/lib/table/Column";
import { useMemo, useState } from "react";
import { DeleteIcon } from "../../icons/icons";
import { FieldInput } from "../../shared/FormField";
import { SectionHeader } from "../../shared/SectionHeader";
import { useHandler } from "../../shared/useHandler";
import { useToggle } from "../../shared/useToggle";
import { RoleOption, RolesSelect } from "../roles/controls/RolesSelect";

export interface RoleScopeData {
  readonly key: string;
  readonly namespace: string;
  readonly roles: readonly { readonly id: string; readonly name: string }[];
}

export const RoleScopeEditor: React.FC<{
  data: RoleScopeData[];
  onChange: (change: (previous: RoleScopeData[]) => RoleScopeData[]) => void;
}> = ({ data, onChange }) => {
  const onUpdate = (roleScope: RoleScopeData) => {
    onChange((previous) =>
      previous.map((x) => (x.namespace !== roleScope.namespace ? x : roleScope))
    );
  };

  const [isEdit, , enable, disable] = useToggle();
  const [additionalNamespace, setAdditionalNamespace] = useState("");
  const handleAddNamespace = useHandler(() => {
    onChange((previous) => [
      ...previous,
      { namespace: additionalNamespace, roles: [], key: additionalNamespace },
    ]);
    setAdditionalNamespace("");
    disable();
  });

  const removeNamespace = useHandler((data: RoleScopeData) =>
    onChange((previous) =>
      previous.filter((x) => x.namespace !== data.namespace)
    )
  );

  return (
    <>
      <Col span={24} flex={"auto"}>
        <SectionHeader title="Roles" onAdd={enable} />
        <Table dataSource={data} pagination={false}>
          <Column
            title="Namespace"
            dataIndex="namespace"
            key="namespace"
            width={1}
          />
          <Column
            title="Roles"
            dataIndex="roles"
            key="roles"
            render={(_, data: RoleScopeData) => (
              <EditableRoles data={data} onChange={onUpdate}></EditableRoles>
            )}
          />
          <Column
            title="Action"
            key="action"
            width={1}
            render={(_: any, record: RoleScopeData) => (
              <Button
                icon={<DeleteIcon />}
                onClick={() => removeNamespace(record)}
              />
            )}
          />
        </Table>
      </Col>

      <Modal
        title={`Add role `}
        open={isEdit}
        onOk={handleAddNamespace}
        onCancel={disable}
      >
        <FieldInput
          label="Namespace"
          onChange={(e) => setAdditionalNamespace(e.target.value)}
          value={additionalNamespace}
        />
      </Modal>
    </>
  );
};

const EditableRoles: React.FC<{
  data: RoleScopeData;
  onChange: (data: RoleScopeData) => void;
}> = ({ data: { namespace, roles, key }, onChange }) => {
  const handleEditRoles = useHandler((roles: RoleOption[]) => {
    onChange({
      key,
      namespace,
      roles: roles.map((x) => ({
        id: x.value,
        name: x.label,
      })),
    });
  });
  const options = useMemo(
    () => roles.map((x) => ({ value: x.id, label: x.name })),
    [roles]
  );
  return <RolesSelect onChange={handleEditRoles} value={options} />;
};
