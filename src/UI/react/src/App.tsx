import React from "react";
import "./App.css";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { Content } from "antd/lib/layout/layout";
import { css } from "@emotion/react";
import { navigation } from "./routes";

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const routes = useRoutes(navigation);

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
          {routes}
        </Content>
      </Layout>
    </Layout>
  );
}

const Navigation: React.FC<{ open: boolean; toggleDrawer: () => void }> = ({
  open,
  toggleDrawer,
}) => {
  const location = useLocation();
  return (
    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
      {navigation.map((route) => (
        <Menu.Item key={route.path} icon={<route.icon />}>
          <NavLink
            to={route.link}
            style={{
              textDecoration: "none",
              // color: theme.palette.text.primary,
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
