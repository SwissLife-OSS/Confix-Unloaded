import { Button, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { FormField, ReadOnlyFormField } from "../shared/FormField";
import { applicationSchema } from "./applicationSchema";
import { graphql } from "babel-plugin-relay/macro";
import { EditApplicationRenameMutation } from "./__generated__/EditApplicationRenameMutation.graphql";
import { useRouteMatch } from "react-router";
import { EditApplicationQuery } from "./__generated__/EditApplicationQuery.graphql";

export const EditApplication = () => {
  const route = useRouteMatch<{ id: string }>();
  const application = useLazyLoadQuery<EditApplicationQuery>(
    graphql`
      query EditApplicationQuery($id: ID!) {
        applicationById(id: $id) {
          id
          name
          namespace
        }
      }
    `,
    { id: route.params.id }
  );
  if (!application.applicationById?.id) {
    return (
      <DetailView sx={{ padding: 1 }}>Coult not find application</DetailView>
    );
  }
  return <EditApplicationForm application={application.applicationById} />;
};

const EditApplicationForm: React.FC<{
  application: NonNullable<EditApplicationQuery["response"]["applicationById"]>;
}> = ({ application }) => {
  const [commit, isInFlight] =
    useMutation<EditApplicationRenameMutation>(graphql`
      mutation EditApplicationRenameMutation($input: RenameApplicationInput!) {
        renameApplication(input: $input) {
          application {
            id
            name
            namespace
          }
          errors {
            ... on IUserError {
              message
              code
            }
          }
        }
      }
    `);
  const form = useFormik({
    initialValues: {
      name: application.name,
      id: application.id,
    },
    onSubmit: (values) => {
      commit({
        variables: { input: values },
        onCompleted: (response) => {
          if ((response.renameApplication.errors?.length ?? 0) > 0) {
            console.error(response);
          } else {
            console.log(response);
          }
        },
      });
    },
  });
  return (
    <DetailView sx={{ padding: 1 }}>
      <form onSubmit={form.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h2">Edit Application</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormField form={form} field="name" label="Name" />
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyFormField
              value={application.namespace}
              label="Namespace"
            />
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
