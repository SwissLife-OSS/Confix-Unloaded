import React from "react";
import prettier from "prettier/standalone";
import praserGraphql from "prettier/parser-graphql";
import { Collapse, notification } from "antd";
import { css } from "@emotion/react";

const noop = () => {};
export const formatGraphQL = (
  text: string,
  onFailure: (e: Error) => void = noop
): string => {
  try {
    return prettier.format(text, {
      parser: "graphql",
      plugins: [praserGraphql],
    });
  } catch (e) {
    onFailure(e as SyntaxError);
    return text;
  }
};

export const reportGraphQLFormatError = (e: Error) => {
  notification.error({
    message: `There was a syntax error in the SDL`,
    description: (
      <Collapse ghost>
        <Collapse.Panel header="See details" key="1">
          <span
            css={css`
              white-space: pre-wrap;
              font-family: "Courier New", monospace;
            `}
          >
            {`${e.message}`}
          </span>
        </Collapse.Panel>
      </Collapse>
    ),
  });
};
