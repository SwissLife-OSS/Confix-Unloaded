import React, { Children, ReactNode, Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import RelayEnvironment from "../RelayEnvironment";
import { BrowserRouter } from "react-router-dom";
import { PageLoader } from "./DetailView";
import { css } from "@emotion/react";
import "antd/dist/antd.variable.min.css";
import { Alert, ConfigProvider } from "antd";
import { isNotLoggedInError } from "./useUser";
import { config } from "../config";
import { Colors } from "./colors";

ConfigProvider.config({
  theme: {
    primaryColor: Colors.theme.primary,
  },
});

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <React.StrictMode>
    <BrowserRouter>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <ConfigProvider>
          <RootErrorBoundary>
            <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
          </RootErrorBoundary>
        </ConfigProvider>
      </RelayEnvironmentProvider>
    </BrowserRouter>
  </React.StrictMode>
);

export const FullPageLoader: React.FC<{ message?: string }> = ({ message }) => (
  <div
    css={css`
      height: 100vh;
      width: 100vw;
      display: flex;
    `}
  >
    <PageLoader message={message} />
  </div>
);

interface RootErrorBoundaryProps {
  children: React.ReactNode;
}

type RootErrorBoundaryState =
  | { kind: "clear" }
  | { kind: "requires-sign-in" }
  | { kind: "error"; error: { message?: string } };

export class RootErrorBoundary extends React.Component<
  RootErrorBoundaryProps,
  RootErrorBoundaryState
> {
  constructor(props: RootErrorBoundaryProps) {
    super(props);
    this.state = { kind: "clear" };
  }
  static getDerivedStateFromError(error: Error): RootErrorBoundaryState {
    if (isNotLoggedInError(error)) {
      return { kind: "requires-sign-in" };
    }

    return { kind: "error", error: { message: error.message } };
  }
  render() {
    switch (this.state.kind) {
      case "clear":
        return this.props.children;
      case "error":
        return (
          <Alert
            message="Oops, there was an error"
            description={this.state.error.message ?? "No description provided"}
            type="error"
          />
        );
      case "requires-sign-in":
        window.location.href =
          config.identity.signInPath +
          "?returnUrl=" +
          encodeURI(window.location.href.replace(window.location.origin, ""));
        return <FullPageLoader message={"Authenticating ... "} />;
    }
  }
}
