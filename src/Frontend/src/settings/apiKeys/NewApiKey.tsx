import React, { useState } from "react";
import { Button, Col, Input, message, Row, Tooltip } from "antd";
import { useFragment, useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { DetailView } from "../../shared/DetailView";
import { FormActions, Field } from "../../shared/FormField";
import {
  withErrorNotifications,
  withOnSuccess,
} from "../../shared/pipeCommitFn";
import { useCommitForm } from "../../shared/useCommitForm";
import { useConnectionId } from "../../shared/useConnectionId";
import { useGoTo } from "../../shared/useGoTo";
import { NewApiKeyMutation } from "./__generated__/NewApiKeyMutation.graphql";
import { RoleScopeData, RoleScopeEditor } from "../shared/RoleScopeEdit";
import { CopyOutlined } from "@ant-design/icons";
import { NewApiKey_SuccessMessage$key } from "./__generated__/NewApiKey_SuccessMessage.graphql";

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
          }
          ...NewApiKey_SuccessMessage
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
          (value) => message.success(<SuccessMessage fragmentRef={value} />)
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
  fragmentRef: NewApiKey_SuccessMessage$key;
}> = ({ fragmentRef }) => {
  const { secret } = useFragment(
    graphql`
      fragment NewApiKey_SuccessMessage on ApiKeyWithSecret {
        secret
      }
    `,
    fragmentRef
  );
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
