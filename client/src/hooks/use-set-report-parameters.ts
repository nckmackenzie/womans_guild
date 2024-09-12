import { useSearchParams } from 'react-router-dom';

export function useSetReportParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (object: object, keys: string[]) => {
    keys.forEach(key => {
      searchParams.delete(key);
    });
    // for (const [key] of Object.entries(initialObj)) {
    //   searchParams.delete(key);
    // }
    for (const [key, value] of Object.entries(object)) {
      if (value !== undefined) {
        searchParams.set(key, value);
      }
    }
    setSearchParams(searchParams);
  };
}
