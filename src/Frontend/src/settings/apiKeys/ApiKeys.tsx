import { css } from "@emotion/react";
import { Button } from "antd";
import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { DefaultSuspense } from "../../shared/DefaultSuspense";
import { FullSizeBox, SidebarHeader } from "../../shared/FullSizeBox";
import { InlinePage } from "../../shared/InlinePage";
import { SearchBar } from "../../shared/SearchBar";
import { useGoTo } from "../../shared/useGoTo";
import { ApiKeysList } from "./ApiKeysList";
import { EditApiKey } from "./EditApiKey";
import { NewApiKey } from "./NewApiKey";

export const ApiKeys: React.FC = (props) => {
  const [search, setSearch] = useState<string | undefined>();
  const handleOnItemSelected = useGoTo((id: string) => `${id}/edit`);

  return (
    <InlinePage>
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Link to={"new"}>
            <Button type="primary">Add</Button>
          </Link>
        </SidebarHeader>
        <DefaultSuspense>
          <ApiKeysList onItemSelect={handleOnItemSelected} search={search} />
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
          <ApiKeyRoutes />
        </DefaultSuspense>
      </FullSizeBox>
    </InlinePage>
  );
};

export const ApiKeyRoutes: React.VFC = () => (
  <Routes>
    <Route path="new" element={<NewApiKey />} />
    <Route path={":apiKeyId/edit"} element={<EditApiKey />} />
  </Routes>
);
