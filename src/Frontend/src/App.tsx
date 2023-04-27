import React from 'react';
import './App.css';
import {NavLink, useLocation, useRoutes} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {Content} from 'antd/lib/layout/layout';
import {css} from '@emotion/react';
import {navigation} from './routes';
import {UserOutlined} from '@ant-design/icons';
import {Colors} from './shared/colors';
import styled from '@emotion/styled';
import {Namespaces, useUser} from './shared/useUser';

function App() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const routes = useRoutes(navigation);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout.Sider collapsible collapsed={!open} onCollapse={toggleDrawer}>
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

const Navigation: React.FC<{open: boolean; toggleDrawer: () => void}> = ({
  open,
  toggleDrawer,
}) => {
  const location = useLocation();
  const user = useUser();
  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      `}
    >
      <div></div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={navigation
          .filter(
            (x) =>
              !x.permissions ||
              user.hasPermission(
                x.permissions.scope,
                Namespaces.Global,
                x.permissions.permissions,
              ),
          )
          .map((route) => ({
            key: route.path,
            icon: <route.icon style={{color: Colors.theme.primary}} />,
            label: (
              <NavLink
                to={route.link}
                style={{
                  textDecoration: 'none',
                }}
              >
                {route.name}
              </NavLink>
            ),
          }))}
      ></Menu>
      <User open={open} />
    </div>
  );
};

const User: React.FC<{open: boolean}> = ({open}) => {
  const user = useUser();
  return (
    <UserWrapper open={open}>
      <div
        css={css`
          position: relative;
          width: 32px;
          height: 32px;
          margin: 0 auto 10px auto;
        `}
      >
        <span
          css={css`
            top: -55px;
            left: -11px;
            display: block;
            color: ${Colors.theme.secondary};
            font-size: 80px;
            position: absolute;
          `}
        >
          &#x2B22;
        </span>
        <UserOutlined
          css={css`
            width: 100%;
            top: 7px;
            font-size: 18px;
            display: block;
            color: ${Colors.theme.background};
            position: absolute;
          `}
        />
      </div>
      <UserName open={open}>{user.name}</UserName>
    </UserWrapper>
  );
};

const UserWrapper = styled.div<{open: boolean}>`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const UserName = styled.span<{open: boolean}>`
  opacity: ${(p) => (p.open ? 1 : 0)};
  color: rgba(255, 255, 255, 0.65);
  display: inline-block;
  transition: all 0.3s, background 0.3s,
    padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-bottom: ${(p) => (p.open ? '10px' : 0)};
`;

export default App;

// const LogoSwitcher: React.FC<{ small: boolean }> = ({ small }) => {
//   return (
//     <div>
//       <img style={{ maxWidth: "100%" }} src={logo} />
//     </div>
//   );
// };
// const Logo = styled.div<{ visible: boolean }>`
//   height: 32px;
//   margin: 16px;
//   background-image: url(${logo});
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: cover;
// `;

// const LogoSmall = styled.div<{ visible: boolean }>`
//   height: 32px;
//   margin: 16px;
//   background-image: url(${logoSmall});
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: cover;
// `;
