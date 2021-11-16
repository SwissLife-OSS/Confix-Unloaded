import { Button, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { FormField, ReadOnlyFormField } from "../shared/FormField";
import { componentSchema } from "./componentSchema";
import { graphql } from "babel-plugin-relay/macro";
import { EditComponentRenameMutation } from "./__generated__/EditComponentRenameMutation.graphql";
import { useRouteMatch } from "react-router";
import { EditComponentQuery } from "./__generated__/EditComponentQuery.graphql";

export const EditComponent = () => {
  const route = useRouteMatch<{ id: string }>();
  const component = useLazyLoadQuery<EditComponentQuery>(
    graphql`
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
    `,
    { id: route.params.id }
  );
  if (!component.componentById?.id) {
    return (
      <DetailView sx={{ padding: 1 }}>Coult not find component</DetailView>
    );
  }
  return <EditComponentForm component={component.componentById} />;
};

const EditComponentForm: React.FC<{
  component: NonNullable<EditComponentQuery["response"]["componentById"]>;
}> = ({ component }) => {
  const [commit, isInFlight] = useMutation<EditComponentRenameMutation>(graphql`
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
  `);
  const form = useFormik({
    initialValues: {
      name: component.name,
      id: component.id,
    },
    onSubmit: (values) => {
      commit({
        variables: { input: values },
        onCompleted: (response) => {
          console.log(response);
        },
      });
    },
  });
  return (
    <DetailView sx={{ padding: 1 }}>
      <form onSubmit={form.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h2">Edit Component</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormField form={form} field="name" label="Name" />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                disabled={isInFlight}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </DetailView>
  );
};
