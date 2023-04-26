import React from 'react';
import {css} from '@emotion/react';
import {PageHeader} from 'antd';
import {config} from '../config';
import logo from '../images/logo.png';

export const Page: React.FC<{
  title: string;
  subTitle?: string;
  children: React.ReactElement | React.ReactElement[];
}> = ({title, subTitle = '', children}) => {
  return (
    <>
      <PageHeader
        title={title}
        subTitle={subTitle}
        extra={<img src={logo} height="32" alt="logo" />}
      />
      <div
        css={css`
          max-height: calc(
            100vh - ${config.appBar.height}px - ${config.page.padding}px
          );
          min-height: 500px;
          display: flex;
          flex: 1 1 auto;
        `}
      >
        {children}
      </div>
    </>
  );
};
