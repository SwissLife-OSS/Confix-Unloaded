import React, {Suspense, SuspenseProps} from 'react';
import {PageLoader} from './DetailView';

export const DefaultSuspense: React.FC<Omit<SuspenseProps, 'fallback'>> = ({
  children,
  ...props
}) => (
  <Suspense {...props} fallback={<PageLoader />}>
    {children}
  </Suspense>
);
