import React from "react";
import { Box, BoxProps, useTheme } from "@mui/material";
import { appBarHeight } from "../App";

export const FullSizeBox: React.FC<BoxProps> = (props) => {
  const theme = useTheme();
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        height: `calc(100vh - ${appBarHeight}px - ${theme.spacing(2)})`,
      }}
    >
      {props.children}
    </Box>
  );
};
