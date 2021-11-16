import { UpCircleOutlined } from "@ant-design/icons";
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

const paths = {
  applications: "/applications",
  components: "/components",
  variables: "/variables",
  environments: "/environments",
  vaults: "/vaults",
  explorer: "/explorer",
  settings: "/settings",
};
const routes: RouteDefinition[] = [
  {
    name: "Applications",
    path: paths.applications,
    component: () => <Applications />,
    icon: UpCircleOutlined,
  },
  {
    name: "Components",
    path: paths.components,
    component: () => <Components />,
    icon: ToyBrickOutlineIcon,
  },
  {
    name: "Variables",
    path: paths.variables,
    component: () => <div>bar</div>,
    icon: VariablesIcon,
  },
  {
    name: "Environments",
    path: paths.environments,
    component: () => <div>bar</div>,
    icon: ServerIcon,
  },
  {
    name: "Vaults",
    path: paths.vaults,
    component: () => <div>bar</div>,
    icon: ShieldStartOutlineIcon,
  },
  {
    name: "Explorer",
    path: paths.explorer,
    component: () => <div>bar</div>,
    icon: FileTreeOutlineIcon,
  },
  {
    name: "Settings",
    path: paths.settings,
    component: () => <div>bar</div>,
    icon: CogOutlineIcon,
  },
];
export const Routes = {
  navigation: routes,
  applications: {
    new: () => `${paths.applications}/new`,
    edit: (id?: string) => `${paths.applications}/edit/${id ?? ":id"}`,
  },
  components: {
    new: () => `${paths.components}/new`,
    edit: (id?: string) => `${paths.components}/edit/${id ?? ":id"}`,
  },
};
