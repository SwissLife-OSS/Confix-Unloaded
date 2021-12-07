import styled from "@emotion/styled";
import { Divider, List, Skeleton } from "antd";
import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Colors } from "./colors";

interface ListWithSearchProps<T> {
  items: T[];
  label?: keyof T;
  id?: keyof T;
  onItemSelect?: (item: T) => void;
  hasNext: boolean;
  isLoading: boolean;
  batchSize?: number;
  loadMore: (count: number) => void;
  renderItem?: (item: T, index: number) => React.ReactNode;
  description?: (item: T) => string;
}

export function InfiniteScrollList<T>({
  items,
  label,
  id,
  onItemSelect,
  hasNext,
  isLoading,
  batchSize = 20,
  loadMore = () => {},
  description = () => "",
  renderItem,
}: ListWithSearchProps<T>): React.ReactElement<any, any> | null {
  const loadNext = useCallback(
    () => loadMore(batchSize),
    [batchSize, loadMore]
  );
  return (
    <div
      style={{ flex: 1, overflow: "scroll", overscrollBehavior: "contain" }}
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={items.length}
        next={loadNext}
        hasMore={hasNext}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain />}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={items}
          loading={isLoading}
          renderItem={
            renderItem ??
            ((item, i) => (
              <SearchListItem<T>
                key={String(!!id ? item[id] : i)}
                label={String(!!label ? item[label] : item)}
                onItemSelect={onItemSelect}
                description={description}
                item={item}
              />
            ))
          }
        />
      </InfiniteScroll>
    </div>
  );
}

const ListItem = styled(List.Item)`
  cursor: pointer;
  :hover {
    background-color: ${Colors.gray[2]};
  }
`;

function SearchListItem<T>({
  onItemSelect,
  label,
  item,
  description,
}: {
  label: string;
  onItemSelect?: (item: T) => void;
  description: (item: T) => string;
  item: T;
}) {
  const handleClick = useCallback(
    () => onItemSelect && onItemSelect(item),
    [onItemSelect, item]
  );
  return (
    <ListItem onClick={handleClick}>
      <List.Item.Meta title={label} description={description(item)} />
    </ListItem>
  );
}
