import React, { Suspense, useCallback } from "react";
import { Box } from "@mui/material";
import { Route, Switch, useHistory } from "react-router-dom";
import { FullSizeBox } from "../shared/FullSizeBox";
import { ListWithSearch } from "../shared/ListWithSearch";
import { EditComponent } from "./EditComponent";
import {
  loadQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import RelayEnvironment from "../RelayEnvironment";
import { ComponentsQuery } from "./__generated__/ComponentsQuery.graphql";
import { Components_components$key } from "./__generated__/Components_components.graphql";
import { graphql } from "babel-plugin-relay/macro";
import { NewComponent } from "./NewComponent";
import { PageLoader } from "../shared/DetailView";
import { Components_componentEdge$key } from "./__generated__/Components_componentEdge.graphql";

const componentsQuery = graphql`
  query ComponentsQuery($cursor: String, $count: Int) {
    ...Components_components
  }
`;

const preloadComponentsQuery = loadQuery<ComponentsQuery>(
  RelayEnvironment,
  componentsQuery,
  {}
);

export const Components: React.FC = (props) => {
  const queryData = usePreloadedQuery<ComponentsQuery>(
    componentsQuery,
    preloadComponentsQuery
  );
  const data = usePaginationFragment<
    ComponentsQuery,
    Components_components$key
  >(
    graphql`
      fragment Components_components on Query
      @refetchable(queryName: "ComponentsListPaginationQuery") {
        components(after: $cursor, first: $count)
          @connection(key: "QueryFragment_components") {
          __id
          edges {
            ...Components_componentEdge
          }
        }
      }
    `,
    queryData
  );

  if (!data.data?.components?.edges) {
    return <>false</>;
  }
  return (
    <ComponentsPage
      components={data.data.components.edges}
      connectionId={data.data.components.__id}
    />
  );
};
export const ComponentsPage: React.FC<{
  components: Components_componentEdge$key;
  connectionId: string;
}> = ({ components, connectionId }) => {
  const data = useFragment(
    graphql`
      fragment Components_componentEdge on ComponentsEdge @relay(plural: true) {
        node {
          id
          name
        }
      }
    `,
    components
  );
  const history = useHistory();
  const handleAdd = useCallback(
    () => history.push("/components/new"),
    [history]
  );
  const handleOnItemSelected = useCallback(
    (t: any) => history.push(`/components/edit/${t.id}`),
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
            <Route path="/components/new">
              <NewComponent connectionId={connectionId} />
            </Route>
            <Route path="/components/edit/:id">
              <EditComponent />
            </Route>
          </Switch>
        </Suspense>
      </FullSizeBox>
    </Box>
  );
};
