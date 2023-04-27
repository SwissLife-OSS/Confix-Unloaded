import React, {useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import {FullSizeBox, SidebarHeader} from '../shared/FullSizeBox';
import {SearchBar} from '../shared/SearchBar';
import {EditComponent} from './EditComponent';
import {NewComponent} from './NewComponent';
import {Page} from '../shared/Page';
import {css} from '@emotion/react';
import {Button} from 'antd';
import {DefaultSuspense} from '../shared/DefaultSuspense';
import {ComponentsList} from './ComponentsList';
import {useGoTo} from '../shared/useGoTo';

export const Components: React.FC = () => {
  const [search, setSearch] = useState<string | undefined>();
  const handleOnItemSelected = useGoTo((id: string) => `${id}/edit`);

  return (
    <Page title="Components">
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Link to={'new'}>
            <Button type="primary">Add</Button>
          </Link>
        </SidebarHeader>
        <DefaultSuspense>
          <ComponentsList onItemSelect={handleOnItemSelected} search={search} />
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
          <ComponentRoutes />
        </DefaultSuspense>
      </FullSizeBox>
    </Page>
  );
};

export const ComponentRoutes: React.VFC = () => (
  <Routes>
    <Route path={'new'} element={<NewComponent />} />
    <Route path={':id/:tab'} element={<EditComponent />} />
  </Routes>
);
