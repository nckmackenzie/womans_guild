import { useSearchParams } from 'react-router-dom';

export function useSetReportParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  //   setSearchParams('');
  return (object: object, initialObj: object) => {
    for (const [key] of Object.entries(initialObj)) {
      searchParams.delete(key);
    }
    for (const [key, value] of Object.entries(object)) {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };
}
