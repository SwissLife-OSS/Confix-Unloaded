import styled from "@emotion/styled";
import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import {
  mdiBell,
  mdiCancel,
  mdiCheck,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiCircleOutline,
  mdiCircleSlice8,
  mdiClose,
  mdiCloudUpload,
  mdiCogOutline,
  mdiDeleteOutline,
  mdiFileTreeOutline,
  mdiMagnify,
  mdiMenu,
  mdiPackage,
  mdiPackageVariant,
  mdiPencil,
  mdiLogout,
  mdiPlus,
  mdiServer,
  mdiShieldStarOutline,
  mdiToyBrickOutline,
  mdiVariable,
} from "@mdi/js";
import { Colors } from "../shared/colors";

const createIcon =
  (mdiIcon: string): React.FC<typeof Icon.defaultProps> =>
  (props) => {
    return (
      <Icon
        {...props}
        component={(
          props: CustomIconComponentProps | React.SVGProps<SVGSVGElement>
        ) => (
          <svg viewBox="1 1 22 22" {...props}>
            <path d={mdiIcon} />
          </svg>
        )}
      />
    );
  };

export const ChevronLeftIcon = createIcon(mdiChevronLeft);
export const BellIcon = createIcon(mdiBell);
export const DeleteIcon = createIcon(mdiDeleteOutline);
export const MenuIcon = createIcon(mdiMenu);
export const PackageVariantIcon = createIcon(mdiPackageVariant);
export const ToyBrickOutlineIcon = createIcon(mdiToyBrickOutline);
export const VariablesIcon = createIcon(mdiVariable);
export const ServerIcon = createIcon(mdiServer);
export const Logout = createIcon(mdiLogout);
export const CheckIcon = createIcon(mdiCheck);
export const NotCheckIcon = createIcon(mdiClose);
export const EditIcon = createIcon(mdiPencil);
export const CancelIcon = createIcon(mdiCancel);
export const PublishIcon = createIcon(mdiCloudUpload);
export const ShieldStartOutlineIcon = createIcon(mdiShieldStarOutline);
export const FileTreeOutlineIcon = createIcon(mdiFileTreeOutline);
export const CogOutlineIcon = createIcon(mdiCogOutline);
export const SearchIcon = createIcon(mdiMagnify);
export const AddIcon = createIcon(mdiPlus);

export const ApplicationIcon = PackageVariantIcon;
export const ApplicationPartIcon = createIcon(mdiPackage);
export const CollapsedIcon = createIcon(mdiChevronRight);
export const NextIcon = createIcon(mdiChevronRight);
export const PreviousIcon = createIcon(mdiChevronLeft);
export const NotCollapsedIcon = createIcon(mdiChevronDown);
export const ComponentIcon = ToyBrickOutlineIcon;
export const EnvironmentIcon = ServerIcon;
export const VaultIcon = ShieldStartOutlineIcon;
export const ExplorerIcon = FileTreeOutlineIcon;
export const SettingsIcon = CogOutlineIcon;

const CircleSlice8 = createIcon(mdiCircleSlice8);
export const ActiveIcon = styled(CircleSlice8)`
  color: ${Colors.success};
`;
export const InactiveIcon = createIcon(mdiCircleOutline);
