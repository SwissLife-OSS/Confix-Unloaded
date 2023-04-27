import styled from '@emotion/styled';

export const TabRow = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .ant-tabs-content-holder {
    display: flex;
  }
  .ant-tabs {
    flex-grow: 1;
  }
  .ant-tabs-tabpane {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
