import React, { useCallback, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { FullSizeBox, SidebarHeader } from "../shared/FullSizeBox";
import { SearchBar } from "../shared/SearchBar";
import { EditVariable } from "./EditVariable";
import { NewVariable } from "./NewVariable";
import { Page } from "../shared/Page";
import { Routes } from "../routes";
import { css } from "@emotion/react";
import { Button } from "antd";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { VariablesList } from "./VariablesList";

export const Variables: React.FC = (props) => {
  const [search, setSearch] = useState<string | undefined>();
  const history = useHistory();
  const handleAdd = useCallback(
    () => history.push(Routes.variables.new()),
    [history]
  );
  const handleOnItemSelected = useCallback(
    (id: string) => history.push(Routes.variables.edit(id)),
    [history]
  );

  return (
    <Page title="Variables">
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
        </SidebarHeader>
        <DefaultSuspense>
          <VariablesList
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
            <Route path={Routes.variables.new()}>
              <NewVariable />
            </Route>
            <Route path={Routes.variables.edit()}>
              <EditVariable />
            </Route>
          </Switch>
        </DefaultSuspense>
      </FullSizeBox>
    </Page>
  );
};
