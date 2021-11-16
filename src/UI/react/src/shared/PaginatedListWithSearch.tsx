import { Button, Divider, Input, List, Skeleton, Space } from "antd";
import Search from "antd/lib/input/Search";
import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AddIcon, SearchIcon } from "../icons/icons";
import { debounce, useDebounce } from "./debounce";
import { useStringEventHanlder as useStringEventHandler } from "./useEventListener";

interface PaginatedListWithSearchProps<T> {
  items: T[];
  label: keyof T;
  id: keyof T;
  onItemSelect: (item: T) => void;
  onAdd: () => void;
  hasNext: boolean;
  isLoading: boolean;
  batchSize?: number;
  loadMore: (count: number) => void;
  description?: (item: T) => string;
  onSearch?: (item: string) => void;
}

export function PaginatedListWithSearch<T>({
  onAdd,
  items,
  label,
  id,
  onItemSelect,
  hasNext,
  isLoading,
  batchSize = 20,
  loadMore = () => {},
  description = () => "",
  onSearch = (search) => {},
}: PaginatedListWithSearchProps<T>): React.ReactElement<any, any> | null {
  const loadNext = useCallback(
    () => loadMore(batchSize),
    [batchSize, loadMore]
  );
  const handleSearch = useStringEventHandler(debounce(onSearch));
  return (
    <>
      <div style={{ flex: 0 }}>
        <Space wrap>
          <Input
            placeholder="input search text"
            addonBefore={<SearchIcon />}
            onChange={handleSearch}
          />
          <Button type="primary" onClick={onAdd}>
            Add
          </Button>
        </Space>
      </div>
      <div
        style={{ flex: 1, overflow: "scroll", overscrollBehavior: "contain" }}
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={items.length}
          next={loadNext}
          hasMore={hasNext}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={items}
            loading={isLoading}
            renderItem={(item) => (
              <SearchListItem<T>
                key={String(item[id])}
                label={String(item[label])}
                onItemSelect={onItemSelect}
                description={description}
                item={item}
              />
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
}
function SearchListItem<T>({
  onItemSelect,
  label,
  item,
  description,
}: {
  label: string;
  onItemSelect: (item: T) => void;
  description: (item: T) => string;
  item: T;
}) {
  const handleClick = useCallback(
    () => onItemSelect(item),
    [onItemSelect, item]
  );
  return (
    <List.Item onClick={handleClick}>
      <List.Item.Meta title={label} description={description(item)} />
    </List.Item>
  );
}
