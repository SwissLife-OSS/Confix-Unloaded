import { useLocation } from "react-router-dom";

export const useTabFromState = (...tabs: string[]) => {
  const { state } = useLocation();
  for (const tab of tabs) {
    if (tab === state?.tab) {
      return tab;
    }
  }
  return tabs[0];
};
