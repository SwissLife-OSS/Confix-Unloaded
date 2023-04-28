import parseISO from 'date-fns/parseISO';

export const ensureDate = (date?: unknown): Date => {
  if (!date) {
  }
  if (date instanceof Date) {
    return date;
  }
  if (typeof date === 'number') {
    return new Date(date);
  }
  if (typeof date === 'string') {
    return parseISO(date);
  }
  return new Date();
};
