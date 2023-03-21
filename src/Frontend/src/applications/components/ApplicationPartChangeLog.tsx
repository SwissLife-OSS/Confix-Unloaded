import * as React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import styled from "@emotion/styled";
import { ChangeLog } from "../../shared/ChangeLog";
import { ApplicationPartChangeLog$key } from "./__generated__/ApplicationPartChangeLog.graphql";

export const ApplicationPartChangeLog: React.FC<{
  fragmentRef: ApplicationPartChangeLog$key;
}> = ({ fragmentRef }) => {
  const { changeLog } = useFragment(
    graphql`
      fragment ApplicationPartChangeLog on ApplicationPart {
        changeLog {
          ...ChangeLog
        }
      }
    `,
    fragmentRef
  );

  return <ChangeLog data={changeLog} />;
};

export const Title = styled("div")`
  flex: 1;
  padding: 15px 0px;
`;
