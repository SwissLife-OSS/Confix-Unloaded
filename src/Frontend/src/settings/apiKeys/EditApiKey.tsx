import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { Button, Col, Row } from "antd";
import { DetailView } from "../../shared/DetailView";
import { graphql } from "babel-plugin-relay/macro";
import { EditApiKeyQuery } from "./__generated__/EditApiKeyQuery.graphql";
import { EditableBreadcrumbHeader } from "../../shared/EditablePageHeader";
import React, { useState } from "react";
import { EditApiKey_ApiKey$key } from "./__generated__/EditApiKey_ApiKey.graphql";
import { css } from "@emotion/react";
import { useParams } from "react-router";
import { useHandler } from "../../shared/useHandler";
import { FormActions } from "../../shared/FormField";
import { EditApiKey_UpdateApiKeyRoles_Mutation } from "./__generated__/EditApiKey_UpdateApiKeyRoles_Mutation.graphql";
import {
  pipeCommitFn,
  withErrorNotifications,
  withSuccessMessage,
} from "../../shared/pipeCommitFn";
import { RoleScopeData, RoleScopeEditor } from "../shared/RoleScopeEdit";
import { EditApiKey_RoleScopeSection$key } from "./__generated__/EditApiKey_RoleScopeSection.graphql";
import { EditApiKey_Form$key } from "./__generated__/EditApiKey_Form.graphql";
import { EditApiKey_Header$key } from "./__generated__/EditApiKey_Header.graphql";

export const EditApiKey = () => {
  const { apiKeyId = "" } = useParams();
  const data = useLazyLoadQuery<EditApiKeyQuery>(
    graphql`
      query EditApiKeyQuery($id: ID!) {
        apiKeyById(id: $id) {
          id
          ...EditApiKey_Form
        }
      }
    `,
    {
      id: apiKeyId,
    }
  );

  const id = data.apiKeyById?.id;

  if (!id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find apiKey </DetailView>
    );
  }

  return <Form fragmentRef={data.apiKeyById} key={id} />;
};

const Form: React.FC<{
  fragmentRef: EditApiKey_Form$key;
}> = ({ fragmentRef }) => {
  const data = useFragment(
    graphql`
      fragment EditApiKey_Form on ApiKey {
        ...EditApiKey_RoleScopeSection
        ...EditApiKey_Header
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
    </DetailView>
  );
};

const RoleScopeSection: React.FC<{
  fragmentRef: EditApiKey_RoleScopeSection$key;
}> = ({ fragmentRef }) => {
  const data = useFragment(
    graphql`
      fragment EditApiKey_RoleScopeSection on ApiKey {
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

  const [commit, isInFlight] =
    useMutation<EditApiKey_UpdateApiKeyRoles_Mutation>(graphql`
      mutation EditApiKey_UpdateApiKeyRoles_Mutation(
        $input: UpdateApiKeyInput!
      ) {
        updateApiKey(input: $input) {
          apiKey {
            id
            roles {
              namespace
              roles {
                id
                name
              }
            }
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

  const [roleScope, setRoleScopes] = useState((): RoleScopeData[] => {
    return data.roles.map<RoleScopeData>((x) => ({
      key: x.namespace,
      namespace: x.namespace,
      roles: x.roles,
    }));
  });

  const handleSave = useHandler(() => {
    pipeCommitFn(commit, [
      withSuccessMessage(
        (x) => x.updateApiKey.apiKey?.id,
        `Updated requirements of ${data.name}`
      ),
      withErrorNotifications((x) => x.updateApiKey?.errors),
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
      <RoleScopeEditor data={roleScope} onChange={setRoleScopes} />
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

const Header: React.FC<{ fragmentRef: EditApiKey_Header$key }> = ({
  fragmentRef,
}) => {
  const { name } = useFragment(
    graphql`
      fragment EditApiKey_Header on ApiKey {
        name
      }
    `,
    fragmentRef
  );

  return <EditableBreadcrumbHeader title={name} isEditable={false} />;
};
