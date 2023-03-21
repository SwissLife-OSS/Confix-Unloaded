import styled from "@emotion/styled";
import { DiffEditor } from "@monaco-editor/react";
import { Colors } from "../../shared/colors";
import React from "react";
import { editor } from "monaco-editor";
import { css } from "@emotion/react";

const options: editor.IStandaloneDiffEditorConstructionOptions = {
  glyphMargin: false,
  folding: false,
  lineNumbers: "off",
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: true,
  cursorStyle: "line",
  formatOnPaste: true,
  formatOnType: true,
  automaticLayout: true,
  minimap: { enabled: false },
};

interface IHeader {
  title: React.ReactNode;
  actions?: React.ReactElement[] | React.ReactElement;
}

interface IHeaders {
  original: IHeader;
  modified: IHeader;
}

const usePrettyPrint = (val: string) => {
  try {
    return JSON.stringify(JSON.parse(val), null, 4);
  } catch {
    return val;
  }
};

export const ComponentDiffEditor: React.FC<{
  headers: IHeaders;
  original: string;
  modified: string;
}> = ({ headers, original, modified }) => {
  original = usePrettyPrint(original);
  modified = usePrettyPrint(modified);
  return (
    <Wrapper>
      <div>
        <Header headers={headers} />
        <DiffEditor
          original={original}
          modified={modified}
          options={options}
          height="auto"
          originalLanguage="json"
          modifiedLanguage="json"
        />
      </div>
    </Wrapper>
  );
};

const Header: React.FC<{ headers: IHeaders }> = ({ headers }) => {
  return (
    <div
      css={css`
        flex: 0;
        display: flex;
        justify-content: space-between;
      `}
    >
      <HeaderSubtitleWrapper>
        <HeaderSubtitle>
          <h3>{headers.original.title}</h3>
        </HeaderSubtitle>
        <HeaderSubtitleActions>
          {headers.original.actions}
        </HeaderSubtitleActions>
      </HeaderSubtitleWrapper>
      <HeaderSubtitleWrapper>
        <HeaderSubtitle>
          <h3>{headers.modified.title}</h3>
        </HeaderSubtitle>
        <HeaderSubtitleActions>
          {headers.modified.actions}
        </HeaderSubtitleActions>
      </HeaderSubtitleWrapper>
    </div>
  );
};

const HeaderSubtitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(50% - 15px);
`;

const HeaderSubtitle = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const HeaderSubtitleActions = styled.div`
  flex-shrink: 1;
`;

const Wrapper = styled("div")`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 20px;
  > div {
    border: 1px solid ${Colors.gray[3]};
    padding: 5px;
    flex: 1;
    flex-direction: column;
    display: flex;
    > section {
      flex: 1;
    }
  }
`;
