import React, {Suspense} from 'react';
import {Spin, Typography} from 'antd';
import {css} from '@emotion/react';
import {Colors} from './colors';

export const DetailView: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({children, style, ...rest}) => (
  <Suspense fallback={<PageLoader />}>
    <div {...rest} style={{...style, flex: 1}}>
      {children}
    </div>
  </Suspense>
);

export const PageLoader: React.FC<{message?: string}> = ({
  message = 'Loading...',
}) => (
  <div
    css={css`
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  >
    <div
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <Spin />
      <Typography css={{color: Colors.text.secondaryText}}>
        {message}
      </Typography>
    </div>
  </div>
);
