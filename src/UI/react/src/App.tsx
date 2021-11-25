import React from "react";
import "./App.css";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Routes } from "./routes";
import { css } from "@emotion/react";

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider collapsible collapsed={open} onCollapse={toggleDrawer}>
        <Navigation open={open} toggleDrawer={toggleDrawer} />
      </Layout.Sider>
      <Layout className="site-layout">
        <Content
          css={css`
            margin: 0 16px;
            display: flex;
            flex-direction: column;
          `}
        >
          <Switch>
            {Routes.navigation.map((x) => (
              <Route key={x.path} path={x.path}>
                <x.component />
              </Route>
            ))}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

const Navigation: React.FC<{ open: boolean; toggleDrawer: () => void }> = ({
  open,
  toggleDrawer,
}) => {
  const match = useRouteMatch();
  return (
    <Menu theme="dark" mode="inline" selectedKeys={[match.path]}>
      {Routes.navigation.map((route) => (
        <Menu.Item key={route.path} icon={<route.icon />}>
          <NavLink
            to={route.path}
            style={{
              textDecoration: "none",
              // color: theme.palette.text.primary,
            }}
            activeStyle={{
              textDecoration: "none",
            }}
          >
            {route.name}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default App;
