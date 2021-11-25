import React, { useState } from "react";
import { matchPath, Route, Switch, useLocation } from "react-router-dom";
import { FullSizeBox, SidebarHeader } from "../shared/FullSizeBox";
import { SearchBar } from "../shared/SearchBar";
import { EditApplication } from "./EditApplication";
import { NewApplication } from "./NewApplication";
import { Page } from "../shared/Page";
import { Routes } from "../routes";
import { css } from "@emotion/react";
import { Button } from "antd";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { ApplicationList } from "./ApplicationsList";
import { useGoTo } from "../shared/useGoTo";
import { EditApplicationPart } from "./EditApplicationPart";
import { EditApplicationPartComponent } from "./EditApplicationPartComponent";

export const Applications: React.FC = () => {
  const [search, setSearch] = useState<string | undefined>();

  const applicationId = useApplicationIdFromRoute();
  const handleAdd = useGoTo(Routes.applications.new);
  const handleOnItemSelected = useGoTo(Routes.applications.edit);

  return (
    <Page title="Applications">
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
        </SidebarHeader>
        <DefaultSuspense>
          <ApplicationList
            selectedApplicationId={applicationId}
            onItemSelect={handleOnItemSelected}
            search={search}
          />
        </DefaultSuspense>
      </FullSizeBox>
      <FullSizeBox
        css={css`
          display: flex;
          flex: 1;
          padding-left: 10px;
          margin-left: 10px;
        `}
      >
        <DefaultSuspense>
          <Switch>
            <Route path={Routes.applications.new()}>
              <NewApplication />
            </Route>
            <Route path={Routes.applicationPartComponents.edit()} strict>
              <EditApplicationPartComponent />
            </Route>
            <Route path={Routes.applicationParts.edit()} strict>
              <EditApplicationPart />
            </Route>
            <Route path={Routes.applications.edit()} strict>
              <EditApplication />
            </Route>
          </Switch>
        </DefaultSuspense>
      </FullSizeBox>
    </Page>
  );
};

const useApplicationIdFromRoute = (): string | undefined => {
  const routeMatch = useLocation();
  const match = matchPath<{ applicationId?: string }>(routeMatch.pathname, {
    path: Routes.applications.edit(),
    strict: false,
  });
  return match?.params?.applicationId;
};
