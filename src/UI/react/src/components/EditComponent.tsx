import { useFormik } from "formik";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { Button, Col, Form, Row } from "antd";
import { DetailView } from "../shared/DetailView";
import { FormActions, FormField } from "../shared/FormField";
import { graphql } from "babel-plugin-relay/macro";
import { EditComponentRenameMutation } from "./__generated__/EditComponentRenameMutation.graphql";
import { useRouteMatch } from "react-router";
import { EditComponentQuery } from "./__generated__/EditComponentQuery.graphql";
import {
  withErrorNotifications,
  withSuccessMessage,
} from "../shared/pipeCommitFn";
import { useCommitForm } from "../shared/useCommitForm";

const componentByIdQuery = graphql`
  query EditComponentQuery($id: ID!) {
    componentById(id: $id) {
      id
      name
      state
      schemaSdl
      schema
      values
      defaults
      schemaViolations {
        path
        code
      }
    }
  }
`;

const editComponentRenameMutation = graphql`
  mutation EditComponentRenameMutation($input: RenameComponentInput!) {
    renameComponent(input: $input) {
      component {
        id
        name
        state
        schemaSdl
        schema
        values
        defaults
        schemaViolations {
          path
          code
        }
      }
    }
  }
`;

export const EditComponent = () => {
  const route = useRouteMatch<{ id: string }>();
  const component = useLazyLoadQuery<EditComponentQuery>(componentByIdQuery, {
    id: route.params.id,
  });
  if (!component.componentById?.id) {
    return (
      <DetailView style={{ padding: 1 }}>Coult not find component</DetailView>
    );
  }
  return <EditComponentForm component={component.componentById} />;
};

const EditComponentForm: React.FC<{
  component: NonNullable<EditComponentQuery["response"]["componentById"]>;
}> = ({ component }) => {
  const [commit, isInFlight] = useMutation<EditComponentRenameMutation>(
    editComponentRenameMutation
  );
  const form = useCommitForm(
    commit,
    {
      name: component.name,
      id: component.id,
    },
    (input) => ({ input }),
    {
      pipes: [
        withSuccessMessage(
          (x) => x.renameComponent.component?.id,
          "Renamed Application"
        ),
        withErrorNotifications(),
      ],
    }
  );
  return (
    <DetailView style={{ padding: 1 }}>
      <Row>
        <Col xs={24}>
          <h2>Edit Component</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <form onSubmitCapture={form.handleSubmit}>
            <FormField form={form} field="name" label="Name" />
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
