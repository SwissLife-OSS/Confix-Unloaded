import React, { useCallback, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { FullSizeBox, SidebarHeader } from "../shared/FullSizeBox";
import { SearchBar } from "../shared/SearchBar";
import { EditComponent } from "./EditComponent";
import { NewComponent } from "./NewComponent";
import { Page } from "../shared/Page";
import { Routes } from "../routes";
import { css } from "@emotion/react";
import { Button } from "antd";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { ComponentsList } from "./ComponentsList";

export const Components: React.FC = (props) => {
  const [search, setSearch] = useState<string | undefined>();
  const history = useHistory();
  const handleAdd = useCallback(
    () => history.push(Routes.components.new()),
    [history]
  );
  const handleOnItemSelected = useCallback(
    (id: string) => history.push(Routes.components.edit(id)),
    [history]
  );

  return (
    <Page title="Components">
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
        </SidebarHeader>
        <DefaultSuspense>
          <ComponentsList onItemSelect={handleOnItemSelected} search={search} />
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
            <Route path={Routes.components.new()}>
              <NewComponent />
            </Route>
            <Route path={Routes.components.edit()}>
              <EditComponent />
            </Route>
          </Switch>
        </DefaultSuspense>
      </FullSizeBox>
    </Page>
  );
};
