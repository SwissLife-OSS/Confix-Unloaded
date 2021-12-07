import { RouteObject } from "react-router";
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
import { Variables } from "./variables/Variables";

export interface RouteDefinition extends RouteObject {
  name: string;
  path: string;
  link: string;
  icon: React.FC;
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
    element: <Environments />,
    icon: EnvironmentIcon,
  },
  {
    name: "Vaults",
    path: "/vaults/*",
    link: "/vaults",
    element: <div>bar</div>,
    icon: VaultIcon,
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
    path: "/settings",
    link: "/settings",
    element: <div>bar</div>,
    icon: SettingsIcon,
  },
];
