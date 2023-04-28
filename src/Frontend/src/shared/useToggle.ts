import {useCallback, useState} from 'react';

export const useToggle = (
  initialState = false,
): [boolean, () => void, () => void, () => void] => {
  const [value, setValue] = useState<boolean>(initialState);
  const handleToggle = useCallback(() => setValue(value), [value, setValue]);
  const enable = useCallback(() => setValue(true), [setValue]);
  const disable = useCallback(() => setValue(false), [setValue]);
  return [value, handleToggle, enable, disable];
};
