import {
  mdiBell,
  mdiChevronLeft,
  mdiCogOutline,
  mdiFileTreeOutline,
  mdiMagnify,
  mdiMenu,
  mdiPackageVariant,
  mdiPlus,
  mdiServer,
  mdiShieldStarOutline,
  mdiToyBrickOutline,
  mdiVariable,
} from "@mdi/js";
import { SvgIcon, SvgIconProps } from "@mui/material";

const createIcon =
  (mdiIcon: string): React.FC<SvgIconProps> =>
  (props) => {
    return (
      <SvgIcon {...props}>
        <path d={mdiIcon} />
      </SvgIcon>
    );
  };

export const ChevronLeftIcon = createIcon(mdiChevronLeft);
export const BellIcon = createIcon(mdiBell);
export const MenuIcon = createIcon(mdiMenu);
export const PackageVariantIcon = createIcon(mdiPackageVariant);

export const ToyBrickOutlineIcon = createIcon(mdiToyBrickOutline);
export const VariablesIcon = createIcon(mdiVariable);
export const ServerIcon = createIcon(mdiServer);
export const ShieldStartOutlineIcon = createIcon(mdiShieldStarOutline);
export const FileTreeOutlineIcon = createIcon(mdiFileTreeOutline);
export const CogOutlineIcon = createIcon(mdiCogOutline);
export const SearchIcon = createIcon(mdiMagnify);
export const AddIcon = createIcon(mdiPlus);
