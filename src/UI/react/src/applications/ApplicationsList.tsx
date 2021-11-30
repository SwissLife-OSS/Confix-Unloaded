import React, { useCallback, useMemo } from "react";
import {
  useLazyLoadQuery,
  usePaginationFragment,
  useFragment,
} from "react-relay";
import { Settings } from "../settings";
import { InfiniteScrollList } from "../shared/InfiniteScrollList";
import { ApplicationsListQuery } from "./__generated__/ApplicationsListQuery.graphql";
import { ApplicationsList_applications$key } from "./__generated__/ApplicationsList_applications.graphql";
import { graphql } from "babel-plugin-relay/macro";
import {
  ApplicationsList_applicationsEdge,
  ApplicationsList_applicationsEdge$key,
} from "./__generated__/ApplicationsList_applicationsEdge.graphql";
import styled from "@emotion/styled";
import { Button, List } from "antd";
import { Colors } from "../shared/colors";
import { PlusCircleFilled } from "@ant-design/icons";
import { AddIcon, DeleteIcon } from "../icons/icons";
import { useToggle } from "../shared/useToggle";
import { AddPartToApplicationDialog } from "./dialogs/AddPartToApplicationDialog";
import { RemovePartFromApplicationDialog } from "./dialogs/RemovePartFromApplicationDialog";
import { AddComponentsToApplicationPartDialog } from "./dialogs/AddComponentsToApplicationPartDialog";
import { RemoveComponentFromApplicationPartDialog } from "./dialogs/RemoveComponentFromApplicationPartDialog";
import { useGoTo } from "../shared/useGoTo";
import { Routes } from "../routes";

const applicationsQuery = graphql`
  query ApplicationsListQuery(
    $cursor: String
    $count: Int
    $where: ApplicationFilterInput
  ) {
    ...ApplicationsList_applications
  }
`;

const applicationsConnectionFragment = graphql`
  fragment ApplicationsList_applications on Query
  @refetchable(queryName: "ApplicationsListPaginationQuery") {
    applications(after: $cursor, first: $count, where: $where)
      @connection(key: "Query_applications") {
      edges {
        node {
          id
          name
          ...ApplicationsList_applicationsEdge
        }
      }
    }
  }
`;

export const applicationFragment = graphql`
  fragment ApplicationsList_applicationsEdge on Application {
    id
    name
    namespace
    parts {
      id
      name
      components {
        id
        definition {
          id
          name
        }
      }
    }
  }
`;

export const ApplicationList: React.FC<{
  selectedApplicationId?: string;
  onItemSelect: (item: string) => void;
  search: string | undefined;
}> = ({ search, onItemSelect, selectedApplicationId }) => {
  const queryData = useLazyLoadQuery<ApplicationsListQuery>(applicationsQuery, {
    count: Settings.pagination.pageSize,
    where: !search
      ? null
      : {
          or: [
            { namespace: { contains: search } },
            { name: { contains: search } },
          ],
        },
  });
  const {
    data: connection,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<
    ApplicationsListQuery,
    ApplicationsList_applications$key
  >(applicationsConnectionFragment, queryData);

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
      renderItem={(item) =>
        item.id === selectedApplicationId ? (
          <SelectedApplicationListItem
            onItemSelect={handleOnItemSelected}
            data={item}
            key={item.id}
          />
        ) : (
          <ApplicationListItem
            onItemSelect={handleOnItemSelected}
            edge={item}
            key={item.id}
          />
        )
      }
    />
  );
};

const ApplicationListItem: React.FC<{
  onItemSelect: (applicationId: string) => void;
  edge: ApplicationsList_applicationsEdge$key;
}> = ({ onItemSelect, edge }) => {
  const data = useFragment<ApplicationsList_applicationsEdge$key>(
    applicationFragment,
    edge
  );
  const handleClick = useCallback(
    () => onItemSelect(data.id),
    [onItemSelect, data]
  );
  const description = useMemo(
    () => data.parts.reduce((p, c) => `${p} | ${c.name}`, ""),
    [data.parts]
  );
  return (
    <ListItem onClick={handleClick}>
      <List.Item.Meta title={data.name} description={description} />
    </ListItem>
  );
};

const SelectedApplicationListItem: React.FC<{
  onItemSelect: (applicationId: string) => void;
  data: ApplicationsList_applicationsEdge$key;
}> = ({ onItemSelect, data }) => {
  const { name, parts, id } =
    useFragment<ApplicationsList_applicationsEdge$key>(
      applicationFragment,
      data
    );
  const handleClick = useCallback(() => onItemSelect(id), [onItemSelect, id]);
  const [isAddPartVisible, , enableAddPart, disableAddPart] = useToggle();

  return (
    <SelectedListItem>
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
        visible={isAddPartVisible}
        onClose={disableAddPart}
      />
    </SelectedListItem>
  );
};

const ApplicationPart: React.FC<{
  applicationId: string;
  data: ApplicationsList_applicationsEdge["parts"][0];
}> = ({ applicationId, data: { id, name, components } }) => {
  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const [
    isCompnentDialogShow,
    ,
    enableComponentDialog,
    disableComponentDialog,
  ] = useToggle();
  const goToPart = useGoTo(() =>
    Routes.applicationParts.edit(applicationId, id)
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
      {components.map((y) => (
        <Component
          applicationId={applicationId}
          key={y.definition.id}
          data={y}
        />
      ))}
      <RemovePartFromApplicationDialog
        applicationPartName={name}
        applicationPartId={id}
        visible={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
      <AddComponentsToApplicationPartDialog
        applicationPartName={name}
        applicationPartId={id}
        visible={isCompnentDialogShow}
        onClose={disableComponentDialog}
      />
    </>
  );
};

const Component: React.FC<{
  applicationId: string;
  data: ApplicationsList_applicationsEdge["parts"][0]["components"][0];
}> = ({
  applicationId,
  data: {
    id: partComponentId,
    definition: { name },
  },
}) => {
  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const goToComponent = useGoTo(() =>
    Routes.applicationPartComponents.edit(applicationId, partComponentId)
  );
  return (
    <SubItem indent={2} onClick={goToComponent}>
      <SubItemTitle>{name}</SubItemTitle>
      <SubItemButton
        type="text"
        icon={<DeleteIcon />}
        onClick={enableRemoveDialog}
      />
      <RemoveComponentFromApplicationPartDialog
        partComponentId={partComponentId}
        componentName={name}
        visible={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
    </SubItem>
  );
};

const SubItemTitle = styled("div")`
  flex: 1;
`;
const SubItemButton = styled(Button)`
  margin-left: 5px;
  flex: 0;
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

const SelectedListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
