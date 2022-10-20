import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { Button, Card, Col, List, Modal, Row, Select, Table } from "antd";
import { DetailView } from "../../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { EditGroupQuery } from "./__generated__/EditGroupQuery.graphql";
import { EditableBreadcrumbHeader } from "../../shared/EditablePageHeader";
import { useToggle } from "../../shared/useToggle";
import { RenameGroupDialog } from "./controls/dialogs/RenameGroupDialog";
import React, { useMemo, useState } from "react";
import { EditGroup_Group$key } from "./__generated__/EditGroup_Group.graphql";
import { css } from "@emotion/react";
import { useParams } from "react-router";
import Column from "antd/lib/table/Column";
import { RoleOption, RolesSelect } from "../roles/controls/RolesSelect";
import { useHandler } from "../../shared/useHandler";
import { FieldInput, FormActions } from "../../shared/FormField";
import { EditGroup_UpdateGroupRoles_Mutation } from "./__generated__/EditGroup_UpdateGroupRoles_Mutation.graphql";
import { EditGroup_UpdateGroupRequirements_Mutation } from "./__generated__/EditGroup_UpdateGroupRequirements_Mutation.graphql";
import { id } from "../../shared/id";
import { DeleteIcon } from "../../icons/icons";
import { SectionHeader } from "../../shared/SectionHeader";
import {
  pipeCommitFn,
  withErrorNotifications,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";

const groupByIdQuery = graphql`
  query EditGroupQuery($id: ID!) {
    groupById(id: $id) {
      id
      ...EditGroup_Group
    }
  }
`;
const editGroupFragment = graphql`
  fragment EditGroup_Group on Group {
    id
    name
    requirements {
      ... on ClaimRequirement {
        __typename
        type
        value
      }
    }
    roles {
      namespace
      roles {
        id
        name
      }
    }
  }
`;

export const EditGroup = () => {
  const { groupId = "" } = useParams();
  const group = useLazyLoadQuery<EditGroupQuery>(groupByIdQuery, {
    id: groupId,
  });
  const id = group.groupById?.id;
  if (!id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find group </DetailView>
    );
  }
  return <EditGroupForm data={group.groupById} id={id} key={id} />;
};

const EditGroupForm: React.FC<{
  id: string;
  data: NonNullable<EditGroupQuery["response"]["groupById"]>;
}> = ({ data, id }) => {
  const group = useFragment<EditGroup_Group$key>(editGroupFragment, data);
  return (
    <DetailView
      style={{ padding: 1 }}
      css={css`
        padding: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      <Row>
        <Col xs={24}>
          <Header name={group.name} id={group.id} />
        </Col>
      </Row>
      <Row>
        <RoleScopeSection $data={data} groupId={group.id} />
      </Row>
      <Row>
        <RequirementsSection $data={data} groupId={group.id} />
      </Row>
    </DetailView>
  );
};

interface RoleScopeData {
  readonly key: string;
  readonly namespace: string;
  readonly roles: readonly { readonly id: string; readonly name: string }[];
}

const RoleScopeSection: React.FC<{
  $data: EditGroup_Group$key;
  groupId: string;
}> = ({ $data, groupId }) => {
  const group = useFragment<EditGroup_Group$key>(editGroupFragment, $data);
  const [data, setData] = useState((): RoleScopeData[] => {
    return group.roles.map<RoleScopeData>((x) => ({
      key: x.namespace,
      namespace: x.namespace,
      roles: x.roles,
    }));
  });

  const [commit, isInFlight] =
    useMutation<EditGroup_UpdateGroupRoles_Mutation>(graphql`
      mutation EditGroup_UpdateGroupRoles_Mutation(
        $input: UpdateGroupRolesInput!
      ) {
        updateGroupRoles(input: $input) {
          group {
            id
            ...EditGroup_Group
          }
          errors {
            ... on UserError {
              code
              message
            }
          }
        }
      }
    `);

  const handleSave = useHandler(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.updateGroupRoles.group?.id,
        `Updated requirements of ${group.name}`
      ),
      withErrorNotifications((x) => x.updateGroupRoles?.errors),
    ])({
      variables: {
        input: {
          id: groupId,
          roles: data.map((x) => ({
            namespace: x.namespace,
            roleIds: x.roles.map((r) => r.id),
          })),
        },
      },
    });
    setAdditionalNamespace("");
  });

  const onUpdate = (roleScope: RoleScopeData) => {
    setData((previous) =>
      previous.map((x) => (x.namespace !== roleScope.namespace ? x : roleScope))
    );
  };

  const [isEdit, , enable, disable] = useToggle();
  const [additionalNamespace, setAdditionalNamespace] = useState("");
  const handleAddNamespace = useHandler(() => {
    setData((previous) => [
      ...previous,
      { namespace: additionalNamespace, roles: [], key: additionalNamespace },
    ]);
    setAdditionalNamespace("");
    disable();
  });

  const removeNamespace = useHandler((data: RoleScopeData) =>
    setData((previous) =>
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
        title={`Add role to ${group.name}`}
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

      <Col span={24}>
        <FormActions justify="end">
          <Button
            type="primary"
            onClick={handleSave}
            loading={isInFlight}
            disabled={isInFlight}
          >
            Save Roles
          </Button>
        </FormActions>
      </Col>
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

const Header: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const [isEdit, , enable, disable] = useToggle();
  return (
    <EditableBreadcrumbHeader onEdit={enable} title={name}>
      <RenameGroupDialog
        name={name}
        key={name}
        id={id}
        onClose={disable}
        open={isEdit}
      />
    </EditableBreadcrumbHeader>
  );
};

const RequirementsSection: React.FC<{
  $data: EditGroup_Group$key;
  groupId: string;
}> = ({ $data, groupId }) => {
  const group = useFragment<EditGroup_Group$key>(editGroupFragment, $data);
  const [data, setData] = useState((): Requirements[] => {
    return group.requirements.reduce<Requirements[]>((previous, current) => {
      switch (current.__typename) {
        case "ClaimRequirement":
          previous.push({
            id: id(),
            kind: "ClaimRequirement",
            value: current.value,
            type: current.type,
          });
          break;
        case "%other":
          break;
      }
      return previous;
    }, []);
  });

  const [commit, isInFlight] =
    useMutation<EditGroup_UpdateGroupRequirements_Mutation>(graphql`
      mutation EditGroup_UpdateGroupRequirements_Mutation(
        $input: UpdateGroupRequirementsInput!
      ) {
        updateGroupRequirements(input: $input) {
          group {
            id
            ...EditGroup_Group
          }
          errors {
            ... on UserError {
              code
              message
            }
          }
        }
      }
    `);

  const handleSave = useHandler(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.updateGroupRequirements.group?.id,
        `Updated requirements of ${group.name}`
      ),
      withErrorNotifications((x) => x.updateGroupRequirements?.errors),
    ])({
      variables: {
        input: {
          id: groupId,
          requirements: data.map((x) => {
            switch (x.kind) {
              case "ClaimRequirement":
                return { claimRequirement: { type: x.type, value: x.value } };
            }
            throw new Error(`Requirement ${x.kind} is not known`);
          }),
        },
      },
    });
  });

  const onUpdate = (requirement: Requirements) => {
    setData((previous) =>
      previous.map((x) => (x.id !== requirement.id ? x : requirement))
    );
  };

  const [isEdit, , enable, disable] = useToggle();
  const [selectedRequirementType, setSelectedRequirementType] =
    useState("ClaimRequirement");
  const handleAddRequirement = useHandler(() => {
    const newRequirement = ((): Requirements | undefined => {
      switch (selectedRequirementType) {
        case "ClaimRequirement":
          return { id: id(), kind: "ClaimRequirement", type: "", value: "" };
      }
      return undefined;
    })();
    if (newRequirement) {
      setData((previous) => [...previous, newRequirement]);
    }
    setSelectedRequirementType("ClaimRequirement");
    disable();
  });

  const removeNamespace = useHandler((data: Requirements) =>
    setData((previous) => previous.filter((x) => x.id !== data.id))
  );

  return (
    <>
      <Col span={24} flex={"auto"}>
        <SectionHeader title="Requirements" onAdd={enable} />
        <List
          grid={{
            gutter: 16,
          }}
          dataSource={data}
          renderItem={(requirement) => {
            switch (requirement.kind) {
              case "ClaimRequirement":
                return (
                  <List.Item>
                    <RequirementCard
                      onRemove={removeNamespace}
                      requirement={requirement}
                      title="Claim Requirement"
                    >
                      <ClaimRequirementForm
                        onChange={onUpdate}
                        requirement={requirement}
                        key={requirement.id}
                      />
                    </RequirementCard>
                  </List.Item>
                );
            }
            return null;
          }}
        />
      </Col>
      <Modal
        title={`Add  to ${group.name}`}
        open={isEdit}
        onOk={handleAddRequirement}
        onCancel={disable}
      >
        <RequirementSelect
          value={selectedRequirementType}
          onChange={setSelectedRequirementType}
        />
      </Modal>
      <Col span={24}>
        <FormActions justify="end">
          <Button
            type="primary"
            onClick={handleSave}
            loading={isInFlight}
            disabled={isInFlight}
          >
            Save requirements
          </Button>
        </FormActions>
      </Col>
    </>
  );
};

type Requirements = ClaimRequirement;

interface ClaimRequirement {
  id: string;
  kind: "ClaimRequirement";
  type: string;
  value: string;
}

const ClaimRequirementForm: React.FC<{
  requirement: ClaimRequirement;
  onChange: (requirement: ClaimRequirement) => void;
}> = ({ requirement, onChange }) => {
  const updateName = useHandler<typeof FieldInput, "onChange">((e) => {
    onChange({ ...requirement, type: e.target.value });
  });
  const updateValue = useHandler<typeof FieldInput, "onChange">((e) => {
    onChange({ ...requirement, value: e.target.value });
  });

  return (
    <>
      <FieldInput label="type" value={requirement.type} onChange={updateName} />
      <FieldInput
        label="value"
        value={requirement.value}
        onChange={updateValue}
      />
    </>
  );
};

const RequirementSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <Select
      style={{ width: "100%" }}
      value={value}
      filterOption={false}
      onChange={onChange}
      showArrow
    >
      <Select.Option value="ClaimRequirement">ClaimRequirement</Select.Option>
    </Select>
  );
};

const RequirementCard: React.FC<{
  children: React.ReactNode;
  onRemove: (requirement: Requirements) => void;
  requirement: Requirements;
  title: string;
}> = ({ children, onRemove, requirement, title }) => {
  const handleRemove = useHandler(() => onRemove(requirement));
  return (
    <Card
      title={title}
      extra={[
        <Button
          icon={<DeleteIcon />}
          type="link"
          onClick={handleRemove}
        ></Button>,
      ]}
    >
      {children}
    </Card>
  );
};
