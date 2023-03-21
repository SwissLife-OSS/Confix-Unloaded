import React, { Suspense } from "react";

export const withSilentSuspense =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props) =>
    (
      <Suspense fallback={<></>}>
        <Component {...props} />
      </Suspense>
    );
