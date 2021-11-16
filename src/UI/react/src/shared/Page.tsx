import React from "react";
import { css } from "@emotion/react";
import { PageHeader } from "antd";
import { Settings } from "../settings";

export const Page: React.FC<{ title: string; subTitle?: string }> = ({
  title,
  subTitle = "",
  children,
}) => {
  return (
    <>
      <PageHeader title={title} subTitle={subTitle} />
      <div
        css={css`
          max-height: calc(
            100vh - ${Settings.appBar.height}px - ${Settings.page.padding}px
          );
          min-height: 500px;
          display: flex;
          flex: 0 1 auto;
        `}
      >
        {children}
      </div>
    </>
  );
};
