import React from "react";
import { Route, Routes } from "react-router-dom";
import { FullSizeBox } from "../shared/FullSizeBox";
import { Page } from "../shared/Page";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { Tabs } from "antd";
import { useTabSwitcher } from "../shared/useTabSwitcher";
import { css } from "@emotion/react";
import { Groups } from "./groups/Groups";
import { Roles } from "./roles/Roles";
import { ApiKeys } from "./apiKeys/ApiKeys";

export const Settings: React.FC = (props) => {
  return (
    <Page title="Settings">
      <FullSizeBox
        css={css`
          display: flex;
          flex: 1;
        `}
      >
        <SettingsRoutes />
      </FullSizeBox>
    </Page>
  );
};

export const SettingsRoutes: React.VFC = () => (
  <Routes>
    <Route path=":tab/*" element={<SettingsTabs />} />
  </Routes>
);

const SettingsTabs: React.FC = (props) => {
  const { tab, navigateToTab } = useTabSwitcher();
  return (
    <Tabs
      defaultActiveKey={tab}
      key={tab}
      onChange={navigateToTab}
      items={[
        {
          key: "groups",
          label: "Groups",
          children: (
            <DefaultSuspense>
              <Groups />
            </DefaultSuspense>
          ),
        },
        {
          key: "roles",
          label: "Roles",
          children: (
            <DefaultSuspense>
              <Roles />
            </DefaultSuspense>
          ),
        },
        {
          key: "apikeys",
          label: "Api Keys",
          children: (
            <DefaultSuspense>
              <ApiKeys />
            </DefaultSuspense>
          ),
        },
      ]}
    />
  );
};
