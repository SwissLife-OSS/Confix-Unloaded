import { Button, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import { ConnectionHandler, useMutation } from "react-relay";
import { DetailView } from "../shared/DetailView";
import { FormField } from "../shared/FormField";
import { componentSchema } from "./componentSchema";
import { graphql } from "babel-plugin-relay/macro";
import { NewComponentMutation } from "./__generated__/NewComponentMutation.graphql";

export const NewComponent: React.FC<{
  connectionId: string;
}> = ({ connectionId }) => {
  const [commit, isInFlight] = useMutation<NewComponentMutation>(graphql`
    mutation NewComponentMutation(
      $input: CreateComponentInput!
      $connectionIds: [String!]!
    ) {
      createComponent(input: $input) {
        component
          @appendNode(
            connections: $connectionIds
            edgeTypeName: "ComponentsEdge"
          ) {
          id
          name
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
    initialValues: { name: "", schema: "" },
    validationSchema: componentSchema,
    onSubmit: (values) => {
      commit({
        variables: { input: values, connectionIds: [connectionId] },
        onCompleted: (response) => {
          if ((response.createComponent.errors?.length ?? 0) > 0) {
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
            <Typography variant="h2">New Component</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormField form={form} field="name" label="Name" />
          </Grid>
          <Grid item xs={12}>
            <FormField form={form} field="schema" label="Schema" />
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
