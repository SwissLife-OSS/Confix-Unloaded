import React, {useState} from 'react';
import {Link, Route, Routes, useMatch} from 'react-router-dom';
import {FullSizeBox, SidebarHeader} from '../shared/FullSizeBox';
import {SearchBar} from '../shared/SearchBar';
import {EditApplication} from './EditApplication';
import {NewApplication} from './NewApplication';
import {Page} from '../shared/Page';
import {css} from '@emotion/react';
import {Button} from 'antd';
import {DefaultSuspense} from '../shared/DefaultSuspense';
import {ApplicationList} from './ApplicationsList';
import {useGoTo} from '../shared/useGoTo';
import {EditApplicationPart} from './EditApplicationPart';
import {EditApplicationPartComponent} from './EditApplicationPartComponent';

export const Applications: React.FC = () => {
  const [search, setSearch] = useState<string | undefined>();

  const applicationId = useApplicationIdFromRoute();
  const handleOnItemSelected = useGoTo((id?: string) => `${id}/edit`);

  return (
    <Page title="Applications">
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Link to={'new'}>
            <Button type="primary">Add</Button>
          </Link>
        </SidebarHeader>
        <DefaultSuspense>
          <ApplicationList
            selectedApplicationId={applicationId}
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
          <ApplicationRoutes />
        </DefaultSuspense>
      </FullSizeBox>
    </Page>
  );
};

export const ApplicationRoutes: React.VFC = () => (
  <Routes>
    <Route path={'new'} element={<NewApplication />} />
    <Route
      path={':applicationId/components/:partComponentId/:tab'}
      element={<EditApplicationPartComponent />}
    />
    <Route
      path={':applicationId/parts/:id/:tab'}
      element={<EditApplicationPart />}
    />
    <Route path={':applicationId/:tab'} element={<EditApplication />} />
  </Routes>
);

const useApplicationIdFromRoute = (): string | undefined => {
  const match = useMatch('/applications/:applicationId/*');
  return match?.params?.applicationId;
};
