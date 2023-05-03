import {css} from '@emotion/react';
import {Button} from 'antd';
import {useState} from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import {DefaultSuspense} from '../../shared/DefaultSuspense';
import {FullSizeBox, SidebarHeader} from '../../shared/FullSizeBox';
import {InlinePage} from '../../shared/InlinePage';
import {SearchBar} from '../../shared/SearchBar';
import {useGoTo} from '../../shared/useGoTo';
import {EditRole} from './EditRole';
import {RolesList} from './RolesList';
import {NewRole} from './NewRole';

export const Roles: React.FC = (props) => {
  const [search, setSearch] = useState<string | undefined>();
  const handleOnItemSelected = useGoTo((id: string) => `${id}/edit`);

  return (
    <InlinePage>
      <FullSizeBox>
        <SidebarHeader>
          <SearchBar onSearch={setSearch} />
          <Link to={'new'}>
            <Button type="primary">Add</Button>
          </Link>
        </SidebarHeader>
        <DefaultSuspense>
          <RolesList onItemSelect={handleOnItemSelected} search={search} />
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
          <RoleRoutes />
        </DefaultSuspense>
      </FullSizeBox>
    </InlinePage>
  );
};

export const RoleRoutes: React.VFC = () => (
  <Routes>
    <Route path="new" element={<NewRole />} />
    <Route path={':roleId/edit'} element={<EditRole />} />
  </Routes>
);
