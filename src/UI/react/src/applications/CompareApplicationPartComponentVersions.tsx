import React, { useCallback } from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { generatePath, useNavigate, useParams } from "react-router";
import { CompareApplicationPartComponentVersions_Query } from "./__generated__/CompareApplicationPartComponentVersions_Query.graphql";
import { Pagination } from "antd";
import { css } from "@emotion/react";
import { ComponentDiffEditor } from "./components/ComponentDiffEditor";
import { useSearchQuery } from "../shared/useQuery";

const applicationPartComponentQuery = graphql`
  query CompareApplicationPartComponentVersions_Query(
    $partComponentId: ID!
    $from: Int!
    $to: Int!
  ) {
    applicationPartComponentById(partComponentId: $partComponentId) {
      version
      fromValues: values(version: $from)
      toValues: values(version: $to)
      changeLog {
        change {
          ... on ApplicationPartComponentValuesChange {
            partComponentVersion
          }
        }
      }
    }
  }
`;

export const generateComparePartComponentVersionPath = (
  applicationId: string,
  partComponentId: string,
  to: number | string,
  from: number | string
) =>
  generatePath(
    `../:applicationId/components/:partComponentId/compare?from=:from&to=:to`,
    {
      applicationId,
      partComponentId,
      to: String(to),
      from: String(from),
    }
  );

export const CompareApplicationPartComponentVersions: React.FC<{
  mostRecentVersion: number;
}> = ({ mostRecentVersion }) => {
  const search = useSearchQuery();
  const { partComponentId = "", applicationId = "" } = useParams();

  const fromParam = Number.parseInt(
    search.get("from") ?? String(mostRecentVersion)
  );
  const toParam = Number.parseInt(
    search.get("to") ?? String(mostRecentVersion)
  );
  const from = Math.min(fromParam, toParam);
  const to = Math.max(fromParam, toParam);

  const data = useLazyLoadQuery<CompareApplicationPartComponentVersions_Query>(
    applicationPartComponentQuery,
    {
      partComponentId,
      from,
      to,
    },
    { fetchPolicy: "store-and-network" }
  );
  const navigate = useNavigate();
  const handlePaginationChange = useCallback(
    (page: number) => {
      const compare = generateComparePartComponentVersionPath(
        applicationId,
        partComponentId,
        page,
        page - 1
      );
      navigate(compare);
    },
    [applicationId, partComponentId, navigate]
  );

  if (!data.applicationPartComponentById) {
    return <div>Application part component was not found</div>;
  }

  const { fromValues, toValues, changeLog } = data.applicationPartComponentById;
  const max = Math.max(
    ...changeLog.map((x) => x.change?.partComponentVersion ?? 0)
  );

  return (
    <>
      <ComponentDiffEditor
        headers={{
          original: {
            title: `From ${from}`,
          },
          modified: {
            title: `To ${to}`,
          },
        }}
        original={fromValues ?? ""}
        modified={toValues ?? ""}
      />
      <div
        css={css`
          display: flex;
          justify-content: space-around;
        `}
      >
        <Pagination
          defaultCurrent={to}
          total={max}
          pageSize={1}
          onChange={handlePaginationChange}
        />
      </div>
    </>
  );
};
