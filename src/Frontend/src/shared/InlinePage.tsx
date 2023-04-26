import {config} from '../config';
import styled from '@emotion/styled';

export const InlinePage = styled.div`
  max-height: calc(
    100vh - ${config.appBar.height}px - ${config.page.padding}px
  );
  min-height: 500px;
  display: flex;
  flex: 1 1 auto;
`;
