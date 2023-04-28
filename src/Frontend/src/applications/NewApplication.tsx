import {Button, Col, Row} from 'antd';
import {FormActions, FormField, TagSelectField} from '../shared/FormField';
import {
  withErrorNotifications,
  withOnSuccess,
  withSuccessMessage,
} from '../shared/pipeCommitFn';

import {Connections} from '../Connections';
import {DetailView} from '../shared/DetailView';
import {NewApplicationMutation} from '@generated/NewApplicationMutation.graphql';
import React from 'react';
import {graphql} from 'babel-plugin-relay/macro';
import {useCommitForm} from '../shared/useCommitForm';
import {useConnectionId} from '../shared/useConnectionId';
import {useGoTo} from '../shared/useGoTo';
import {useMutation} from 'react-relay';

export const NewApplication: React.FC = () => {
  const [commit, isInFlight] = useMutation<NewApplicationMutation>(
    graphql`
      mutation NewApplicationMutation(
        $input: CreateApplicationInput!
        $connectionIds: [ID!]!
      ) {
        createApplication(input: $input) {
          application
            @prependNode(
              connections: $connectionIds
              edgeTypeName: "ApplicationsEdge"
            ) {
            id
            ...ApplicationsListItem
          }
          errors {
            ... on UserError {
              message
              code
            }
          }
        }
      }
    `,
  );

  const goToEdit = useGoTo((id?: string) => `../${id}/edit`);
  const connectionId = useConnectionId(Connections.applications.name);

  const form = useCommitForm(
    commit,
    {name: '', namespace: '', parts: []},
    (input) => ({input, connectionIds: [connectionId]}),
    {
      pipes: [
        withErrorNotifications((x) => x.createApplication?.errors),
        withOnSuccess((x) => x.createApplication.application?.id, goToEdit),
        withSuccessMessage(
          (x) => x.createApplication.application?.id,
          'Application Created',
        ),
      ],
    },
  );

  return (
    <DetailView style={{padding: 1}}>
      <Row>
        <Col xs={24}>
          <h2>New Application</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <form onSubmit={form.handleSubmit}>
            <FormField form={form} field="name" label="Name" />
            <FormField form={form} field="namespace" label="Namespace" />
            <TagSelectField form={form} field="parts" label="Parts" />
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
