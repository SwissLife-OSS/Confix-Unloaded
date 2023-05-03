import 'antd/dist/antd.variable.min.css';

import {Alert, ConfigProvider} from 'antd';
import React, {ReactNode, Suspense} from 'react';

import {BrowserRouter} from 'react-router-dom';
import {Colors} from './colors';
import {PageLoader} from './DetailView';
import RelayEnvironment from '../RelayEnvironment';
import {RelayEnvironmentProvider} from 'react-relay';
import {UserContextProvider} from './UserContext';
import {config} from '../config';
import {css} from '@emotion/react';

ConfigProvider.config({
  theme: {
    primaryColor: Colors.theme.primary,
  },
});

export const Wrapper: React.FC<{children: ReactNode}> = ({children}) => (
  <React.StrictMode>
    <BrowserRouter>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <ConfigProvider>
          <RootErrorBoundary>
            <Suspense fallback={<FullPageLoader />}>
              <UserContextProvider>{children}</UserContextProvider>
            </Suspense>
          </RootErrorBoundary>
        </ConfigProvider>
      </RelayEnvironmentProvider>
    </BrowserRouter>
  </React.StrictMode>
);

export const FullPageLoader: React.FC<{message?: string}> = ({message}) => (
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
  | {kind: 'clear'}
  | {kind: 'error'; error: {message?: string}};

export class RootErrorBoundary extends React.Component<
  RootErrorBoundaryProps,
  RootErrorBoundaryState
> {
  constructor(props: RootErrorBoundaryProps) {
    super(props);
    this.state = {kind: 'clear'};
  }

  static getDerivedStateFromError(error: Error): RootErrorBoundaryState {
    return {kind: 'error', error};
  }
  render() {
    switch (this.state.kind) {
      case 'clear':
        return this.props.children;
      case 'error':
        return (
          <Alert
            message="Oops, there was an error"
            description={this.state.error.message ?? 'No description provided'}
            type="error"
          />
        );
    }
  }
}
