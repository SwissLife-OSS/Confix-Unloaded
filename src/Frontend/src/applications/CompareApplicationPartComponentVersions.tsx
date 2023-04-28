import React, {useMemo} from 'react';
import {generatePath, useNavigate, useParams} from 'react-router';

import {CompareApplicationPartComponentVersions_Query} from '@generated/CompareApplicationPartComponentVersions_Query.graphql';
import {ComponentDiffEditor} from './components/ComponentDiffEditor';
import {Select} from 'antd';
import {graphql} from 'babel-plugin-relay/macro';
import {useHandler} from '../shared/useHandler';
import {useLazyLoadQuery} from 'react-relay';
import {useSearchQuery} from '../shared/useQuery';

export const generateComparePartComponentVersionPath = (
  applicationId: string,
  partComponentId: string,
  to: number | string,
  from: number | string,
) =>
  generatePath<any>(
    `../:applicationId/components/:partComponentId/compare?from=:from&to=:to`,
    {
      applicationId,
      partComponentId,
      to: String(to),
      from: String(from),
    },
  );

export const CompareApplicationPartComponentVersions: React.FC<{
  mostRecentVersion: number;
}> = ({mostRecentVersion}) => {
  const search = useSearchQuery();
  const {partComponentId = '', applicationId = ''} = useParams();

  const fromParam = Number.parseInt(
    search.get('from') ?? String(mostRecentVersion),
  );
  const toParam = Number.parseInt(
    search.get('to') ?? String(mostRecentVersion),
  );
  const from = Math.min(fromParam, toParam);
  const to = Math.max(fromParam, toParam);

  const data = useLazyLoadQuery<CompareApplicationPartComponentVersions_Query>(
    graphql`
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
    `,
    {
      partComponentId,
      from,
      to,
    },
    {fetchPolicy: 'store-and-network'},
  );
  const navigate = useNavigate();
  const handlePaginationChange = useHandler((from: number, to: number) => {
    const compare = generateComparePartComponentVersionPath(
      applicationId,
      partComponentId,
      from,
      to,
    );
    navigate(compare);
  });
  const handleFromChange = useHandler((from: number) =>
    handlePaginationChange(from, to),
  );
  const handleToChange = useHandler((to: number) =>
    handlePaginationChange(from, to),
  );

  const versions = useMemo(() => {
    if (!data.applicationPartComponentById) {
      return [];
    }

    return Array.from(
      new Set(
        [
          ...data.applicationPartComponentById.changeLog.map(
            (x) => x.change?.partComponentVersion,
          ),
          data.applicationPartComponentById.version,
        ].filter((x) => x !== undefined && x !== null) as number[],
      ),
    ).sort();
  }, [data.applicationPartComponentById]);

  if (!data.applicationPartComponentById) {
    return <div>Application part component was not found</div>;
  }

  const {fromValues, toValues} = data.applicationPartComponentById;

  return (
    <>
      <ComponentDiffEditor
        headers={{
          original: {
            title: (
              <SelectVersion
                title="From"
                version={from}
                versions={versions}
                onChange={handleFromChange}
              />
            ),
          },
          modified: {
            title: (
              <SelectVersion
                title="To"
                version={to}
                versions={versions}
                onChange={handleToChange}
              />
            ),
          },
        }}
        original={fromValues ?? ''}
        modified={toValues ?? ''}
      />
    </>
  );
};

const SelectVersion: React.FC<{
  title: string;
  onChange: (version: number) => void;
  version: number;
  versions: number[];
}> = ({onChange, title, version, versions}) => {
  return (
    <>
      {title}{' '}
      <Select<number> value={version} onChange={onChange}>
        {versions.map((x) => (
          <Select.Option value={x}>{x}</Select.Option>
        ))}
      </Select>
    </>
  );
};
