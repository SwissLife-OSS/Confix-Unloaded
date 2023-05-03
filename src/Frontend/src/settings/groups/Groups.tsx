import {css} from '@emotion/react';
import {Button} from 'antd';
import {useState} from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import {DefaultSuspense} from '../../shared/DefaultSuspense';
import {FullSizeBox, SidebarHeader} from '../../shared/FullSizeBox';
import {InlinePage} from '../../shared/InlinePage';
import {SearchBar} from '../../shared/SearchBar';
import {useGoTo} from '../../shared/useGoTo';
import {EditGroup} from './EditGroup';
import {GroupsList} from './GroupsList';
import {NewGroup} from './NewGroup';

export const Groups: React.FC = (props) => {
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
          <GroupsList onItemSelect={handleOnItemSelected} search={search} />
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
          <GroupRoutes />
        </DefaultSuspense>
      </FullSizeBox>
    </InlinePage>
  );
};

export const GroupRoutes: React.VFC = () => (
  <Routes>
    <Route path="new" element={<NewGroup />} />
    <Route path={':groupId/edit'} element={<EditGroup />} />
  </Routes>
);
