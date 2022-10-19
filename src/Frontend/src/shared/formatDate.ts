import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export const formatDate = (date?: unknown): string => {
  const formatpattern = "HH:mm dd.MM.yyyy";
  if (!date) {
  }
  if (date instanceof Date || typeof date === "number") {
    return format(date, formatpattern);
  }
  if (typeof date === "string") {
    return format(parseISO(date), formatpattern);
  }
  return "-";
};
