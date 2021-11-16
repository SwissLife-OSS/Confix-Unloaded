import React, { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import RelayEnvironment from "../RelayEnvironment";
import { BrowserRouter } from "react-router-dom";
import { PageLoader } from "./DetailView";
import { css } from "@emotion/react";

export const Wrapper: React.FC = ({ children }) => (
  <React.StrictMode>
    <BrowserRouter>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
      </RelayEnvironmentProvider>
    </BrowserRouter>
  </React.StrictMode>
);

export const FullPageLoader = () => (
  <div
    css={css`
      height: 100vh;
      width: 100vw;
      display: flex;
    `}
  >
    <PageLoader />
  </div>
);
