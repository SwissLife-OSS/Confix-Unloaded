import * as React from "react";
import { usePaginationFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Lookup } from "../../shared/hacks";
import { formatDate } from "../../shared/formatDate";
import { Divider, Empty, Skeleton, SkeletonProps, Table, Tag } from "antd";
import { useCallback, useEffect, useRef } from "react";
import { distinct } from "../../shared/distinct";
import { ColorTag } from "../../shared/ColorTag";
import InfiniteScroll from "react-infinite-scroll-component";
import { useIntersectionObserver } from "../../shared/useIntersectionObserver";
import {
  PublishedApplicationParts$data,
  PublishedApplicationParts$key,
} from "./__generated__/PublishedApplicationParts.graphql";

type Value = Lookup<
  PublishedApplicationParts$data,
  "publishedVersions",
  "edges",
  0
>;

const columns = [
  {
    title: "Published At",
    dataIndex: "publishedAt",
    key: "publishedAt",
    render: (_: unknown, value: Value) => (
      <>{formatDate(value.node.publishedAt)}</>
    ),
  },
  {
    title: "Published By",
    dataIndex: "published_by",
    key: "published_by",
    render: (_: unknown, value: Value) => <>{value.node.publishedBy.email}</>,
  },
  {
    title: "Version",
    dataIndex: "version",
    key: "version",
    render: (_: unknown, value: Value) => <>{value.node.version}</>,
  },
  {
    title: "Environments",
    dataIndex: "environments",
    key: "environments",
    render: (_: unknown, value: Value) => (
      <>
        {distinct(
          value.node.claimsVersions
            .map((x) => x.environment?.name)
            .filter((x) => !!x)
        ).map((x) => (
          <ColorTag value={x ?? "-"}>{x}</ColorTag>
        ))}
      </>
    ),
  },
  {
    title: "Tags",
    dataIndex: "Tags",
    key: "tags",
    render: (_: unknown, value: Value) => (
      <>
        {distinct(
          value.node.claimsVersions.map((x) => x.tag).filter((x) => !!x)
        ).map((x) => (
          <Tag>#{x}</Tag>
        ))}
      </>
    ),
  },
];

export const PublishedApplicationParts: React.FC<{
  fragmentRef: PublishedApplicationParts$key;
}> = ({ fragmentRef }) => {
  const { data, loadNext, hasNext } = usePaginationFragment(
    graphql`
      fragment PublishedApplicationParts on ApplicationPart
      @refetchable(queryName: "PublishedApplicationPartsQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 20 }
        cursor: { type: "String" }
      ) {
        publishedVersions(first: $count, after: $cursor)
          @connection(key: "part_publishedVersions") {
          edges {
            node {
              id
              publishedAt
              part {
                name
              }
              publishedBy {
                email
              }
              version
              claimsVersions {
                tag
                environment {
                  name
                }
              }
            }
          }
        }
      }
    `,
    fragmentRef
  );

  const fetchNext = useCallback(() => loadNext(20), [loadNext]);

  const nodes = data?.publishedVersions?.edges ?? [];

  if (nodes.length === 0) {
    return <Empty description="Never published" />;
  }
  return (
    <div
      style={{ flex: 1, overflow: "auto", overscrollBehavior: "contain" }}
      id="published_application_parts"
    >
      <InfiniteScroll
        dataLength={nodes.length}
        next={fetchNext}
        hasMore={hasNext}
        loader={
          <SkeletonWithNotifier
            onIsVisible={fetchNext}
            avatar
            paragraph={{ rows: 1 }}
            active
          />
        }
        endMessage={<Divider plain />}
        scrollableTarget="published_application_parts"
      >
        <Table columns={columns} pagination={false} dataSource={nodes} />
      </InfiniteScroll>
    </div>
  );
};

const SkeletonWithNotifier: React.FC<
  { onIsVisible: () => void } & SkeletonProps
> = ({ onIsVisible, ...other }) => {
  const ref = useRef(null);

  const isVisible = useIntersectionObserver({
    ref,
    callback: (_) => onIsVisible(),
    options: { triggerOnce: false, threshold: 0 },
  });
  useEffect(
    () => {
      if (isVisible) {
        onIsVisible();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      /**empty on purpose */
    ]
  );

  return (
    <div ref={ref}>
      <Skeleton {...other} />
    </div>
  );
};
