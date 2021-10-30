import React, { Suspense, useCallback } from "react";
import { Box } from "@mui/material";
import { Route, Switch, useHistory } from "react-router-dom";
import { FullSizeBox } from "../shared/FullSizeBox";
import { ListWithSearch } from "../shared/ListWithSearch";
import { EditApplication } from "./EditApplication";
import {
  loadQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import RelayEnvironment from "../RelayEnvironment";
import { ApplicationsQuery } from "./__generated__/ApplicationsQuery.graphql";
import { Applications_applications$key } from "./__generated__/Applications_applications.graphql";
import { graphql } from "babel-plugin-relay/macro";
import { NewApplication } from "./NewApplication";
import { PageLoader } from "../shared/DetailView";
import { Applications_applicationEdge$key } from "./__generated__/Applications_applicationEdge.graphql";

const applicationsQuery = graphql`
  query ApplicationsQuery($cursor: String, $count: Int) {
    ...Applications_applications
  }
`;

const preloadApplicationsQuery = loadQuery<ApplicationsQuery>(
  RelayEnvironment,
  applicationsQuery,
  {}
);

export const Applications: React.FC = (props) => {
  const queryData = usePreloadedQuery<ApplicationsQuery>(
    applicationsQuery,
    preloadApplicationsQuery
  );
  const data = usePaginationFragment<
    ApplicationsQuery,
    Applications_applications$key
  >(
    graphql`
      fragment Applications_applications on Query
      @refetchable(queryName: "ApplicationsListPaginationQuery") {
        applications(after: $cursor, first: $count)
          @connection(key: "QueryFragment_applications") {
          __id
          edges {
            ...Applications_applicationEdge
          }
        }
      }
    `,
    queryData
  );

  if (!data.data?.applications?.edges) {
    return <>false</>;
  }
  return (
    <ApplicationsPage
      applications={data.data.applications.edges}
      connectionId={data.data.applications.__id}
    />
  );
};
export const ApplicationsPage: React.FC<{
  applications: Applications_applicationEdge$key;
  connectionId: string;
}> = ({ applications, connectionId }) => {
  const data = useFragment(
    graphql`
      fragment Applications_applicationEdge on ApplicationsEdge
      @relay(plural: true) {
        node {
          id
          name
          namespace
        }
      }
    `,
    applications
  );
  const history = useHistory();
  const handleAdd = useCallback(
    () => history.push("/applications/new"),
    [history]
  );
  const handleOnItemSelected = useCallback(
    (t: any) => history.push(`/applications/edit/${t.id}`),
    [history]
  );

  return (
    <Box sx={{ maxHeight: "100%", display: "flex", flex: 1 }}>
      <FullSizeBox sx={{ display: "flex", flexDirection: "column" }}>
        <ListWithSearch
          onAdd={handleAdd}
          items={data.map((x) => x.node)}
          label="name"
          id="id"
          onItemSelect={handleOnItemSelected}
        />
      </FullSizeBox>
      <FullSizeBox sx={{ display: "flex", flex: 1, paddingLeft: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/applications/new">
              <NewApplication connectionId={connectionId} />
            </Route>
            <Route path="/applications/edit/:id">
              <EditApplication />
            </Route>
          </Switch>
        </Suspense>
      </FullSizeBox>
    </Box>
  );
};
