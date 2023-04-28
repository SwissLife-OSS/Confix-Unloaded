import React, {useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import {FullSizeBox, SidebarHeader} from '../shared/FullSizeBox';
import {SearchBar} from '../shared/SearchBar';
import {EditVariable} from './EditVariable';
import {NewVariable} from './NewVariable';
import {Page} from '../shared/Page';
import {css} from '@emotion/react';
import {Button} from 'antd';
import {DefaultSuspense} from '../shared/DefaultSuspense';
import {VariablesList} from './VariablesList';
import {useGoTo} from '../shared/useGoTo';

export const Variables: React.FC = (props) => {
  const [search, setSearch] = useState<string | undefined>();
  const handleOnItemSelected = useGoTo((id: string) => `${id}/edit`);

  return (
    <Page title="Variables">
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Link to={'new'}>
            <Button type="primary">Add</Button>
          </Link>
        </SidebarHeader>
        <DefaultSuspense>
          <VariablesList onItemSelect={handleOnItemSelected} search={search} />
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
          <VariableRoutes />
        </DefaultSuspense>
      </FullSizeBox>
    </Page>
  );
};

export const VariableRoutes: React.VFC = () => (
  <Routes>
    <Route path={'new'} element={<NewVariable />} />
    <Route path={':variableId/*'} element={<EditVariable />} />
  </Routes>
);
