import React, { useCallback, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { FullSizeBox, SidebarHeader } from "../shared/FullSizeBox";
import { SearchBar } from "../shared/SearchBar";
import { EditEnvironment } from "./EditEnvironment";
import { NewEnvironment } from "./NewEnvironment";
import { Page } from "../shared/Page";
import { Routes } from "../routes";
import { css } from "@emotion/react";
import { Button } from "antd";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { EnvironmentsList } from "./EnvironmentsList";

export const Environments: React.FC = (props) => {
  const [search, setSearch] = useState<string | undefined>();
  const history = useHistory();
  const handleAdd = useCallback(
    () => history.push(Routes.environments.new()),
    [history]
  );
  const handleOnItemSelected = useCallback(
    (id: string) => history.push(Routes.environments.edit(id)),
    [history]
  );

  return (
    <Page title="Environments">
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
        </SidebarHeader>
        <DefaultSuspense>
          <EnvironmentsList
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
            <Route path={Routes.environments.new()}>
              <NewEnvironment />
            </Route>
            <Route path={Routes.environments.edit()}>
              <EditEnvironment />
            </Route>
          </Switch>
        </DefaultSuspense>
      </FullSizeBox>
    </Page>
  );
};
