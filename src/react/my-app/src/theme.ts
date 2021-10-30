import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: { mode: "light" },
  typography: {
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    h1: {
      fontSize: "2.0rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.5",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: 14,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth:true
      },
    },
  },
});
