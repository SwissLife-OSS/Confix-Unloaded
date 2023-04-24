import * as React from "react";

import { ApplicationPartChangeLog$key } from "@generated/ApplicationPartChangeLog.graphql";
import { ChangeLog } from "../../shared/ChangeLog";
import { graphql } from "babel-plugin-relay/macro";
import styled from "@emotion/styled";
import { useFragment } from "react-relay";

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
