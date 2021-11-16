import { Applications } from "./applications/Applications";
import { Components } from "./components/Components";
import {
  CogOutlineIcon,
  FileTreeOutlineIcon,
  PackageVariantIcon,
  ServerIcon,
  ShieldStartOutlineIcon,
  ToyBrickOutlineIcon,
  VariablesIcon,
} from "./icons/icons";

export interface RouteDefinition {
  name: string;
  path: string;
  component: React.FC;
  icon: React.FC;
}

export const routes: RouteDefinition[] = [
  {
    name: "Applications",
    path: "/applications",
    component: () => <Applications />,
    icon: PackageVariantIcon,
  },
  {
    name: "Components",
    path: "/components",
    component: () => <Components />,
    icon: ToyBrickOutlineIcon,
  },
  {
    name: "Variables",
    path: "/variables",
    component: () => <div>bar</div>,
    icon: VariablesIcon,
  },
  {
    name: "Environments",
    path: "/environments",
    component: () => <div>bar</div>,
    icon: ServerIcon,
  },
  {
    name: "Vaults",
    path: "/vaults",
    component: () => <div>bar</div>,
    icon: ShieldStartOutlineIcon,
  },
  {
    name: "Explorer",
    path: "/explorer",
    component: () => <div>bar</div>,
    icon: FileTreeOutlineIcon,
  },
  {
    name: "Settings",
    path: "/settings",
    component: () => <div>bar</div>,
    icon: CogOutlineIcon,
  },
];
