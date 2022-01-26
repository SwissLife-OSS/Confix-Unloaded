import * as React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import styled from "@emotion/styled";
import { ChangeLog } from "../../shared/ChangeLog";
import { ApplicationPartChangeLog_ChangeLog_Fragment$key } from "./__generated__/ApplicationPartChangeLog_ChangeLog_Fragment.graphql";

const applicationPartChangeLog = graphql`
  fragment ApplicationPartChangeLog_ChangeLog_Fragment on ApplicationPart {
    changeLog {
      ...ChangeLog_fragment
    }
  }
`;
export const ApplicationPartChangeLog: React.FC<{
  data: ApplicationPartChangeLog_ChangeLog_Fragment$key;
}> = ({ data }) => {
  const { changeLog } =
    useFragment<ApplicationPartChangeLog_ChangeLog_Fragment$key>(
      applicationPartChangeLog,
      data
    );

  return <ChangeLog data={changeLog} />;
};
export const Title = styled("div")`
  flex: 1;
  padding: 15px 0px;
`;
