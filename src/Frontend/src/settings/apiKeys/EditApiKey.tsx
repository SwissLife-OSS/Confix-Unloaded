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

const apiKeyByIdQuery = graphql`
  query EditApiKeyQuery($id: ID!) {
    apiKeyById(id: $id) {
      id
      ...EditApiKey_ApiKey
    }
  }
`;

const editApiKeyFragment = graphql`
  fragment EditApiKey_ApiKey on ApiKey {
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
`;

export const EditApiKey = () => {
  const { apiKeyId = "" } = useParams();
  const apiKey = useLazyLoadQuery<EditApiKeyQuery>(apiKeyByIdQuery, {
    id: apiKeyId,
  });
  const id = apiKey.apiKeyById?.id;
  if (!id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find apiKey </DetailView>
    );
  }
  return <EditApiKeyForm data={apiKey.apiKeyById} id={id} key={id} />;
};

const EditApiKeyForm: React.FC<{
  id: string;
  data: NonNullable<EditApiKeyQuery["response"]["apiKeyById"]>;
}> = ({ data, id }) => {
  const apiKey = useFragment<EditApiKey_ApiKey$key>(editApiKeyFragment, data);
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
          <Header name={apiKey.name} />
        </Col>
      </Row>
      <Row>
        <RoleScopeSection $data={data} apiKeyId={apiKey.id} />
      </Row>
    </DetailView>
  );
};

const RoleScopeSection: React.FC<{
  $data: EditApiKey_ApiKey$key;
  apiKeyId: string;
}> = ({ $data, apiKeyId }) => {
  const apiKey = useFragment<EditApiKey_ApiKey$key>(editApiKeyFragment, $data);
  const [data, setData] = useState((): RoleScopeData[] => {
    return apiKey.roles.map<RoleScopeData>((x) => ({
      key: x.namespace,
      namespace: x.namespace,
      roles: x.roles,
    }));
  });

  const [commit, isInFlight] =
    useMutation<EditApiKey_UpdateApiKeyRoles_Mutation>(graphql`
      mutation EditApiKey_UpdateApiKeyRoles_Mutation(
        $input: UpdateApiKeyInput!
      ) {
        updateApiKey(input: $input) {
          apiKey {
            id
            ...EditApiKey_ApiKey
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
        (x) => x.updateApiKey.apiKey?.id,
        `Updated requirements of ${apiKey.name}`
      ),
      withErrorNotifications((x) => x.updateApiKey?.errors),
    ])({
      variables: {
        input: {
          id: apiKeyId,
          roles: data.map((x) => ({
            namespace: x.namespace,
            roleIds: x.roles.map((r) => r.id),
          })),
        },
      },
    });
  });

  return (
    <>
      <RoleScopeEditor data={data} onChange={setData} />
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

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <EditableBreadcrumbHeader title={name} isEditable={false} />;
};
