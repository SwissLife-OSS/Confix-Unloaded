import React, { MouseEventHandler, useCallback, useState } from "react";
import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { config } from "../config";
import { ExplorerTreeQuery } from "./__generated__/ExplorerTreeQuery.graphql";
import {
  ExplorerTree_Applications$data,
  ExplorerTree_Applications$key,
} from "./__generated__/ExplorerTree_Applications.graphql";
import { Divider, Skeleton, TreeDataNode } from "antd";
import { chunkBy } from "../shared/chunkBy";
import {
  ApplicationIcon,
  ApplicationPartIcon,
  CollapsedIcon,
  ComponentIcon,
  NotCollapsedIcon,
  VariablesIcon,
} from "../icons/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ExplorerTree_Application$key } from "./__generated__/ExplorerTree_Application.graphql";
import {
  ExplorerTree_ApplicationDetails$data,
  ExplorerTree_ApplicationDetails$key,
} from "./__generated__/ExplorerTree_ApplicationDetails.graphql";
import {
  ExplorerTree_ApplicationPart$data,
  ExplorerTree_ApplicationPart$key,
} from "./__generated__/ExplorerTree_ApplicationPart.graphql";
import { DefaultSuspense } from "../shared/DefaultSuspense";
import { useLoadNextChain } from "../shared/useLoadNextChain";
import { useGoTo } from "../shared/useGoTo";
import { useMultiplexer } from "../shared/useMultiplexer";
import { ColorTag, TagBar } from "../shared/ColorTag";
import { generatePath } from "react-router-dom";

const exploreTreeQuery = graphql`
  query ExplorerTreeQuery($cursor: String, $count: Int) {
    ...ExplorerTree_Applications
  }
`;
const exploreTreeConnectionFragment = graphql`
  fragment ExplorerTree_Applications on Query
  @refetchable(queryName: "ExplorerTreePaginationQuery") {
    applications(after: $cursor, first: $count)
      @connection(key: "Query_applications") {
      edges {
        node {
          id
          ...ExplorerTree_Application
        }
      }
    }
  }
`;
const exploreTreeApplicationFragment = graphql`
  fragment ExplorerTree_Application on Application {
    id
    name
    ...ExplorerTree_ApplicationDetails @defer
  }
`;

const exploreTreeApplicationDetailsFragment = graphql`
  fragment ExplorerTree_ApplicationDetails on Application {
    variableValues {
      id
      environment {
        id
        name
      }
      variable {
        id
        name
      }
    }
    parts {
      id
      name
      ...ExplorerTree_ApplicationPart @defer
    }
  }
`;
const exploreTreeApplicationPartFragment = graphql`
  fragment ExplorerTree_ApplicationPart on ApplicationPart {
    id
    name
    variableValues {
      id
      environment {
        id
        name
      }
      variable {
        id
        name
      }
    }
    components {
      id
      definition {
        id
        name
      }
    }
  }
`;

export interface ExplorerDataNode extends TreeDataNode {
  path: string;
  key: string | number;
  title?: React.ReactNode;
  children?: ExplorerDataNode[];
}
export const ExplorerTree: React.FC<{
  search: string | undefined;
  onClick?: (
    e: React.MouseEvent<HTMLSpanElement>,
    node: ExplorerDataNode
  ) => void;
}> = ({ search, onClick }) => {
  const queryData = useLazyLoadQuery<ExplorerTreeQuery>(exploreTreeQuery, {
    count: config.pagination.pageSize,
  });
  const {
    data: connection,
    hasNext,
    loadNext,
  } = usePaginationFragment<ExplorerTreeQuery, ExplorerTree_Applications$key>(
    exploreTreeConnectionFragment,
    queryData
  );

  const handleLoadNext = useLoadNextChain(loadNext);

  const applications = connection.applications?.edges ?? [];
  return (
    <div
      style={{ flex: 1, overflow: "auto", overscrollBehavior: "contain" }}
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={applications.length}
        next={handleLoadNext}
        hasMore={hasNext}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain />}
        scrollableTarget="scrollableDiv"
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          {applications.map((x) => (
            <ApplictionNode key={x.node.id} data={x.node} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

const ApplictionNode: React.FC<{
  data:
    | NonNullable<
        NonNullable<ExplorerTree_Applications$data["applications"]>["edges"]
      >["0"]["node"];
}> = ({ data }) => {
  const application = useFragment<ExplorerTree_Application$key>(
    exploreTreeApplicationFragment,
    data
  );
  return (
    <TreeNode
      indent={0}
      icon={<ApplicationIcon />}
      text={application?.name}
      url={`applications/:applicationId/edit`}
      urlParams={{ applicationId: application.id }}
      hasChildren
    >
      <ApplicationNodeChildren
        applicationId={application.id}
        data={application}
      />
    </TreeNode>
  );
};
const ApplicationNodeChildren: React.FC<{
  applicationId: string;
  data: ExplorerTree_ApplicationDetails$key;
}> = ({ data, applicationId }) => {
  const details = useFragment<ExplorerTree_ApplicationDetails$key>(
    exploreTreeApplicationDetailsFragment,
    data
  );

  return (
    <>
      {details?.parts?.map((x) => (
        <TreeNode
          indent={1}
          icon={<ApplicationPartIcon />}
          text={x.name}
          url={`applications/:applicationId/parts/:partId/edit`}
          urlParams={{ applicationId, partId: x.id }}
          hasChildren
        >
          <ApplicationPartNodeDetails
            key={x.id}
            applicationId={applicationId}
            data={x}
          />
        </TreeNode>
      ))}
      {chunkBy(
        details?.variableValues?.map((x) => ({ ...x })) ?? [],
        (x) => x.variable?.name ?? "-"
      ).map((x) => (
        <VariableValuesNode
          indent={1}
          url={"applications/:applicationId/edit"}
          urlParams={{ applicationId }}
          data={x}
        />
      ))}
    </>
  );
};

const ApplicationPartNodeDetails: React.FC<{
  applicationId: string;
  data: ExplorerTree_ApplicationDetails$data["parts"][0];
}> = ({ data, applicationId }) => {
  const partDetails = useFragment<ExplorerTree_ApplicationPart$key>(
    exploreTreeApplicationPartFragment,
    data
  );
  return (
    <>
      {partDetails?.components.map((x) => (
        <ApplicationPartComponentNode
          key={x.id}
          data={x}
          applicationId={applicationId}
        />
      ))}
      {chunkBy(
        partDetails?.variableValues?.map((x) => ({ ...x })) ?? [],
        (x) => x.variable?.name ?? "-"
      ).map((x) => (
        <VariableValuesNode
          indent={2}
          url={`applications/:applicationId/parts/:partId/edit`}
          urlParams={{ applicationId, partId: data.id }}
          data={x}
        />
      ))}
    </>
  );
};

const ApplicationPartComponentNode: React.FC<{
  applicationId: string;
  data: ExplorerTree_ApplicationPart$data["components"][0];
}> = ({ data, applicationId }) => {
  return (
    <TreeNode
      indent={2}
      icon={<ComponentIcon />}
      url={`applications/:applicationId/components/:componentId/edit`}
      urlParams={{ applicationId, componentId: data.id }}
      text={data.definition?.name ?? ""}
    />
  );
};

const VariableValuesNode: React.FC<{
  indent: number;
  data: NonNullable<
    NonNullable<ExplorerTree_ApplicationDetails$data["variableValues"]>
  >["0"][];
  url: string;
  urlParams?: Record<string, string>;
}> = ({ data, urlParams, indent, url }) => {
  const variableName = data?.[0].variable?.name ?? "";
  const variableId = data?.[0].variable?.id ?? "";

  return (
    <TreeNode
      indent={indent}
      icon={<VariablesIcon />}
      text={variableName}
      url={url}
      urlParams={urlParams}
      state={{
        tab: "variables",
        variableOption: { label: variableName, value: variableId },
      }}
      hasChildren
    >
      <IndentedBox indent={indent}>
        <TagBar>
          {data
            .filter((x) => x.environment)
            .map((x) => x.environment?.name ?? "")
            .map((x) => (
              <ColorTag value={x}>{x}</ColorTag>
            ))}
        </TagBar>
      </IndentedBox>
    </TreeNode>
  );
};

const TreeNode: React.FC<{
  icon: React.ReactElement;
  text: string;
  indent: number;
  url?: string;
  hasChildren?: boolean;
  state?: any;
  urlParams?: Record<string, string>;
  children?: React.ReactNode;
}> = ({
  icon,
  text,
  children,
  url,
  indent,
  urlParams,
  state,
  hasChildren = false,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const path = url && generatePath(url, urlParams);
  const goToUrl = useGoTo(path, { state });
  const handleExpand = useCallback(() => {
    setCollapsed(false);
  }, [setCollapsed]);
  const toggleCollapse: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setCollapsed((p) => !p);
    },
    [setCollapsed]
  );
  const handleClick = useMultiplexer(
    [goToUrl, handleExpand],
    [setCollapsed, url]
  );
  if (!hasChildren) {
    return (
      <IndentedBox indent={indent} onClick={handleClick}>
        <BoxIcon></BoxIcon>
        <BoxIcon>{icon}</BoxIcon>
        {text}
      </IndentedBox>
    );
  }
  return (
    <>
      <IndentedBox indent={indent} onClick={handleClick}>
        <BoxIcon onClick={toggleCollapse}>
          {collapsed ? <CollapsedIcon /> : <NotCollapsedIcon />}
        </BoxIcon>
        <BoxIcon>{icon}</BoxIcon>
        {text}
      </IndentedBox>
      {!collapsed && <DefaultSuspense>{children}</DefaultSuspense>}
    </>
  );
};

const IndentedBox = styled("div")<{ indent?: number }>`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  width: 100%;
  line-height: 32px;
  cursor: pointer;
  padding-left: ${(props) => (props.indent ?? 0) * 20 + 5}px;
  h4 {
    display: table-cell;
    vertical-align: middle;
    margin: 0;
  }
`;

const BoxIcon = styled("div")`
  width: 18px;
  display: table-cell;
  vertical-align: middle;
  margin-right: 10px;
  font-size: 18px;
`;
