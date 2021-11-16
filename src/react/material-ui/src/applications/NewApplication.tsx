import { Button, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import { ConnectionHandler, useMutation } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { FormField } from "../shared/FormField";
import { applicationSchema } from "./applicationSchema";
import { graphql } from "babel-plugin-relay/macro";
import { NewApplicationMutation } from "./__generated__/NewApplicationMutation.graphql";

export const NewApplication: React.FC<{
  connectionId: string;
}> = ({ connectionId }) => {
  const [commit, isInFlight] = useMutation<NewApplicationMutation>(graphql`
    mutation NewApplicationMutation(
      $input: CreateApplicationInput!
      $connectionIds: [String!]!
    ) {
      createApplication(input: $input) {
        application
          @appendNode(
            connections: $connectionIds
            edgeTypeName: "ApplicationsEdge"
          ) {
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
    initialValues: { name: "", namespace: "", parts: [] },
    validationSchema: applicationSchema,
    onSubmit: (values) => {
      commit({
        variables: { input: values, connectionIds: [connectionId] },
        onCompleted: (response) => {
          if ((response.createApplication.errors?.length ?? 0) > 0) {
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
            <Typography variant="h2">New Application</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormField form={form} field="name" label="Name" />
          </Grid>
          <Grid item xs={12}>
            <FormField form={form} field="namespace" label="Namespace" />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                disabled={isInFlight}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </DetailView>
  );
};
