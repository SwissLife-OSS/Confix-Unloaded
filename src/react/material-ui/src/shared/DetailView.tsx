import React, { Suspense } from "react";
import { CircularProgress, Paper, PaperProps } from "@mui/material";

export const DetailView: React.FC<PaperProps> = ({ children, sx, ...rest }) => (
  <Suspense fallback={<PageLoader />}>
    <Paper {...rest} sx={{ flex: 1, ...sx }}>
      {children}
    </Paper>
  </Suspense>
);

export const PageLoader = () => <CircularProgress />;
