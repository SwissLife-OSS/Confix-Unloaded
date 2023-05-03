import styled from '@emotion/styled';
import {Card, Space} from 'antd';

export const FullSizeBox = styled(Card)<{grow?: boolean}>`
  display: flex;
  overflow: auto;
  .ant-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const Content = styled(FullSizeBox)`
  display: flex;
  flex: 1;
  padding-left: 10px;
  margin-left: 10px;
`;

export const SidebarHeader = styled(Space)`
  flex: 0;
`;
