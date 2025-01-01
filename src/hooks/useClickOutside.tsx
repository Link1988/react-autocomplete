import { useCallback, useEffect } from 'react';

type CallbackFn = () => void;

export function useClickOutside(ref: React.RefObject<HTMLDivElement>, callback: CallbackFn) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);
}
