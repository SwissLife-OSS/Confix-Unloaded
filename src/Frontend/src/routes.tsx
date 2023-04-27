import {
  ApplicationIcon,
  ComponentIcon,
  EnvironmentIcon,
  ExplorerIcon,
  SettingsIcon,
  VariablesIcon,
} from "./icons/icons";

import { Applications } from "./applications/Applications";
import { Components } from "./components/Components";
import { Environments } from "./environment/Environments";
import { Explorer } from "./explorer/Explorer";
import Icon from "@ant-design/icons";
import { NonIndexRouteObject } from "react-router-dom";
import { Settings } from "./settings/Settings";
import { UserContextData } from "./shared/UserContext";
import { Variables } from "./variables/Variables";

export interface RouteDefinition extends NonIndexRouteObject {
  name: string;
  path: string;
  link: string;
  permissions?: (user: UserContextData) => boolean;
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
    permissions: ({hasEnvironmentAccess}) => hasEnvironmentAccess,
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
    permissions: ({hasIdentityAccess}) => hasIdentityAccess,
    element: <Settings />,
    icon: SettingsIcon,
  },
];
