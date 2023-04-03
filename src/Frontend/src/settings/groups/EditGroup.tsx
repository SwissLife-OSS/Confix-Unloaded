import { Button, Card, Col, List, Modal, Row, Select } from "antd";
import { FieldInput, FormActions } from "../../shared/FormField";
import React, { useState } from "react";
import { RoleScopeData, RoleScopeEditor } from "../shared/RoleScopeEdit";
import {
  pipeCommitFn,
  withErrorNotifications,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";

import { DeleteIcon } from "../../icons/icons";
import { DetailView } from "../../shared/DetailView";
import { EditGroupQuery } from "./__generated__/EditGroupQuery.graphql";
import { EditGroup_Form$key } from "./__generated__/EditGroup_Form.graphql";
import { EditGroup_Group$key } from "./__generated__/EditGroup_Group.graphql";
import { EditGroup_Header$key } from "./__generated__/EditGroup_Header.graphql";
import { EditGroup_RequirementsSection$key } from "./__generated__/EditGroup_RequirementsSection.graphql";
import { EditGroup_RoleScopeSection$key } from "./__generated__/EditGroup_RoleScopeSection.graphql";
import { EditGroup_UpdateGroupRequirements_Mutation } from "./__generated__/EditGroup_UpdateGroupRequirements_Mutation.graphql";
import { EditGroup_UpdateGroupRoles_Mutation } from "./__generated__/EditGroup_UpdateGroupRoles_Mutation.graphql";
import { EditableBreadcrumbHeader } from "../../shared/EditablePageHeader";
import { RenameGroupDialog } from "./controls/dialogs/RenameGroupDialog";
import { SectionHeader } from "../../shared/SectionHeader";
import { css } from "@emotion/react";
import { graphql } from "babel-plugin-relay/macro";
import { id } from "../../shared/id";
import { useHandler } from "../../shared/useHandler";
import { useParams } from "react-router";
import { useToggle } from "../../shared/useToggle";

export const EditGroup = () => {
  const { groupId = "" } = useParams();
  const group = useLazyLoadQuery<EditGroupQuery>(
    graphql`
      query EditGroupQuery($id: ID!) {
        groupById(id: $id) {
          id
          ...EditGroup_Form
        }
      }
    `,
    {
      id: groupId,
    }
  );
  const id = group.groupById?.id;
  if (!id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find group </DetailView>
    );
  }
  return <EditGroupForm fragmentRef={group.groupById} id={id} key={id} />;
};

const EditGroupForm: React.FC<{
  id: string;
  fragmentRef: EditGroup_Form$key;
}> = ({ fragmentRef, id }) => {
  const data = useFragment(
    graphql`
      fragment EditGroup_Form on Group {
        ...EditGroup_RoleScopeSection
        ...EditGroup_Header
        ...EditGroup_RequirementsSection
      }
    `,
    fragmentRef
  );

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
          <Header fragmentRef={data} />
        </Col>
      </Row>
      <Row>
        <RoleScopeSection fragmentRef={data} />
      </Row>
      <Row>
        <RequirementsSection fragmentRef={data} />
      </Row>
    </DetailView>
  );
};

const RoleScopeSection: React.FC<{
  fragmentRef: EditGroup_RoleScopeSection$key;
}> = ({ fragmentRef }) => {
  const data = useFragment(
    graphql`
      fragment EditGroup_RoleScopeSection on Group {
        id
        name
        roles {
          namespace
          roles {
            id
            name
          }
        }
      }
    `,
    fragmentRef
  );

  const [roleScope, setRoleScope] = useState((): RoleScopeData[] => {
    return data.roles.map<RoleScopeData>((x) => ({
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
            ...EditGroup_RoleScopeSection
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
        `Updated requirements of ${data.name}`
      ),
      withErrorNotifications((x) => x.updateGroupRoles?.errors),
    ])({
      variables: {
        input: {
          id: data.id,
          roles: roleScope.map((x) => ({
            namespace: x.namespace,
            roleIds: x.roles.map((r) => r.id),
          })),
        },
      },
    });
  });

  return (
    <>
      <RoleScopeEditor data={roleScope} onChange={setRoleScope} />
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

const Header: React.FC<{ fragmentRef: EditGroup_Header$key }> = ({
  fragmentRef,
}) => {
  const { id, name } = useFragment(
    graphql`
      fragment EditGroup_Header on Group {
        id
        name
      }
    `,
    fragmentRef
  );

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
  fragmentRef: EditGroup_RequirementsSection$key;
}> = ({ fragmentRef }) => {
  const data = useFragment(
    graphql`
      fragment EditGroup_RequirementsSection on Group {
        id
        name
        requirements {
          ... on ClaimRequirement {
            __typename
            type
            value
          }
        }
      }
    `,
    fragmentRef
  );

  const [commit, isInFlight] =
    useMutation<EditGroup_UpdateGroupRequirements_Mutation>(graphql`
      mutation EditGroup_UpdateGroupRequirements_Mutation(
        $input: UpdateGroupRequirementsInput!
      ) {
        updateGroupRequirements(input: $input) {
          group {
            id
            ...EditGroup_RequirementsSection
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

  const [isEdit, , enable, disable] = useToggle();

  const [selectedRequirementType, setSelectedRequirementType] =
    useState("ClaimRequirement");

  const [requirements, setRequirements] = useState((): Requirements[] => {
    return data.requirements.reduce<Requirements[]>((previous, current) => {
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

  const handleSave = useHandler(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.updateGroupRequirements.group?.id,
        `Updated requirements of ${data.name}`
      ),
      withErrorNotifications((x) => x.updateGroupRequirements?.errors),
    ])({
      variables: {
        input: {
          id: data.id,
          requirements: requirements.map((x) => {
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
    setRequirements((previous) =>
      previous.map((x) => (x.id !== requirement.id ? x : requirement))
    );
  };

  const handleAddRequirement = useHandler(() => {
    const newRequirement = ((): Requirements | undefined => {
      switch (selectedRequirementType) {
        case "ClaimRequirement":
          return { id: id(), kind: "ClaimRequirement", type: "", value: "" };
      }
      return undefined;
    })();

    if (newRequirement) {
      setRequirements((previous) => [...previous, newRequirement]);
    }

    setSelectedRequirementType("ClaimRequirement");
    disable();
  });

  const removeNamespace = useHandler((data: Requirements) =>
    setRequirements((previous) => previous.filter((x) => x.id !== data.id))
  );

  return (
    <>
      <Col span={24} flex={"auto"}>
        <SectionHeader title="Requirements" onAdd={enable} />
        <List
          grid={{
            gutter: 16,
          }}
          dataSource={requirements}
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
        title={`Add  to ${data.name}`}
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
