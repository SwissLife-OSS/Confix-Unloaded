import { Applications } from "./applications/Applications";
import { Components } from "./components/Components";
import { Environments } from "./environment/Environments";
import {
  CogOutlineIcon,
  FileTreeOutlineIcon,
  PackageVariantIcon,
  ServerIcon,
  ShieldStartOutlineIcon,
  ToyBrickOutlineIcon,
  VariablesIcon,
} from "./icons/icons";
import { Variables } from "./variables/Variables";

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
    icon: PackageVariantIcon,
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
    component: () => <Variables />,
    icon: VariablesIcon,
  },
  {
    name: "Environments",
    path: paths.environments,
    component: () => <Environments />,
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
    edit: (id?: string) =>
      `${paths.applications}/edit/${id ?? ":applicationId"}`,
  },
  applicationParts: {
    edit: (applicationId?: string, id?: string) =>
      `${paths.applications}/edit/${applicationId ?? ":applicationId"}/edit/${
        id ?? ":id"
      }`,
  },
  applicationPartComponents: {
    edit: (applicationId?: string, partComponentId?: string) =>
      `${paths.applications}/edit/${
        applicationId ?? ":applicationId"
      }/component/${partComponentId ?? ":partComponentId"}/edit`,
  },
  components: {
    new: () => `${paths.components}/new`,
    edit: (id?: string) => `${paths.components}/edit/${id ?? ":id"}`,
  },
  environments: {
    overview: () => `${paths.environments}`,
    new: () => `${paths.environments}/new`,
    edit: (id?: string) => `${paths.environments}/edit/${id ?? ":id"}`,
  },
  variables: {
    new: () => `${paths.variables}/new`,
    edit: (id?: string) => `${paths.variables}/edit/${id ?? ":id"}`,
  },
};
