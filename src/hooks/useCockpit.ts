import useSWR from 'swr';

export const useCockpit = <T>(type: string, name: string, params?: string) => {
  if (!type || !name) {
    throw new Error('type/name is required');
  }

  const fetcher = (url: string): Promise<T> =>
    fetch(url).then((res) => res.json());
  const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/${type}/get/${name}?token=6b79107e7972a67976b08ef5c082c0&${params}`;

  const { data, error } = useSWR(url, fetcher, { suspense: true });

  return { data, error };
};

export default useCockpit;
