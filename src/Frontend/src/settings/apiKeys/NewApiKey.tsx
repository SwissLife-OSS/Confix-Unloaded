import { Button, Col, Input, Row, Tooltip, message } from "antd";
import { Field, FormActions } from "../../shared/FormField";
import React, { useState } from "react";
import { RoleScopeData, RoleScopeEditor } from "../shared/RoleScopeEdit";
import {
  withErrorNotifications,
  withOnSuccess,
} from "../../shared/pipeCommitFn";

import { CopyOutlined } from "@ant-design/icons";
import { DetailView } from "../../shared/DetailView";
import { NewApiKeyMutation } from "@generated/NewApiKeyMutation.graphql";
import { graphql } from "babel-plugin-relay/macro";
import { useCommitForm } from "../../shared/useCommitForm";
import { useConnectionId } from "../../shared/useConnectionId";
import { useGoTo } from "../../shared/useGoTo";
import { useMutation } from "react-relay";

export const NewApiKey: React.FC = () => {
  const [commit, isInFlight] = useMutation<NewApiKeyMutation>(graphql`
    mutation NewApiKeyMutation(
      $input: CreateApiKeyInput!
      $connectionIds: [ID!]!
    ) {
      createApiKey(input: $input) {
        apiKeyWithSecret {
          key
            @appendNode(
              connections: $connectionIds
              edgeTypeName: "ApiKeysEdge"
            ) {
            id
            ...ApiKeysList_ApiKeyListItem
          }
          secret
        }
        errors {
          ... on UserError {
            message
            code
          }
        }
      }
    }
  `);

  const [data, setData] = useState<RoleScopeData[]>([]);
  const [name, setName] = useState("");

  const connectionIds = [
    useConnectionId("useApiKeys_searchApiKeys"),
    useConnectionId("Query__apiKeys"),
  ];
  const goToEdit = useGoTo((id: string) => `${id}/edit`);

  const form = useCommitForm(
    commit,
    {
      name,
      roles: data.map((x) => ({
        namespace: x.namespace,
        roleIds: x.roles.map((r) => r.id),
      })),
    },
    (input) => ({ input, connectionIds }),
    {
      pipes: [
        withErrorNotifications((x) => x.createApiKey?.errors),
        withOnSuccess((x) => x.createApiKey.apiKeyWithSecret?.key.id, goToEdit),
        withOnSuccess(
          (x) => x.createApiKey.apiKeyWithSecret,
          (value) => message.success(<SuccessMessage secret={value.secret} />)
        ),
      ],
    }
  );
  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <h2>New ApiKey</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <form onSubmitCapture={form.handleSubmit}>
            <Field name="name" label="Name">
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <RoleScopeEditor data={data} onChange={setData} />
            <FormActions>
              <Button type="primary" htmlType="submit" loading={isInFlight}>
                Submit
              </Button>
            </FormActions>
          </form>
        </Col>
      </Row>
    </DetailView>
  );
};

const SuccessMessage: React.FC<{
  secret: string;
}> = ({ secret }) => {
  return (
    <div style={{ minWidth: "300px" }}>
      Api key created! <br />
      Safe your secret key:
      <Input.Group compact>
        <Input readOnly value={secret}></Input>
        <Tooltip title="Copy">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(secret);
            }}
            icon={<CopyOutlined />}
          />
        </Tooltip>
      </Input.Group>
    </div>
  );
};
