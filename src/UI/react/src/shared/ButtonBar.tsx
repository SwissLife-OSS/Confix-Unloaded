import React from "react";
import { css } from "@emotion/react";

export const ButtonBar: React.FC = ({ children }) => (
  <div
    css={css`
      margin-top: 5px;
      display: flex;
      justify-content: end;
    `}
  >
    {children}
  </div>
);
