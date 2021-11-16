import React, { Suspense } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { RelayEnvironmentProvider } from "react-relay";
import RelayEnvironment from "../RelayEnvironment";
import { BrowserRouter } from "react-router-dom";
import { PageLoader } from "./DetailView";

export const Wrapper: React.FC = ({ children }) => (
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </RelayEnvironmentProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
