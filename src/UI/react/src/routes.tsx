import Icon from "@ant-design/icons";
import { IconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { NonIndexRouteObject } from "react-router-dom";
import { Applications } from "./applications/Applications";
import { Components } from "./components/Components";
import { Environments } from "./environment/Environments";
import { Explorer } from "./explorer/Explorer";
import {
  ApplicationIcon,
  ComponentIcon,
  EnvironmentIcon,
  ExplorerIcon,
  SettingsIcon,
  VariablesIcon,
  VaultIcon,
} from "./icons/icons";
import { Settings } from "./settings/Settings";
import { Permission } from "./shared/useUser";
import { Scope } from "./shared/useUser";
import { Variables } from "./variables/Variables";

export interface RouteDefinition extends NonIndexRouteObject {
  name: string;
  path: string;
  link: string;
  permissions?: {
    scope: Scope;
    permissions: Permission;
  };
  icon: React.FC<typeof Icon.defaultProps>;
}

export const navigation: RouteDefinition[] = [
  {
    name: "Applications",
    path: "/applications/*",
    link: "/applications",
    element: <Applications />,
    icon: ApplicationIcon,
  },
  {
    name: "Components",
    path: "/components/*",
    link: "/components",
    element: <Components />,
    icon: ComponentIcon,
  },
  {
    name: "Variables",
    path: "/variables/*",
    link: "/variables",
    element: <Variables />,
    icon: VariablesIcon,
  },
  {
    name: "Environments",
    path: "/environments/*",
    link: "/environments",
    permissions: {
      permissions: "isRead",
      scope: "ENVIRONMENT",
    },
    element: <Environments />,
    icon: EnvironmentIcon,
  },
  {
    name: "Explorer",
    path: "/explorer/*",
    link: "/explorer",
    element: <Explorer />,
    icon: ExplorerIcon,
  },
  {
    name: "Settings",
    path: "/settings/*",
    link: "/settings/groups",
    permissions: {
      permissions: "isWrite",
      scope: "IDENTITY",
    },
    element: <Settings />,
    icon: SettingsIcon,
  },
];
