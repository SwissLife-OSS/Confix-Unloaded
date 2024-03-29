import * as React from 'react';

import {DeployedEnvironmentsOverview$key} from '@generated/DeployedEnvironmentsOverview.graphql';
import {Steps} from 'antd';
import {ensureDate} from '../../shared/ensureDate';
import {graphql} from 'babel-plugin-relay/macro';
import {useFragment} from 'react-relay';

export const DeployedEnvironmentsOverview: React.FC<{
  fragmentRef: DeployedEnvironmentsOverview$key;
}> = ({fragmentRef}) => {
  const data = useFragment(
    graphql`
      fragment DeployedEnvironmentsOverview on DeployedEnvironment
      @relay(plural: true) {
        environment {
          id
          name
          parent {
            id
            name
          }
        }
        claimedVersions {
          nodes {
            tag
            application {
              name
            }
            applicationPart {
              name
            }
            publishedApplicationPart {
              id
              version
              publishedAt
            }
            environment {
              name
            }
          }
        }
      }
    `,
    fragmentRef,
  ).filter((x) => !!x.environment);

  const allDeployedIds = new Set(data.map((x) => x.environment!.id));

  // Get root values
  let rootEnvironments = [];
  for (var environment of data) {
    if (
      !environment.environment?.parent ||
      !allDeployedIds.has(environment.environment.id)
    ) {
      rootEnvironments.push([environment]);
    }
  }

  // get children of root values
  for (var environments of rootEnvironments) {
    for (let i = 0; i < environments.length; i++) {
      for (const child of data.filter(
        // eslint-disable-next-line no-loop-func
        (x) => x.environment?.parent?.id === environments[i].environment?.id,
      )) {
        environments.push(child);
      }
    }
  }

  const newestDeployments = data
    .flatMap(
      (x) =>
        x.claimedVersions?.nodes?.map((y) => y.publishedApplicationPart) ?? [],
    )
    .filter((x) => !!x)
    .sort(
      (a, b) =>
        ensureDate(b!.publishedAt).getTime() -
        ensureDate(a!.publishedAt).getTime(),
    );

  const newestDeployment = newestDeployments[0];

  return (
    <>
      {rootEnvironments.map((x) => (
        <Steps progressDot>
          {x.map((x) => {
            const isFinished = x?.claimedVersions?.nodes?.find(
              (x) => x.publishedApplicationPart?.id === newestDeployment?.id,
            );
            const mostRecentVersion = x.claimedVersions?.nodes
              ?.filter((x) => !!x.publishedApplicationPart?.publishedAt)
              .sort(
                (a, b) =>
                  ensureDate(
                    b.publishedApplicationPart!.publishedAt,
                  ).getTime() -
                  ensureDate(a.publishedApplicationPart!.publishedAt).getTime(),
              )[0];
            return (
              <Steps.Step
                status={isFinished ? 'finish' : 'wait'}
                title={x.environment?.name}
                subTitle={
                  <>
                    Deployed Version{' '}
                    {mostRecentVersion?.publishedApplicationPart?.version}
                  </>
                }
                description={`#${mostRecentVersion?.tag}`}
              />
            );
          })}
        </Steps>
      ))}
    </>
  );
};
