import React, { useCallback } from "react";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { AddIcon, SearchIcon } from "../icons/icons";

interface ListWithSearchProps<T> {
  items: T[];
  label: keyof T;
  id: keyof T;
  onItemSelect: (item: T) => void;
  onAdd: () => void;
}

export function ListWithSearch<T>({
  onAdd,
  items,
  label,
  id,
  onItemSelect,
}: ListWithSearchProps<T>): React.ReactElement<any, any> | null {
  return (
    <>
      <Box sx={{ flex: 0 }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search " />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={onAdd}
          >
            <AddIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box sx={{ flex: 1, overflow: "scroll", overscrollBehavior: "contain" }}>
        <List sx={{ maxHeight: "100%", overflow: "auto" }}>
          {items.map((x) => (
            <SearchListItem<T>
              key={String(x[id])}
              label={String(x[label])}
              onItemSelect={onItemSelect}
              item={x}
            />
          ))}
        </List>
      </Box>
    </>
  );
}
function SearchListItem<T>({
  onItemSelect,
  label,
  item,
}: {
  label: string;
  onItemSelect: (item: T) => void;
  item: T;
}) {
  const handleClick = useCallback(
    () => onItemSelect(item),
    [onItemSelect, item]
  );
  return (
    <ListItem onClick={handleClick}>
      <ListItemText primary={label} />
    </ListItem>
  );
}
