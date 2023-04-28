import React, {useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import {FullSizeBox, SidebarHeader} from '../shared/FullSizeBox';
import {SearchBar} from '../shared/SearchBar';
import {EditEnvironment} from './EditEnvironment';
import {NewEnvironment} from './NewEnvironment';
import {Page} from '../shared/Page';
import {css} from '@emotion/react';
import {Button} from 'antd';
import {DefaultSuspense} from '../shared/DefaultSuspense';
import {EnvironmentsList} from './EnvironmentsList';
import {useGoTo} from '../shared/useGoTo';

export const Environments: React.FC = (props) => {
  const [search, setSearch] = useState<string | undefined>();
  const handleOnItemSelected = useGoTo((id: string) => `${id}/edit`);

  return (
    <Page title="Environments">
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Link to={'new'}>
            <Button type="primary">Add</Button>
          </Link>
        </SidebarHeader>
        <DefaultSuspense>
          <EnvironmentsList
            onItemSelect={handleOnItemSelected}
            search={search}
          />
        </DefaultSuspense>
      </FullSizeBox>
      <FullSizeBox
        css={css`
          display: flex;
          flex: 1;
          padding-left: 10px;
          margin-left: 10px;
        `}
      >
        <DefaultSuspense>
          <EnvironmentRoutes />
        </DefaultSuspense>
      </FullSizeBox>
    </Page>
  );
};

export const EnvironmentRoutes: React.VFC = () => (
  <Routes>
    <Route path="new" element={<NewEnvironment />} />
    <Route path={':environmentId/edit'} element={<EditEnvironment />} />
  </Routes>
);
