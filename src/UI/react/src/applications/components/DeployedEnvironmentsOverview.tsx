import * as React from "react";
import { graphql } from "babel-plugin-relay/macro";
import {
  DeployedEnvironmentsOverviewFragment,
  DeployedEnvironmentsOverviewFragment$key,
} from "./__generated__/DeployedEnvironmentsOverviewFragment.graphql";
import { useFragment } from "react-relay";
import { Steps, Tag, Timeline } from "antd";
import { ensureDate } from "../../shared/ensureDate";

const deployedEnvironmentsOverview = graphql`
  fragment DeployedEnvironmentsOverviewFragment on DeployedEnvironment
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
        gitVersion
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
`;
export const DeployedEnvironmentsOverview: React.FC<{
  data: DeployedEnvironmentsOverviewFragment$key;
}> = ({ data }) => {
  let deployedEnvironments = useFragment(
    deployedEnvironmentsOverview,
    data
  ).filter((x) => !!x.environment);

  const allDeployedIds = new Set(
    deployedEnvironments.map((x) => x.environment!.id)
  );

  // Get root values
  let rootEnvironments = [];
  for (var environment of deployedEnvironments) {
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
      for (const child of deployedEnvironments.filter(
        // eslint-disable-next-line no-loop-func
        (x) => x.environment?.parent?.id === environments[i].environment?.id
      )) {
        environments.push(child);
      }
    }
  }

  const newestDeployments = deployedEnvironments
    .flatMap(
      (x) =>
        x.claimedVersions?.nodes?.map((y) => y.publishedApplicationPart) ?? []
    )
    .filter((x) => !!x)
    .sort(
      (a, b) =>
        ensureDate(b!.publishedAt).getTime() -
        ensureDate(a!.publishedAt).getTime()
    );

  const newestDeployment = newestDeployments[0];

  return (
    <>
      {rootEnvironments.map((x) => (
        <Steps progressDot>
          {x.map((x) => {
            const isFinished = x?.claimedVersions?.nodes?.find(
              (x) => x.publishedApplicationPart?.id === newestDeployment?.id
            );
            const mostRecentVersion = x.claimedVersions?.nodes
              ?.filter((x) => !!x.publishedApplicationPart?.publishedAt)
              .sort(
                (a, b) =>
                  ensureDate(
                    b.publishedApplicationPart!.publishedAt
                  ).getTime() -
                  ensureDate(a.publishedApplicationPart!.publishedAt).getTime()
              )[0];
            return (
              <Steps.Step
                status={isFinished ? "finish" : "wait"}
                title={x.environment?.name}
                subTitle={
                  <>
                    Deployed Version{" "}
                    {mostRecentVersion?.publishedApplicationPart?.version}
                  </>
                }
                description={`#${mostRecentVersion?.gitVersion}`}
              />
            );
          })}
        </Steps>
      ))}
    </>
  );
};
