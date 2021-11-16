import React from "react";
import "./App.css";
import {
  AppBar as MuiAppBar,
  AppBarProps,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { BellIcon, ChevronLeftIcon, MenuIcon } from "./icons/icons";
import { RouteDefinition, routes } from "./routes";
import { NavLink, Route, Switch } from "react-router-dom";

const drawerWidth: number = 240;
export const appBarHeight = 64;

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Confix
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <BellIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Navigation open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          flexDirection: "column",
          height: "100vh",
          display: "flex",
        }}
      >
        <Toolbar sx={{ flex: 0 }} />
        <Box
          sx={{
            padding: 1,
            flex: "1 0 auto",
            display: "flex",
          }}
        >
          <Switch>
            {routes.map((x) => (
              <Route key={x.path} path={x.path}>
                <x.component />
              </Route>
            ))}
          </Switch>
        </Box>
        <Box sx={{ flex: 0 }}></Box>
      </Box>
    </Box>
  );
}
const Navigation: React.FC<{ open: boolean; toggleDrawer: () => void }> = ({
  open,
  toggleDrawer,
}) => (
  <Drawer variant="permanent" open={open}>
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <Divider />
    {routes.map((x) => (
      <NavigationElement route={x} key={x.path} />
    ))}
  </Drawer>
);

const NavigationElement: React.FC<{ route: RouteDefinition }> = ({ route }) => {
  const theme = useTheme();
  return (
    <NavLink
      to={route.path}
      style={{
        textDecoration: "none",
        color: theme.palette.text.primary,
      }}
      activeStyle={{
        textDecoration: "none",
        color: theme.palette.action.active,
      }}
    >
      <ListItem button>
        <ListItemIcon>
          <route.icon />
        </ListItemIcon>
        <ListItemText primary={route.name} />
      </ListItem>
    </NavLink>
  );
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps & { open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    height: appBarHeight,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default App;
