import React, { useCallback } from "react";
import { Checkbox, Col, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import {
  PermissionInput,
  PermissionsFlagsInput,
} from "../../__generated__/NewRoleMutation.graphql";
import { Scope } from "../../__generated__/EditRole_Role.graphql";
import { noop } from "../../../../shared/noop";
import styled from "@emotion/styled";
import { EditRole_Form$data } from "../../__generated__/EditRole_Form.graphql";

export interface Permissions {
  identity: {
    isRead: boolean;
    isWrite: boolean;
  };
  application: {
    isRead: boolean;
    isWrite: boolean;
    isPublish: boolean;
    isClaim: boolean;
  };
  configuration: {
    isRead: boolean;
    isWrite: boolean;
  };
  component: {
    isRead: boolean;
    isWrite: boolean;
  };
  variable: {
    isRead: boolean;
    isWrite: boolean;
    isDecrypt: boolean;
  };
}

export const mapPermissionsToInput = (data: Permissions): PermissionInput[] => {
  const input: PermissionInput[] = [];

  function mapFlags(
    permissions: Partial<Record<AllPermissions, boolean>>
  ): Required<PermissionsFlagsInput> {
    return {
      isClaim: permissions.isClaim ?? false,
      isDecrypt: permissions.isDecrypt ?? false,
      isPublish: permissions.isPublish ?? false,
      isRead: permissions.isRead ?? false,
      isWrite: permissions.isWrite ?? false,
    };
  }

  function hasFlag(
    permissions: Partial<Record<AllPermissions, boolean>>
  ): boolean {
    return (
      !!permissions.isClaim ||
      !!permissions.isDecrypt ||
      !!permissions.isPublish ||
      !!permissions.isRead ||
      !!permissions.isWrite
    );
  }

  function addWhenHasFlag(
    scope: Scope,
    permissions: Partial<Record<AllPermissions, boolean>>
  ) {
    if (hasFlag(permissions)) {
      input.push({
        scope,
        permissions: mapFlags(permissions),
      });
    }
  }

  addWhenHasFlag("APPLICATION", data.application);
  addWhenHasFlag("COMPONENT", data.component);
  addWhenHasFlag("CONFIGURATION", data.configuration);
  addWhenHasFlag("IDENTITY", data.identity);
  addWhenHasFlag("VARIABLE", data.variable);

  return input;
};

export const mapPermissionsFromObjectType = (
  data: EditRole_Form$data
): Permissions => {
  let permissions = createDefaultPermissions();
  function map<TKeys extends AllPermissions>(
    keys: TKeys[],
    data: EditRole_Form$data["permissions"][number]["permissions"]
  ): {
    [Key in TKeys]: boolean;
  } {
    const value: {
      [Key in TKeys]: boolean;
    } = {} as any;
    for (const key of keys) {
      value[key] = data[key];
    }
    return value;
  }
  for (const permission of data.permissions) {
    switch (permission.scope) {
      case "APPLICATION":
        permissions.application = map(
          ["isClaim", "isPublish", "isRead", "isWrite"],
          permission.permissions
        );
        continue;
      case "COMPONENT":
        permissions.component = map(
          ["isRead", "isWrite"],
          permission.permissions
        );
        continue;
      case "CONFIGURATION":
        permissions.configuration = map(
          ["isRead", "isWrite"],
          permission.permissions
        );
        continue;
      case "IDENTITY":
        permissions.identity = map(
          ["isRead", "isWrite"],
          permission.permissions
        );
        continue;
      case "VARIABLE":
        permissions.variable = map(
          ["isRead", "isWrite", "isDecrypt"],
          permission.permissions
        );
        continue;
    }
  }

  return permissions;
};
export const createDefaultPermissions = (): Permissions => ({
  identity: {
    isRead: false,
    isWrite: false,
  },
  application: {
    isRead: false,
    isWrite: false,
    isPublish: false,
    isClaim: false,
  },
  configuration: {
    isRead: false,
    isWrite: false,
  },
  component: {
    isRead: false,
    isWrite: false,
  },
  variable: {
    isRead: false,
    isWrite: false,
    isDecrypt: false,
  },
});

export const PermissionsForm: React.FC<{
  permissions: Permissions;
  onChange?: (value: Permissions) => void;
}> = ({ permissions, onChange = noop }) => {
  return (
    <>
      <Row gutter={[15, 15]}>
        <Col span={24}>
          <Title>Identity</Title>
        </Col>
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="identity"
          permission="isRead"
        />
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="identity"
          permission="isWrite"
        />
      </Row>
      <Row gutter={[15, 15]}>
        <Col span={24}>
          <Title>Application</Title>
        </Col>
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="application"
          permission="isRead"
        />
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="application"
          permission="isWrite"
        />
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="application"
          permission="isClaim"
        />
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="application"
          permission="isPublish"
        />
      </Row>
      <Row gutter={[15, 15]}>
        <Col span={24}>
          <Title>Configuration</Title>
        </Col>
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="configuration"
          permission="isRead"
        />
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="configuration"
          permission="isWrite"
        />
      </Row>
      <Row gutter={[15, 15]}>
        <Col span={24}>Component</Col>
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="component"
          permission="isRead"
        />
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="component"
          permission="isWrite"
        />
      </Row>
      <Row gutter={[15, 15]}>
        <Col span={24}>
          <Title>Variable</Title>
        </Col>
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="variable"
          permission="isRead"
        />
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="variable"
          permission="isWrite"
        />
        <Permission
          permissions={permissions}
          onChange={onChange}
          scope="variable"
          permission="isDecrypt"
        />
      </Row>
    </>
  );
};

export function Permission<
  T extends keyof Permissions,
  TPermission extends keyof Permissions[T]
>(props: {
  permissions: Permissions;
  scope: T;
  permission: TPermission;
  onChange: (value: Permissions) => void;
}) {
  const { permissions, onChange, scope, permission } = props;
  const handleChange = useCallback(
    (e: CheckboxChangeEvent) => {
      onChange({
        ...permissions,
        [scope]: { ...permissions[scope], [permission]: e.target.checked },
      });
    },
    [onChange, permission, permissions, scope]
  );
  return (
    <Col span={12}>
      <Checkbox
        onChange={handleChange}
        checked={!!permissions[scope][permission]}
      >
        {Names[permission as AllPermissions]}
      </Checkbox>
    </Col>
  );
}

type AllKeys<T> = T extends any ? keyof T : never;

type AllPermissions = AllKeys<Permissions[keyof Permissions]>;

const Names: Record<AllPermissions, string> = {
  isRead: "Read",
  isWrite: "Write",
  isClaim: "Claim",
  isPublish: "Publish",
  isDecrypt: "Decrypt",
};

const Title = styled.span`
  flex: 1;
  font-size: 16px;
`;
