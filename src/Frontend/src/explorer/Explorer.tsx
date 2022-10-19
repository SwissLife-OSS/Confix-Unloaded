import React, { useCallback, useState } from "react";
import { FullSizeBox, SidebarHeader } from "../shared/FullSizeBox";
import { SearchBar } from "../shared/SearchBar";
import { Page } from "../shared/Page";
import { css } from "@emotion/react";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { ExplorerDataNode, ExplorerTree } from "./ExplorerTree";
import { Route, Routes, useNavigate } from "react-router";
import { ApplicationRoutes } from "../applications/Applications";
import { ComponentRoutes } from "../components/Components";
import { VariableRoutes } from "../variables/Variables";

export const Explorer: React.FC = (props) => {
  const [search, setSearch] = useState<string | undefined>();
  const navigate = useNavigate();
  const handleExplorerClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, node: ExplorerDataNode) => {
      navigate(node.path);
    },
    [navigate]
  );

  return (
    <Page title="Explorer">
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
        </SidebarHeader>
        <DefaultSuspense>
          <ExplorerTree search={search} onClick={handleExplorerClick} />
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
          <Routes>
            <Route
              path="applications/*"
              element={<ApplicationRoutes />}
            ></Route>
            <Route path="components/*" element={<ComponentRoutes />}></Route>
            <Route path="variables/*" element={<VariableRoutes />}></Route>
          </Routes>
        </DefaultSuspense>
      </FullSizeBox>
    </Page>
  );
};
