import { AddIcon, DeleteIcon } from "../icons/icons";
import { Button, List } from "antd";
import React, { useCallback, useMemo } from "react";
import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from "react-relay";

import { AddComponentsToApplicationPartDialog } from "./dialogs/AddComponentsToApplicationPartDialog";
import { AddPartToApplicationDialog } from "./dialogs/AddPartToApplicationDialog";
import { ApplicationsList$key } from "@generated/ApplicationsList.graphql";
import { ApplicationsListItem$key } from "@generated/ApplicationsListItem.graphql";
import { ApplicationsListItem_ApplicationPart$key } from "@generated/ApplicationsListItem_ApplicationPart.graphql";
import { ApplicationsListItem_Component$key } from "@generated/ApplicationsListItem_Component.graphql";
import { ApplicationsListItem_DefaultListItem$key } from "@generated/ApplicationsListItem_DefaultListItem.graphql";
import { ApplicationsListItem_SelectedListItem$key } from "@generated/ApplicationsListItem_SelectedListItem.graphql";
import { ApplicationsListQuery } from "@generated/ApplicationsListQuery.graphql";
import { Colors } from "../shared/colors";
import { InfiniteScrollList } from "../shared/InfiniteScrollList";
import { RemoveComponentFromApplicationPartDialog } from "./dialogs/RemoveComponentFromApplicationPartDialog";
import { RemovePartFromApplicationDialog } from "./dialogs/RemovePartFromApplicationDialog";
import { config } from "../config";
import { graphql } from "babel-plugin-relay/macro";
import styled from "@emotion/styled";
import { useGoTo } from "../shared/useGoTo";
import { useHref } from "react-router";
import { useToggle } from "../shared/useToggle";

export const ApplicationList: React.FC<{
  selectedApplicationId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedApplicationId }) => {
  const query = useLazyLoadQuery<ApplicationsListQuery>(
    graphql`
      query ApplicationsListQuery(
        $cursor: String
        $count: Int
        $search: String
      ) {
        ...ApplicationsList
      }
    `,
    {
      count: config.pagination.pageSize,
      search,
    }
  );

  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<ApplicationsListQuery, ApplicationsList$key>(
    graphql`
      fragment ApplicationsList on Query
      @refetchable(queryName: "ApplicationsListPaginationQuery") {
        applications(after: $cursor, first: $count, search: $search)
          @connection(key: "Query_applications") {
          edges {
            node {
              id
              name
              namespace
              ...ApplicationsListItem
            }
          }
        }
      }
    `,
    query
  );

  const handleOnItemSelected = useCallback(
    (id: string) => onItemSelect(id),
    [onItemSelect]
  );

  const data = connection?.applications?.edges?.map((x) => x.node);

  return (
    <InfiniteScrollList
      items={data ?? []}
      isLoading={isLoadingNext || !data}
      hasNext={hasNext}
      loadMore={loadNext}
      renderItem={(item) => (
        <ApplicationListItem
          selectedId={selectedApplicationId}
          edge={item}
          onItemSelect={handleOnItemSelected}
        />
      )}
    />
  );
};

const ApplicationListItem: React.FC<{
  selectedId?: string;
  onItemSelect: (applicationId: string) => void;
  edge: ApplicationsListItem$key;
}> = ({ onItemSelect, edge, selectedId }) => {
  const data = useFragment(
    graphql`
      fragment ApplicationsListItem on Application {
        id
        ...ApplicationsListItem_DefaultListItem
        ...ApplicationsListItem_SelectedListItem
      }
    `,
    edge
  );

  const handleSelect = useCallback(
    () => onItemSelect(data.id),
    [onItemSelect, data]
  );

  if (data.id === selectedId) {
    return <SelectedListItem onItemSelect={handleSelect} data={data} />;
  }

  return <DefaultListItem onSelect={handleSelect} edge={data} />;
};

const DefaultListItem: React.FC<{
  onSelect: () => void;
  edge: ApplicationsListItem_DefaultListItem$key;
}> = ({ onSelect: handleSelect, edge }) => {
  const data = useFragment(
    graphql`
      fragment ApplicationsListItem_DefaultListItem on Application {
        id
        name
        namespace
        parts {
          name
        }
      }
    `,
    edge
  );
  const description = useMemo(
    () => data.parts.reduce((p, c) => `${p} | ${c.name}`, ""),
    [data.parts]
  );
  return (
    <ListItem onClick={handleSelect}>
      <List.Item.Meta title={data.name} description={description} />
    </ListItem>
  );
};

const SelectedListItem: React.FC<{
  onItemSelect: (applicationId: string) => void;
  data: ApplicationsListItem_SelectedListItem$key;
}> = ({ onItemSelect, data }) => {
  const { name, parts, id } = useFragment(
    graphql`
      fragment ApplicationsListItem_SelectedListItem on Application {
        id
        name
        namespace
        parts {
          id
          ...ApplicationsListItem_ApplicationPart
        }
      }
    `,
    data
  );
  const handleClick = useCallback(() => onItemSelect(id), [onItemSelect, id]);
  const [isAddPartVisible, , enableAddPart, disableAddPart] = useToggle();

  return (
    <SelectedListItemStyled>
      <SubItem onClick={handleClick}>
        <List.Item.Meta title={name} />
        <SubItemButton type="text" icon={<AddIcon />} onClick={enableAddPart} />
        <SubItemButton type="text" icon={<DeleteIcon />} />
      </SubItem>
      {parts.map((x) => (
        <ApplicationPart key={x.id} data={x} applicationId={id} />
      ))}
      <AddPartToApplicationDialog
        applicationName={name}
        applicationId={id}
        open={isAddPartVisible}
        onClose={disableAddPart}
      />
    </SelectedListItemStyled>
  );
};

const ApplicationPart: React.FC<{
  applicationId: string;
  data: ApplicationsListItem_ApplicationPart$key;
}> = ({ applicationId, data }) => {
  const applicationPart = useFragment(
    graphql`
      fragment ApplicationsListItem_ApplicationPart on ApplicationPart {
        id
        name
        components {
          definition {
            id
          }
          ...ApplicationsListItem_Component
        }
        ...AddComponentsToApplicationPartDialog
      }
    `,
    data
  );
  const { name, components, id } = applicationPart;

  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const [
    isCompnentDialogShow,
    ,
    enableComponentDialog,
    disableComponentDialog,
  ] = useToggle();
  useHref({});
  const goToPart = useGoTo(
    ":applicationId/parts/:partId/edit",
    {},
    { applicationId, partId: id }
  );
  return (
    <>
      <SubItem indent={1} onClick={goToPart}>
        <SubItemTitle>{name}</SubItemTitle>
        <SubItemButton
          type="text"
          icon={<AddIcon />}
          onClick={enableComponentDialog}
        />
        <SubItemButton
          type="text"
          icon={<DeleteIcon />}
          onClick={enableRemoveDialog}
        />
      </SubItem>
      {components.map((component) => (
        <Component
          applicationId={applicationId}
          key={component.definition?.id ?? "-"}
          data={component}
        />
      ))}
      <RemovePartFromApplicationDialog
        applicationPartName={name}
        applicationPartId={id}
        open={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
      <AddComponentsToApplicationPartDialog
        open={isCompnentDialogShow}
        onClose={disableComponentDialog}
        fragmentRef={applicationPart}
      />
    </>
  );
};

const Component: React.FC<{
  applicationId: string;
  data: ApplicationsListItem_Component$key;
}> = ({ applicationId, data }) => {
  const { id: partComponentId, definition } = useFragment(
    graphql`
      fragment ApplicationsListItem_Component on ApplicationPartComponent {
        id
        definition {
          id
          name
        }
      }
    `,
    data
  );

  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const goToComponent = useGoTo(
    ":applicationId/components/:partComponentId/edit",
    {},
    { applicationId, partComponentId }
  );

  return (
    <SubItem indent={2} onClick={goToComponent}>
      <SubItemTitle>{definition?.name}</SubItemTitle>
      <SubItemButton
        type="text"
        icon={<DeleteIcon />}
        onClick={enableRemoveDialog}
      />
      <RemoveComponentFromApplicationPartDialog
        partComponentId={partComponentId}
        componentName={definition?.name ?? ""}
        open={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
    </SubItem>
  );
};

const SubItemButton = styled(Button)`
  opacity: 0;
  transition: opacity 100ms;
  margin-left: 5px;
  flex: 0;
`;

const SubItemTitle = styled("div")`
  flex: 1;
`;

const SubItem = styled("div")<{ indent?: number }>`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  width: 100%;
  line-height: 32px;
  padding-left: ${(props) => (props.indent ?? 0) * 20 + 5}px;
  :hover {
    background-color: ${Colors.gray[5]};
  }
  :hover ${SubItemButton} {
    opacity: 1;
  }
  .ant-list-item-meta-content {
    display: table;
    height: 100%;
  }
  h4 {
    display: table-cell;
    vertical-align: middle;
    margin: 0;
  }
`;

const ListItem = styled(List.Item)`
  cursor: pointer;
  :hover {
    background-color: ${Colors.gray[2]};
  }
`;

const SelectedListItemStyled = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
